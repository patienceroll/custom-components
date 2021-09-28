import { formatStyle, formatKeyframes } from '../../utils/style';

export default class CpRipple extends HTMLElement {
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.stable': {
			opacity: '0',
		},
		'.spread': {
			animation: 'spread 600ms forwards',
			opacity: '0.3',
		},
		'.ripple': {
			position: 'absolute',
			borderRadius: '50%',
			transition: 'opacity ease 450ms',
			opacity: '0',
		},
		':host': {
			width: '100%',
			height: '100%',
			overflow: 'hidden',
			display: 'inline-block',
			position: 'absolute',
			top: '0',
			left: '0',
			zIndex: '0',
			borderRadius: 'inherit',
		},
	};

	#keyframes: KeyframeObject = {
		spread: {
			'0%': {
				transform: 'scale(0)',
			},
			'100%': {
				transform: 'scale(1)',
			},
		},
	};
	#keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);

		shadowRoot.adoptedStyleSheets = [this.#keyframesSheet, this.#styleSheet];

		const child = document.createElement('slot');
		shadowRoot.appendChild(child);
	}

	/** 目前涟漪动画开始和消失动画的时间分别都为 600ms,后续应该会添加自定义配置功能 */
	get spread() {
		return function (
			this: AttachedShadowRoot<CpRipple>,
			options: {
				/** 涟漪中心点相对父级顶部距离 */
				top: number;
				/** 涟漪中心点相对父级左侧距离 */
				left: number;
				/** 涟漪颜色,默认 #999 */
				backgroundColor?: CSSStyleDeclaration['backgroundColor'];
			}
		) {
			const { pow, sqrt, abs } = Math;
			const { top, left, backgroundColor = '#999' } = options;
			const { clientWidth, clientHeight } = this;
			const ripple = document.createElement('div');
			// 计算涟漪半径,涟漪中心点到父元素四个点之中最远的一个点的距离为半径
			const offsetRight = abs(left - clientWidth);
			const offsetBootom = abs(clientHeight - top);
			const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
			const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
			const radius = sqrt(pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2));
			ripple.style.top = `${top - radius}px`;
			ripple.style.left = `${left - radius}px`;
			ripple.style.width = `${2 * radius}px`;
			ripple.style.height = `${2 * radius}px`;
			ripple.style.background = backgroundColor;
			ripple.classList.add('ripple', 'spread');
			this.shadowRoot.appendChild(ripple);

			return {
				dom: ripple,
				stable: () => {
					setTimeout(() => {
						ripple.classList.add('stable');
						setTimeout(() => {
							ripple.remove();
						}, 450);
					}, 150);
				},
			};
		};
	}

	connectedCallback(this: CpRipple) {}
}

import { formatStyle, formatKeyframes } from '../../utils/style';

export default class CpRipple extends HTMLElement {
	static styleSheet?: CSSStyleSheet;
	static style: CSSStyleObject = {
		'.ripple-disappear': {
			animationName: 'disappear',
			animationDuration: '450ms',
			animationFillMode: 'forwards',
		},
		'.ripple-start': {
			opacity: '0.3',
			transform: 'scale(1)',
			animationName: 'start',
			animationDuration: '600ms',
			animationFillMode: 'forwards',
		},
		'.ripple-item': {
			position: 'absolute',
			borderRadius: '50%',
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

	static keyframes: KeyframeObject = {
		start: {
			'0%': {
				transform: 'scale(0)',
				opacity: '0.1',
			},
			'100%': {
				transform: 'scale(1)',
				opacity: '0.3',
			},
		},
		disappear: {
			'0%': {
				opacity: '0.3',
			},
			'100%': {
				opacity: '0',
			},
		},
	};
	static keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (typeof CpRipple.styleSheet === 'undefined') CpRipple.styleSheet = formatStyle(CpRipple.style);
		if (typeof CpRipple.keyframesSheet === 'undefined') CpRipple.keyframesSheet = formatKeyframes(CpRipple.keyframes);

		shadowRoot.adoptedStyleSheets = [CpRipple.keyframesSheet, CpRipple.styleSheet];
	}

	/** 目前涟漪动画开始和消失动画的时间分别都为 600ms,后续应该会添加自定义配置功能 */
	get start() {
		return function (
			this: AttachedShadowRoot<CpRipple>,
			options: {
				/** 涟漪中心点相对父级顶部距离 */
				top: number;
				/** 涟漪中心点相对父级左侧距离 */
				left: number;
				/** 涟漪颜色,默认 #333 */
				backgroundColor?: CSSStyleDeclaration['backgroundColor'] | null;
			}
		) {
			const { pow, sqrt, abs } = Math;
			const { top, left, backgroundColor } = options;
			const { clientWidth, clientHeight } = this;
			const rippleItem = document.createElement('div');
			// 计算涟漪半径,涟漪中心点到父元素四个点之中最远的一个点的距离为半径
			const offsetRight = abs(left - clientWidth);
			const offsetBootom = abs(clientHeight - top);
			const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
			const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
			const radius = sqrt(pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2));
			rippleItem.style.top = `${top - radius}px`;
			rippleItem.style.left = `${left - radius}px`;
			rippleItem.style.width = `${2 * radius}px`;
			rippleItem.style.height = `${2 * radius}px`;
			rippleItem.style.background = backgroundColor || '#333';
			rippleItem.classList.add('ripple-item', 'ripple-start');
			this.shadowRoot.appendChild(rippleItem);
			return new Promise<{ dom: HTMLDivElement; stop: VoidFunction }>((resolve) => {
				setTimeout(() => {
					resolve({
						dom: rippleItem,
						stop() {
							rippleItem.classList.replace('ripple-start', 'ripple-disappear');
							return new Promise<void>((resolve) => {
								setTimeout(() => {
									rippleItem.remove();
									resolve();
								}, 450);
							});
						},
					});
				}, 600);
			});
		};
	}

	connectedCallback(this: CpRipple) {}
}

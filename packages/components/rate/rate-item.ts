import {
	style,
	watch,
	useLatestCall,
	createHtmlElement,
	createSvgElement,
	setAttributes,
	dispatchCustomEvent,
} from '../../utils';
import type { CpRateItemEventDetail } from './data';

@style({
	'.light svg': {
		stroke: 'currentcolor',
	},
	'.base svg,.light svg': {
		width: '2em',
		height: '2em',
	},
	'.light': {
		position: 'absolute',
		overflow: 'hidden',
		top: '0',
		left: '0',
		color: '#faaf00',
	},
	'.base,.light': {
		width: '2em',
		height: '2em',
		color: '#bdbdbd',
	},
	':host([disable=\'true\'])': {
		pointerEvents: 'none',
		opacity: '0.7',
	},
	':host([readonly=\'true\'])': {
		pointerEvents: 'none',
	},
	':host(:hover)': {
		transform: 'scale(1.2)',
	},
	':host': {
		display: 'inline-block',
		verticalAlign: 'top',
		fontSize: '12px',
		position: 'relative',
		transition: 'transform 300ms ease',
		cursor: 'pointer',
	},
})
@watch<AttachedShadowRoot<CpRateItem>>({
	value(newer) {
		if (newer) this.cpLight.style.width = `${newer}%`;
		else this.cpLight.style.removeProperty('width');
	},
	'light-color'(newer) {
		if (newer) this.cpLight.style.color = newer;
		else this.cpLight.style.removeProperty('color');
	},
	'base-color'(newer) {
		if (newer) this.cpBase.style.color = newer;
		else this.cpBase.style.removeProperty('color');
	},
})
export default class CpRateItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 评分背景层 */
	public cpBase: HTMLElement;
	/** 评分点亮层 */
	public cpLight: HTMLElement;
	/** 默认的 svg 图标 */
	public defaultRateSvg: SVGSVGElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRateItem.styleSheet];

		this.cpBase = createHtmlElement('div');
		this.cpLight = createHtmlElement('div');

		this.cpBase.classList.add('base');
		this.cpLight.classList.add('light');
		const children = createHtmlElement('slot');
		this.defaultRateSvg = createSvgElement('svg');
		const defaultRateSvgPath = createSvgElement('path');

		setAttributes(this.defaultRateSvg, { viewBox: '0 0 24 24' });
		setAttributes(defaultRateSvgPath, {
			fill: 'currentcolor',
			d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
		});

		children.addEventListener('slotchange', this.setRateSvg.bind(this));

		this.addEventListener('click', (event) => {
			const { offsetX } = event;
			const { clientWidth } = this;
			dispatchCustomEvent<CpRateItemEventDetail>(
				this,
				'cp-rate-item-rate',
				{
					nativeEvent: event,
					value: Math.abs(offsetX / clientWidth),
					rateItem: this,
				},
				{ bubbles: true }
			);
		});

		this.addEventListener(
			'mousemove',
			useLatestCall((event) => {
				const { offsetX } = event;
				const { clientWidth } = this;
				dispatchCustomEvent<CpRateItemEventDetail>(
					this,
					'cp-rate-item-rate',
					{ nativeEvent: event, value: Math.abs(offsetX / clientWidth), rateItem: this },
					{ bubbles: true }
				);
			})
		);

		this.defaultRateSvg.appendChild(defaultRateSvgPath);
		this.cpBase.appendChild(children);
		shadowRoot.append(this.cpBase, this.cpLight);
	}

	/** 是否有 children  */
	get hasChildren() {
		return this.children.length !== 0;
	}

	/** 给评分添加svg图标 */
	setRateSvg() {
		if (this.hasChildren) {
			this.cpLight.replaceChildren(this.children[0].cloneNode(true));
			this.defaultRateSvg.remove();
		} else {
			this.cpBase.appendChild(this.defaultRateSvg);
			this.cpLight.replaceChildren(this.defaultRateSvg.cloneNode(true));
		}
	}

	connectedCallback() {
		this.setRateSvg();
	}
}

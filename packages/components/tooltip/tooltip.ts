import { style } from '../../utils/index';

@style({
	'.cp-tooltip-tip-wrapper': {
		left: '0',
		top: '0',
		position: 'absolute',
		backgroundColor: '#6d6d6d',
	},
	':host': {
		display: 'inline-block',
		position: 'relative',
		fontSize: '16px',
	},
})
export default class CpTooltip extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 是否展开 */
	private realOpen: boolean;
	/** tip的包裹器 */
	private tipWrapper: HTMLSpanElement;

	constructor() {
		super();
		this.realOpen = false;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTooltip.styleSheet];

		const children = document.createElement('slot');

		this.tipWrapper = document.createElement('span');
		const tip = document.createElement('slot');

		this.tipWrapper.classList.add('cp-tooltip-tip-wrapper');

		tip.name = 'tip';

		this.tipWrapper.appendChild(tip);
		shadowRoot.append(children, this.tipWrapper);
	}
}

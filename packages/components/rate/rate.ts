import { style } from '../../utils/decorators';

const StartSvg = `<svg viewBox="0 0 24 24">
	<path fill="currentcolor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
</svg>`;

@style({
	':host': {
		display: 'inline-block',
		color: '#faaf00',
		lineHeight: '24px',
	},
	'svg': {
		height: '24px',
		width: '24px',
		verticalAlign: 'top',
	},
})
export default class CpRate extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRate.styleSheet];
		shadowRoot.innerHTML = `${StartSvg}${StartSvg}${StartSvg}${StartSvg}${StartSvg}`;
	}
}

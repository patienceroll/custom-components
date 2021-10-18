import { style } from '../../utils/decorators';

@style({
	':host': {
		display: 'inline-block',
		fontSize: '24px',
		height: '24px',
		verticalAlign: 'middle',
	},
})
export default class CpRate extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRate.styleSheet];

		shadowRoot.appendChild(document.createElement('slot'));
	}
}

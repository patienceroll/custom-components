import { style } from '../../utils/decorators';

@style({
	':host': {
		display: 'block',
	},
})
export default class CpAccordion extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpAccordion.styleSheet];

		const slot = document.createElement('slot');

		shadowRoot.appendChild(slot);
	}
}

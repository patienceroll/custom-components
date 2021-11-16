import { style } from '../../utils/decorators';

import CpButton from '../button/button';

if (!customElements.get('cp-button')) customElements.define('cp-button', CpButton);

@style({
	'cp-button::part(button)': {
		boxShadow: 'none',
		backgroundColor: 'transparent',
	},
	'cp-button': {
		borderRadius: '0',
	},
	':host': {
		display: 'block',
		fontSize: '16px',
	},
})
export default class CpTab extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTab.styleSheet];

		const children = document.createElement('cp-button');
		children.append(document.createElement('slot'));
		shadowRoot.append(children);
	}

	connectedCallback() {}
	/**  */
}

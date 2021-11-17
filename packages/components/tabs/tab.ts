import { style, watch } from '../../utils/decorators';

import type { CpTabObservedAttributes } from './data';

import CpButton from '../button/button';

if (!customElements.get('cp-button')) customElements.define('cp-button', CpButton);

@style({
	':host([active="true"]) cp-button::part(button)': {
		color: '#007FFF',
	},
	'cp-button::part(button)': {
		boxShadow: 'none',
		backgroundColor: 'transparent',
		padding: '0.75em 1em',
	},
	'cp-button': {
		borderRadius: '0',
	},
	':host': {
		display: 'block',
		fontSize: '16px',
	},
})
@watch<CpTabObservedAttributes, AttachedShadowRoot<CpTab>>(['key'], function (attr, older, newer) {
	switch (attr) {
		case 'key':
			break;
	}
})
export default class CpTab extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 当前tab的key */
	public key: string | null;
	constructor() {
		super();
		this.key = this.getAttribute('key');

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTab.styleSheet];

		const children = document.createElement('cp-button');
		children.setAttribute('ripple-color', '#007FFF');

		children.append(document.createElement('slot'));
		shadowRoot.append(children);
	}

	connectedCallback() {}
	/**  */
}

export default class CpRadioGroup extends HTMLElement implements CustomElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		const slot = document.createElement('slot');

		shadowRoot.appendChild(slot);
	}

	connectedCallback() {
		console.dir(this);
	}
}

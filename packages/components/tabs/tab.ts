export default class CpTab extends HTMLElement implements CustomElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const children = document.createElement('slot');

		shadowRoot.append(children);
	}

	connectedCallback() {}
	/**  */
}

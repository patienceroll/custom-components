export default class CpRadio extends HTMLElement implements CustomElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
	}
}

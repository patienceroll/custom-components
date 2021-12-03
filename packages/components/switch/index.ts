class CpSwitch extends HTMLElement implements CustomElement {
	constructor() {
		super();
	}
}

if (!customElements.get("cp-switch")) customElements.define("cp-switch", CpSwitch);

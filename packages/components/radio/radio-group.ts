import type CpRadio from "./radio";

export default class CpRadioGroup extends HTMLElement implements CustomElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		const slot = document.createElement("slot");

		shadowRoot.appendChild(slot);

		this.addEventListener("check", (event) => {
			const currentRadio = event.target as CpRadio;

			this.radioOptions(currentRadio.getAttribute("name")).forEach((radio) => {
				if (event.target !== radio) radio.setAttribute("checked", "false");
			});
			this.dispatchEvent(new CustomEvent("change", { detail: { value: currentRadio.getAttribute("value") } }));
		});
	}

	get radioOptions() {
		return (name?: string | null) => this.querySelectorAll(name ? `cp-radio[name="${name}"]` : "cp-radio");
	}

	connectedCallback() {
		const defaultValue = this.getAttribute("default-checked");
		const name = this.getAttribute("name") || "";
		this.radioOptions().forEach((radio) => {
			radio.setAttribute("name", name);
			if (radio.getAttribute("value") === defaultValue) radio.setAttribute("checked", "true");
			else radio.setAttribute("checked", "false");
		});
	}
}

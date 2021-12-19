import { createHtmlElement, setAttributes, style } from "packages/utils";

@style({
	".label": {
		display: "inline-block",
	},
	".input": {
		border: "none",
		outline: "none",
	},
	":host": {
		display: "inline-block",
		fontSize: "16px",
	},
})
export default class CpInput extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	public cpInputInput: HTMLInputElement;
	public cpInputLabel: HTMLLabelElement;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		this.cpInputInput = createHtmlElement("input");
		this.cpInputLabel = createHtmlElement("label");
		const labelContext = createHtmlElement("slot");

		setAttributes(this.cpInputInput, { id: "input", class: "input" });
		setAttributes(this.cpInputLabel, { for: "input", class: "label" });

		this.cpInputLabel.appendChild(labelContext);
		shadowRoot.append(this.cpInputLabel, this.cpInputInput);
	}
}

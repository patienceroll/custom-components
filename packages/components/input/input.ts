import { createHtmlElement, setAttributes, style, watch } from "packages/utils";

@style({
	".label": {
		display: "inline-block",
	},
	".input-standard": {
		marginTop: "1em",
		height: "2em",
		padding: "0.25em 0 ",
	},
	".input": {
		border: "none",
		outline: "none",
		backgroundColor: "#f40",
	},
	".input-wrapper": {
		display: "inline-block",
	},
	":host": {
		display: "inline-block",
		height: "3em",
		fontSize: "16px",
	},
})
@watch<CpInput>({
	variant(newer) {
		this.setVariant(newer);
	},
})
export default class CpInput extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 输入框组件输入框元素 */
	public cpInputInput: HTMLInputElement;
	/** 输入框组件Label元素 */
	public cpInputLabel: HTMLLabelElement;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		this.cpInputInput = createHtmlElement("input");
		this.cpInputLabel = createHtmlElement("label");
		const inputWrapper = createHtmlElement("div");
		const labelContext = createHtmlElement("slot");

		setAttributes(this.cpInputInput, { id: "input", class: "input" });
		setAttributes(this.cpInputLabel, { for: "input", class: "label" });
		setAttributes(inputWrapper, { class: "input-wrapper" });

		this.cpInputLabel.appendChild(labelContext);
		inputWrapper.appendChild(this.cpInputInput);
		shadowRoot.append(this.cpInputLabel, inputWrapper);
	}

	/** 设置输入框样式,默认 standard */
	setVariant(variant?: string | null) {
		if (variant === "outlined") {
			console.log(variant);
		} else if (variant === "filled") {
			console.log(variant);
		} else {
			this.cpInputInput.classList.remove("input-outlined", "input-filled");
			this.cpInputInput.classList.add("input-standard");
		}
	}

	connectedCallback() {
		this.setVariant();
	}
}

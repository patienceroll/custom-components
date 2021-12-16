import { createHtmlElement, setAttributes, style } from "../../utils";

@style({
	".cp-fieldset": {
		border: "none",
	},
	":host": {
		display: "inline-block",
		fontSize: "16px",
	},
})
export default class CpInput extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 输入框 fieldset DOM */
	public cpInputFieldset: HTMLFieldSetElement;
	/** 输入框 legend DOM */
	public cpInputLegend: HTMLLegendElement;
	/** 输入框 input DOM */
	public cpInputInput: HTMLInputElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		this.cpInputFieldset = createHtmlElement("fieldset");
		this.cpInputLegend = createHtmlElement("legend");
		this.cpInputInput = createHtmlElement("input");
		const legendContext = createHtmlElement("slot");

		setAttributes(this.cpInputFieldset, { class: "cp-fieldset" });
		setAttributes(legendContext, { name: "legend-context" });

		this.cpInputLegend.append(legendContext);
		this.cpInputFieldset.append(this.cpInputLegend, this.cpInputInput);
		shadowRoot.append(this.cpInputFieldset);
	}
}

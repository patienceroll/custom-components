import { style, defineCustomComponents } from "../../utils";

import CpButton from "../button/button";

defineCustomComponents("cp-button", CpButton);

@style({
	":host([active='true']) cp-button::part(button)": {
		color: "#007FFF",
	},
	"cp-button::part(button)": {
		boxShadow: "none",
		backgroundColor: "transparent",
		padding: "0.75em 1em",
	},
	"cp-button": {
		borderRadius: "0",
	},
	":host": {
		display: "block",
		fontSize: "16px",
	},
})
export default class CpTab extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpTab.styleSheet];

		const children = document.createElement("cp-button");
		children.setAttribute("ripple-color", "currentColor");

		this.addEventListener("click", (event) => {
			this.dispatchEvent(
				new CustomEvent("cp-tab-click", {
					detail: {
						nativeEvent: event,
						key: this.key,
					},
					bubbles: true,
				})
			);
		});

		children.append(document.createElement("slot"));
		shadowRoot.append(children);
	}

	/** 当前tab的key */
	get key() {
		return this.getAttribute("key");
	}

	/** 激活当前tab */
	active() {
		this.setAttribute("active", "true");
	}

	/** 取消激活当前tab */
	cancelAtive() {
		this.setAttribute("active", "false");
	}
}

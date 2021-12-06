import type Ripple from "../ripple/ripple";

import { style, watch } from "../../utils/index";

import "../ripple";

@style({
	".inner-checked": {
		fill: "#1976d2",
		transform: "scale(1)",
	},
	".outer-checked": {
		stroke: "#1976d2",
	},
	".inner": {
		fill: "#999",
		transform: "scale(0)",
		transition: "transform 300ms ease",
		transformOrigin: "center",
	},
	".outer": {
		stroke: "#999",
		fill: "none",
		strokeWidth: "8",
	},
	".cp-radio-icon": {
		width: "100%",
		height: "100%",
	},
	".cp-radio-radio-wrap > input": {
		opacity: "0",
		position: "absolute",
		zIndex: "1",
		width: "100%",
		height: "100%",
		margin: "0",
		top: "0",
		left: "0",
		cursor: "pointer",
	},
	".cp-radio-radio-wrap:hover": {
		backgroundColor: "#e9e9e9",
	},
	".cp-radio-radio-wrap": {
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		padding: "0.4em",
		width: "1.2em",
		height: "1.2em",
		verticalAlign: "middle",
		borderRadius: "50%",
	},
	".cp-radio-label > slot": {
		display: "inline-block",
		verticalAlign: "middle",
	},
	".cp-radio-label": {
		display: "inline-block",
		cursor: "pointer",
	},
	":host([disabled='true'])": {
		pointerEvents: "none",
	},
	":host": {
		display: "inline-block",
	},
})
@watch<AttachedShadowRoot<CpRadio>>({
	checked(newer, older) {
		if (newer === "true") {
			this.radio.checked = true;
			this.cpRadioOuterCircle.classList.add("outer-checked");
			this.cpRadioInnerCircle.classList.add("inner-checked");
			if (older !== "true") {
				const event = new CustomEvent<{ checked: true }>("check", {
					detail: { checked: true },
					bubbles: true,
				});
				this.dispatchEvent(event);
			}
		} else {
			this.radio.checked = false;
			this.cpRadioOuterCircle.classList.remove("outer-checked");
			this.cpRadioInnerCircle.classList.remove("inner-checked");
		}
	},
	name(newer) {
		if (newer) this.radio.name = newer;
		else this.radio.removeAttribute("name");
	},
})
export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 input 元素 */
	public radio: HTMLInputElement;
	/** 组件实例 svg 元素,用来模拟原生的 radio 的图标 */
	public cpRadioIcon: SVGSVGElement;
	/** 原生 svg 中的外圆环 */
	public cpRadioOuterCircle: SVGCircleElement;
	/** 原生 svg 中的内圆环 */
	public cpRadioInnerCircle: SVGCircleElement;
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });

		shadowRoot.adoptedStyleSheets = [CpRadio.styleSheet];

		const label = document.createElement("label");
		const radioWrap = document.createElement("span");
		this.radio = document.createElement("input");
		const ripple = document.createElement("cp-ripple") as AttachedShadowRoot<Ripple>;

		const textSlot = document.createElement("slot");

		this.cpRadioIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.cpRadioIcon.setAttribute("viewBox", "0 0 100 100");
		this.cpRadioIcon.classList.add("cp-radio-icon");

		this.cpRadioOuterCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.cpRadioOuterCircle.setAttribute("class", "outer");
		this.cpRadioOuterCircle.setAttribute("cx", "50");
		this.cpRadioOuterCircle.setAttribute("cy", "50");
		this.cpRadioOuterCircle.setAttribute("r", "42");

		this.cpRadioInnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.cpRadioOuterCircle.setAttribute("class", "inner");
		this.cpRadioOuterCircle.setAttribute("cx", "50");
		this.cpRadioOuterCircle.setAttribute("cy", "50");
		this.cpRadioOuterCircle.setAttribute("r", "28");

		label.classList.add("cp-radio-label");
		radioWrap.classList.add("cp-radio-radio-wrap");

		this.radio.type = "radio";

		this.addEventListener("click", () => {
			if (this.getAttribute("checked") !== "true") {
				this.setAttribute("checked", "true");
			}
		});

		radioWrap.addEventListener("click", () => {
			const { stable } = ripple.spread({
				top: radioWrap.clientHeight / 2,
				left: radioWrap.clientWidth / 2,
			});
			stable();
		});

		radioWrap.append(this.radio, ripple, this.cpRadioIcon);
		label.append(radioWrap, textSlot);
		shadowRoot.append(label);
	}

	connectedCallback() {
		if (this.getAttribute("default-checked") === "true") {
			this.setAttribute("checked", "true");
		}
	}
}

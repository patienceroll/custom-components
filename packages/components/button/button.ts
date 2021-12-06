import type { ButtonObservedAttributes } from "./data";

import CpButtonBase from "./button-base";

import { style, keyframe, watch } from "../../utils/index";

import "../ripple";
import "../circular-progress";

@style({
	".cp-button-loading > rect": {
		animation: "loading 2s linear infinite",
	},
	".cp-button-loading": {
		display: "none",
		position: "absolute",
		left: "0",
		top: "0",
		width: "100%",
		height: "100%",
	},
	".cp-button-disabled": {
		boxShadow: "none",
	},
})
@keyframe({
	loading: {
		"0%": {
			strokeDasharray: "0% 400%",
			strokeDashoffset: "0",
		},
		"100%": {
			strokeDasharray: "400% 400%",
			strokeDashoffset: "-400%",
		},
	},
})
@watch<AttachedShadowRoot<CpButton>>({
	"disable"(newer) {
		if (newer === "true") this.button.classList.add("cp-button-disabled");
		else this.button.classList.remove("cp-button-disabled");
	},
	"loading"(newer) {
		if (newer === "true") {
			this.style.setProperty("pointer-events", "none");
			this.loading.style.display = "block";
		} else {
			this.style.removeProperty("pointer-events");
			this.loading.style.display = "none";
		}
	},
	"loading-color"(newer) {
		(this.loading.firstElementChild as SVGRectElement).setAttribute("stroke", newer || "#1976d2");
	},
})
export default class CpButton extends CpButtonBase {
	/** 组件 loading(加载中动画) Dom元素  */
	public loading: SVGElement;
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		const { shadowRoot } = this as AttachedShadowRoot<CpButtonBase>;
		shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, CpButton.keyframesSheet, CpButton.styleSheet];

		const button = shadowRoot.firstElementChild as HTMLButtonElement;
		const textWrapper = document.createElement("span");
		const text = document.createElement("slot");
		const leftIcon = document.createElement("slot");
		const rightIcon = document.createElement("slot");
		const loading = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		this.loading = loading;
		loading.innerHTML =
			"<rect x='1'  y='1' rx='4' ry='4'  width='calc(100% - 2px)' height='calc(100% - 2px)' stroke-width='2' stroke='#1976d2' fill='none' />";
		loading.classList.add("cp-button-loading");
		leftIcon.setAttribute("part", "left-icon");
		rightIcon.setAttribute("part", "right-icon");
		loading.setAttribute("part", "loading");
		leftIcon.name = "left-icon";
		rightIcon.name = "right-icon";

		textWrapper.append(leftIcon, text, rightIcon);
		button.append(textWrapper, loading);
	}
}

import { style, watch, useLatestCall } from "../../utils/index";

const svg =
	"<svg viewBox='0 0 24 24'><path fill='currentcolor' d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' /></svg>";

@style({
	".light svg": {
		stroke: "currentcolor",
	},
	".base svg,.light svg": {
		width: "2em",
		height: "2em",
	},
	".light": {
		position: " absolute",
		overflow: "hidden",
		top: "0",
		left: "0",
		color: "#faaf00",
	},
	".base,.light": {
		width: "2em",
		height: "2em",
		color: "#bdbdbd",
	},
	":host([disable='true'])": {
		pointerEvents: "none",
		opacity: "0.7",
	},
	":host([readonly='true'])": {
		pointerEvents: "none",
	},
	":host(:hover)": {
		transform: "scale(1.2)",
	},
	":host": {
		display: "inline-block",
		verticalAlign: "top",
		fontSize: "12px",
		position: "relative",
		transition: "transform 300ms ease",
		cursor: "pointer",
	},
})
@watch<AttachedShadowRoot<CpRateItem>>({
	"value"(newer) {
		if (newer) this.cpLight.style.width = `${newer}%`;
		else this.cpLight.style.removeProperty("width");
	},
	"light-color"(newer) {
		if (newer) this.cpLight.style.color = newer;
		else this.cpLight.style.removeProperty("color");
	},
	"base-color"(newer) {
		if (newer) this.cpBase.style.color = newer;
		else this.cpBase.style.removeProperty("color");
	},
	"custom"(newer) {
		this.setRateIcon(newer);
	},
})
export default class CpRateItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 评分背景层 */
	public cpBase: HTMLElement;
	/** 评分点亮层 */
	public cpLight: HTMLElement;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpRateItem.styleSheet];

		this.cpBase = document.createElement("div");
		this.cpLight = document.createElement("div");

		this.cpBase.classList.add("base");
		this.cpLight.classList.add("light");

		this.setRateIcon(this.getAttribute("custom"));

		this.addEventListener("click", (event) => {
			const { offsetX } = event;
			const { clientWidth } = event.target as HTMLElement;
			this.dispatchEvent(
				new CustomEvent("cp-rate-item-rate", {
					detail: {
						nativeEvent: event,
						value: Math.abs(offsetX / clientWidth),
					},
					bubbles: true,
				})
			);
		});

		this.addEventListener(
			"mousemove",
			useLatestCall((event) => {
				const { offsetX } = event;
				const { clientWidth } = event.target as HTMLElement;
				this.dispatchEvent(
					new CustomEvent("cp-rate-item-moverate", {
						detail: {
							nativeEvent: event,
							value: Math.abs(offsetX / clientWidth),
						},
						bubbles: true,
					})
				);
			})
		);

		shadowRoot.append(this.cpBase, this.cpLight);
	}
	/** 设置图标 */
	setRateIcon(custom: string | null) {
		this.cpBase.innerHTML = custom || svg;
		this.cpLight.innerHTML = custom || svg;
	}
}

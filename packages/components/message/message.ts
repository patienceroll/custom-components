import { style, keyframe } from "../../utils";
import CpMask from "../mask/mask";
import type { MessageInt } from "./data";

@style({
	".cp-message-content": {
		top: "100px",
		left: "50%",
		height: "40px",
		borderRadius: "10px",
		transform: "translateX(-50%)",
		backgroundColor: "pink",
		color: "#fff",
		overflow: "hidden",
		textAlign: "ctenter",
		padding: "10px 20px",
		border: "1px solid #eee",
		display: "flex",
		alignItems: "center",
	},
	".cp-message-show": {
		animation: "show-message .3s ease-in-out",
		opacity: "1",
	},
	".cp-message-close": {
		animation: "close-message .3s ease-in-out",
		opacity: "0",
	},
})
@keyframe({
	"show-message": {
		"0%": {
			transform: "translate(-50%,-100px)",
			opacity: "0",
		},
		"100%": {
			transform: "translate(-50%,0)",
			opacity: "1",
		},
	},
	"close-message": {
		"0%": {
			transform: "translate(-50%,0)",
			opacity: "1",
		},
		"100%": {
			transform: "translate(-50%,-100px)",
			opacity: "0",
		},
	},
})
export default class CpMessage extends CpMask implements CustomElement {
	#message: HTMLElement;
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();

		const message = document.createElement("div");
		this.maskContent.classList.add("cp-message-content");
		this.#message = message;
		this.maskContent.append(message);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				CpMessage.styleSheet,
				CpMessage.keyframesSheet,
			];
		}
	}

	#timer = 0;
	showMessage({ message, duration = 3000 }: MessageInt) {
		this.#message.innerHTML = message;
		this.show();
		clearTimeout(this.#timer as number);
		this.#timer = setTimeout(() => {
			this.close();
		}, duration);
	}

	async onMaskShow() {
		this.maskContent.classList.add("cp-message-show");
		this.maskContent.classList.toggle("cp-message-close", false);
	}

	async onMaskClose() {
		clearTimeout(this.#timer);
		this.maskContent.classList.replace("cp-message-show", "cp-message-close");
	}
}

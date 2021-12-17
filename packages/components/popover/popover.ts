import { style, watch, keyframe, createHtmlElement, dispatchCustomEvent } from "../../utils";
import type { CpPopoverCustomEventDetail, CpPopoverProps } from "./data";

@style({
	".cp-popover-context-wrapper": {
		position: "absolute",
		visibility: "hidden",
	},
	":host": {
		display: "inline-block",
		position: "relative",
		fontSize: "16px",
	},
})
@keyframe({
	"grow-in": {
		from: {
			transform: "scale(0.85)",
			opacity: "0.8",
		},
		to: {
			transform: "scale(1)",
			opacity: "1",
		},
	},
	"grow-out": {
		from: {
			transform: "scale(1)",
			opacity: "1",
		},
		to: {
			transform: "scale(0.8)",
			opacity: "0",
		},
	},
	"fade-in": {
		from: {
			opacity: "0",
		},
		to: {
			opacity: "1",
		},
	},
	"fade-out": {
		from: {
			opacity: "1",
		},
		to: {
			opacity: "0",
		},
	},
	"zoom-in": {
		from: {
			transform: "scale(0)",
		},
		to: {
			transform: "scale(1)",
		},
	},
	"zoom-out": {
		from: {
			transform: "scale(1)",
		},
		to: {
			transform: "scale(0)",
		},
	},
})
@watch<AttachedShadowRoot<CpPopover>>({
	placement(newer) {
		this.setPopoverContextWrapperPositon((newer || "top") as CpPopover["placement"]);
	},
	open(newer) {
		if (newer === "true") this.showContext();
		else this.hideContext();
	},
})
export default class CpPopover extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;
	/** 悬浮气泡是否展示气泡的真实值 */
	private realOpen: boolean;
	/** 悬浮气泡内容容器 */
	public popoverContextWrapper: HTMLDivElement;

	/** 隐藏动画播放完成之后的事件 */
	private animationendListener: VoidFunction;

	constructor() {
		super();
		this.realOpen = false;
		this.animationendListener = () => {
			this.popoverContextWrapper.style.visibility = "hidden";
		};
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpPopover.styleSheet, CpPopover.keyframesSheet];

		const children = createHtmlElement("slot");
		this.popoverContextWrapper = createHtmlElement("div");
		const context = createHtmlElement("slot");

		context.name = "popover-context";

		this.popoverContextWrapper.classList.add("cp-popover-context-wrapper");

		const hidePopOverContext = (event: Event) => {
			const { type } = event;
			if (type === "mouseleave" && this.disableHover) return;
			if (type === "focusout" && this.disableFocus) return;
			if (type === "click" && this.disableClick) return;
			if (!this.getAttribute("open")) this.hideContext();
			dispatchCustomEvent<CpPopoverCustomEventDetail>(this, "close", {
				nativeEvent: event,
				open: false,
			});
		};

		const showPopoverContext = (event: Event) => {
			const { type } = event;
			event.stopPropagation();
			if (type === "mouseenter" && this.disableHover) return;
			if (type === "click" && this.disableClick) return;
			if (type === "focusin" && this.disableFocus) return;

			// 添加点击事件隐藏的方法
			if (type === "click") this.ownerDocument.addEventListener("click", hidePopOverContext, { once: true });
			if (!this.getAttribute("open")) this.showContext();
			dispatchCustomEvent<CpPopoverCustomEventDetail>(this, "open", { nativeEvent: event, open: true });
		};

		this.addEventListener("mouseenter", showPopoverContext);
		this.addEventListener("focusin", showPopoverContext);
		this.addEventListener("click", showPopoverContext);

		this.addEventListener("mouseleave", hidePopOverContext);
		this.addEventListener("focusout", hidePopOverContext);

		this.popoverContextWrapper.appendChild(context);
		shadowRoot.append(children, this.popoverContextWrapper);
	}

	/** 是否禁用hover触发 */
	get disableHover() {
		return this.getAttribute("disable-hover") === "true";
	}

	/** 是否禁用点击触发 */
	get disableClick() {
		return this.getAttribute("disable-click") === "true";
	}

	/** 是否禁用聚焦触发 */
	get disableFocus() {
		return this.getAttribute("disable-focus") === "true";
	}

	/** 悬浮泡泡 context 位置,默认是 top */
	get placement() {
		return (this.getAttribute("placement") || "top") as NonNullable<CpPopoverProps["placement"]>;
	}

	/** 过渡动画,默认是 grow */
	get transition() {
		return (this.getAttribute("transition") || "grow") as NonNullable<CpPopoverProps["transition"]>;
	}

	/** 根据 placement 获取悬浮泡泡的 position 定位值 */
	private getPopoverPositionByPlacement(placement: CpPopover["placement"]) {
		const { clientHeight, clientWidth } = this.popoverContextWrapper;
		const postion = { top: "unset", left: "unset" };
		switch (placement) {
			case "top":
				postion.top = `calc(${-clientHeight}px - 1em)`;
				postion.left = `calc(50% - ${Math.floor(clientWidth / 2)}px)`;
				break;
			case "top-start":
				postion.top = `calc(${-clientHeight}px - 1em)`;
				postion.left = "0";
				break;
			case "top-end":
				postion.top = `calc(${-clientHeight}px - 1em)`;
				postion.left = `calc(100% - ${clientWidth}px)`;
				break;
			case "left":
				postion.top = `calc(50% - ${Math.floor(clientHeight / 2)}px)`;
				postion.left = `calc(${-clientWidth}px - 1em)`;
				break;
			case "left-start":
				postion.top = "0";
				postion.left = `calc(${-clientWidth}px - 1em)`;
				break;
			case "left-end":
				postion.top = `calc(100% - ${clientHeight}px)`;
				postion.left = `calc(${-clientWidth}px - 1em)`;
				break;
			case "right":
				postion.top = `calc(50% - ${Math.floor(clientHeight / 2)}px)`;
				postion.left = "calc(100% + 1em)";
				break;
			case "right-start":
				postion.top = "0";
				postion.left = "calc(100% + 1em)";
				break;
			case "right-end":
				postion.top = `calc(100% - ${clientHeight}px)`;
				postion.left = "calc(100% + 1em)";
				break;
			case "bottom":
				postion.top = "calc(100% + 1em)";
				postion.left = `calc(50% - ${Math.floor(clientWidth / 2)}px)`;
				break;
			case "bottom-start":
				postion.top = "calc(100% + 1em)";
				postion.left = "0";
				break;
			case "bottom-end":
				postion.top = "calc(100% + 1em)";
				postion.left = `calc(100% - ${clientWidth}px)`;
				break;
			// 默认是和 top 一样的
			default:
				postion.top = `calc(${-clientHeight}px - 1em)`;
				postion.left = `calc(50% - ${Math.floor(clientWidth / 2)}px)`;
		}
		return postion;
	}

	/** 根据placement获取transfrom origin */
	private getPopoverTransformOriginByPlacement(placement: CpPopover["placement"]) {
		return {
			"top": "bottom center",
			"top-start": "bottom left",
			"top-end": "bottom right",
			"left": "center right",
			"left-start": "top right",
			"left-end": "bottom right",
			"right": "center left",
			"right-start": "top left",
			"right-end": "bottom left",
			"bottom": "top center",
			"bottom-start": "top left",
			"bottom-end": "top right",
		}[placement];
	}

	/** 设置悬浮泡泡的位置 */
	setPopoverContextWrapperPositon(placement: CpPopover["placement"]) {
		const { top, left } = this.getPopoverPositionByPlacement(placement);
		this.popoverContextWrapper.style.top = top;
		this.popoverContextWrapper.style.left = left;
	}

	/** 悬浮气泡出现时的动画,默认 grow */
	private comingAnimate(transition: CpPopover["transition"]) {
		switch (transition) {
			case "grow":
				this.popoverContextWrapper.style.animation = "grow-in ease 300ms";
				break;
			case "fade":
				this.popoverContextWrapper.style.animation = "fade-in ease 500ms";
				break;
			case "zoom":
				this.popoverContextWrapper.style.animation = "zoom-in ease 300ms";
				break;
			default:
				this.popoverContextWrapper.style.animation = "grow-in ease 300ms";
		}
	}

	/** 悬浮气泡出消失的动画 */
	private goingAnimate(transition: CpPopover["transition"]) {
		switch (transition) {
			case "grow":
				this.popoverContextWrapper.style.animation = "grow-out ease 300ms";
				break;
			case "fade":
				this.popoverContextWrapper.style.animation = "fade-out ease 500ms";
				break;
			case "zoom":
				this.popoverContextWrapper.style.animation = "zoom-out ease 300ms";
				break;
			default:
				this.popoverContextWrapper.style.animation = "grow-out ease 300ms";
		}
	}

	/** 展示悬浮泡泡 */
	showContext() {
		this.realOpen = true;
		this.popoverContextWrapper.style.visibility = "unset";
		this.popoverContextWrapper.removeEventListener("animationend", this.animationendListener);
		this.setPopoverContextWrapperPositon(this.placement);
		this.popoverContextWrapper.style.transformOrigin = this.getPopoverTransformOriginByPlacement(this.placement);
		requestAnimationFrame(() => {
			this.comingAnimate(this.transition);
		});
	}

	/** 隐藏悬浮泡泡 */
	hideContext() {
		this.realOpen = false;
		this.goingAnimate(this.transition);
		this.popoverContextWrapper.addEventListener("animationend", this.animationendListener, { once: true });
	}

	connectedCallback() {
		this.setPopoverContextWrapperPositon(this.placement);
	}
}

import {
	style,
	AttrToNumber,
	watch,
	defineCustomComponents,
	setAttributes,
	createHtmlElement,
	getOffsetLeft,
} from "../../utils";
import CpTooltip from "../tooltip/tooltip";

defineCustomComponents("cp-tooltip", CpTooltip);
@style({
	".cp-slider-block:active .cp-slider-block-shadow": {
		transform: "translate(-50%,-50%) scale(1)",
	},
	".cp-slider-block:hover .cp-slider-block-shadow": {
		transform: "translate(-50%,-50%) scale(0.77)",
	},
	".cp-slider-block-shadow": {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: "inherit",
		height: "inherit",
		transform: "translate(-50%,-50%) scale(0)",
		backgroundColor: "currentColor",
		opacity: "0.2",
		transition: "transform 200ms ease ",
		borderRadius: "50%",
	},
	".cp-slider-block-core": {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		width: "1.25em",
		height: "1.25em",
		backgroundColor: "currentColor",
		borderRadius: "50%",
		boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
	},
	".cp-slider-block": {
		position: "absolute",
		top: "50%",
		left: "0",
		width: "2.625em",
		height: "2.625em",
		transform: "translate(-50%,-50%)",
		transition: "left 300ms ease",
	},
	".cp-slider-tracked": {
		height: "0.375em",
		width: "0px",
		opacity: "1",
		transition: "width 300ms ease",
	},
	".cp-slider-rail": {
		width: "100%",
	},
	".cp-slider-rail,.cp-slider-tracked": {
		position: "absolute",
		height: "0.25em",
		backgroundColor: "currentColor",
		borderRadius: "0.25em",
		left: "0",
		top: "50%",
		transform: "translateY(-50%)",
		opacity: "0.38",
	},
	":host": {
		display: "inline-block",
		height: "1.875em",
		position: "relative",
		fontSize: "16px",
		cursor: "pointer",
		color: "#1976d2",
		width: "100%",
	},
})
@watch<AttachedShadowRoot<CpSlider>>({
	value(newer) {
		this.sliderChangeRender(Number(newer));
	},
	min(newer) {
		this.sliderChangeRender(Number(newer));
	},
	precision(newer) {
		this.sliderChangeRender(Number(newer));
	},
	max(newer) {
		this.sliderChangeRender(Number(newer));
	},
})
export default class CpSlider extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 滑块tooltip context的 html */
	static cpToolTipInnerHtml = "<div style='width: 2.625em'></div>";
	/** 滑块的控件 innerHtml */
	static cpSliderBlockInnerHtml = "<div class='cp-slider-block-shadow'></div><div class='cp-slider-block-core'></div>";

	/** 当是单个值的滑块的时候保存的值 */
	private realValue: number;

	/** 当是范围滑块的时候,保存的值 */
	private realValueRange: [number, number];

	/** 滑块轨道 */
	public sliderRail: HTMLSpanElement;
	/** 滑块占有的轨道 */
	public sliderTracked: HTMLSpanElement;
	/** 滑块的操作块 */
	public sliderBlock: HTMLSpanElement;
	/** 滑块值的toolTip */
	public cpTooltip: CpTooltip;
	/** 滑块tip的value值容器 */
	public cpToolTipContext: HTMLSpanElement;

	constructor() {
		super();
		this.realValue = this.defaultValue ? Number(this.defaultValue) : this.min;
		this.realValueRange = [this.min, this.max];
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpSlider.styleSheet];

		this.sliderRail = createHtmlElement("span");
		this.sliderTracked = createHtmlElement("span");
		this.sliderBlock = createHtmlElement("span");
		this.cpTooltip = createHtmlElement("cp-tooltip");
		this.cpToolTipContext = createHtmlElement("span");

		setAttributes(this.sliderRail, { class: "cp-slider-rail" });
		setAttributes(this.sliderTracked, { class: "cp-slider-tracked" });
		setAttributes(this.sliderBlock, { class: "cp-slider-block" });
		setAttributes(this.cpTooltip, { class: "cp-tooltip", open: "false", arrow: "true" });
		setAttributes(this.cpToolTipContext, { slot: "tooltip-context" });

		this.cpTooltip.innerHTML = CpSlider.cpToolTipInnerHtml;
		this.sliderBlock.innerHTML = CpSlider.cpSliderBlockInnerHtml;
		this.cpToolTipContext.innerHTML = `${this.realValue}`;

		this.addEventListener("click", (event) => {
			const percent = this.calculatePercent(event.offsetX, this.clientWidth);
			const realValue = this.calculateRealValue(percent);
			if (!this.value) {
				this.realValue = realValue;
				this.sliderChangeRender(realValue);
			}

			this.dispatchEvent(
				new CustomEvent("change", {
					detail: {
						value: realValue,
						nativeEvent: event,
					},
				})
			);
		});

		/** 当按住操作块之后鼠标移动事件 */
		const onPressSliderBlockMoveEvent = (event: MouseEvent) => {
			const percent = this.calculatePercent(event.pageX - getOffsetLeft(this), this.clientWidth);
			const realValue = this.calculateRealValue(percent);

			if (!this.value) {
				this.realValue = realValue;
				this.sliderChangeRender(realValue);
			}
			this.dispatchEvent(
				new CustomEvent("change", {
					detail: {
						value: realValue,
						nativeEvent: event,
					},
				})
			);
		};

		/** 清除本元素添加到 owner document 的事件 */
		const clearOwnerDocumentEvent = () => {
			this.sliderBlock.style.removeProperty("transition-duration");
			this.sliderTracked.style.removeProperty("transition-duration");
			this.cpTooltip.setAttribute("open", "false");
			this.ownerDocument.removeEventListener("mousemove", onPressSliderBlockMoveEvent);
			this.ownerDocument.removeEventListener("mouseup", clearOwnerDocumentEvent);
		};

		this.sliderBlock.addEventListener("mousedown", (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.sliderBlock.style.transitionDuration = "0ms";
			this.sliderTracked.style.transitionDuration = "0ms";
			if (this.showLable) this.cpTooltip.setAttribute("open", "true");
			this.ownerDocument.addEventListener("mousemove", onPressSliderBlockMoveEvent);
			this.ownerDocument.addEventListener("mouseup", clearOwnerDocumentEvent);
		});

		this.cpTooltip.appendChild(this.cpToolTipContext);
		this.sliderBlock.appendChild(this.cpTooltip);
		shadowRoot.append(this.sliderRail, this.sliderTracked, this.sliderBlock);
	}

	get defaultValue() {
		return this.getAttribute("default-value");
	}

	/** 属性值 prop */
	get value() {
		return this.getAttribute("value");
	}

	/** 最小value值 默认 0 */
	get min() {
		return AttrToNumber(this, "min", 0) as number;
	}

	/** 最大value值 默认 100 */
	get max() {
		return AttrToNumber(this, "max", 100) as number;
	}

	/** 滑块儿的精度,默认 1, */
	get precision() {
		return AttrToNumber(this, "precision", 1) as number;
	}

	/** 是否展示标签 */
	get showLable() {
		return this.getAttribute("show-label") === "true";
	}

	/** 计算滑块所在位置在轨道长度上所占百分比,值为 0 ~ 1 */
	calculatePercent(offsetX: number, xWidth: number) {
		if (offsetX < 0) return 0;
		if (offsetX > xWidth) return 1;
		return offsetX / this.clientWidth;
	}

	/** 根据百分比、精度、最大值、最小值计算 realValue */
	calculateRealValue(percent: number) {
		/** 当前百分比代表的值 */
		const value = (this.max - this.min) * percent + this.min;
		/** 值范围除以精度的余数 */
		const remainder = Math.abs(value) % this.precision;
		if (remainder < this.precision / 2) return value < 0 ? value + remainder : value - remainder;
		return value < 0 ? value - (this.precision - remainder) : value + (this.precision - remainder);
	}

	/** 渲染渲染滑块位置和已使用的轨道长度 */
	sliderChangeRender(realValue: number) {
		const realValuePencent = (realValue - this.min) / (this.max - this.min);
		this.sliderBlock.style.left = `${realValuePencent * this.clientWidth}px`;
		this.sliderTracked.style.width = `${realValuePencent * 100}%`;
		if (this.showLable) {
			this.cpToolTipContext.innerHTML = `${realValue}`;
			requestAnimationFrame(() => {
				this.cpTooltip.CpPopover.setPopoverContextWrapperPositon("top");
			});
		}
	}

	connectedCallback() {
		if (!this.getAttribute("value")) this.sliderChangeRender(this.realValue);
	}
}

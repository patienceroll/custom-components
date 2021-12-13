import { createHtmlElement, setAttributes, style, watch } from "../../utils";

const ArrowDownSvg =
	"<svg class='cp-accordion-title-arrow' viewBox='0 0 24 24' width='1.5em' height='1.5em'><path fill='currentcolor' d='M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z'></path></svg>";

@style({
	".cp-accordion-item-content-slot": {
		display: "block",
		overflow: "hidden",
		padding: "0.5em 1em 1em",
	},
	".cp-accordion-item-content": {
		height: "0",
		transition: "height ease 400ms",
		overflow: "hidden",
	},
	":host([open='true']) .cp-accordion-title-arrow": {
		transform: "rotate(0)",
	},
	".cp-accordion-title-arrow": {
		transform: "rotate(-180deg)",
		transition: "transform 400ms ease",
	},
	".cp-accordion-item-title-arrow": {
		display: "flex",
		alignItems: "center",
	},
	":host([open='true']) .cp-accordion-item-title": {
		padding: "1.25em 1em",
	},
	".cp-accordion-item-title": {
		display: "flex",
		padding: "0.75em 1em",
		userSelect: "none",
		cursor: "pointer",
		justifyContent: "space-between",
		transition: "padding ease 300ms",
	},
	":host([last-item='true'])": {
		borderRadius: "0 0 0.25em 0.25em",
		marginBottom: "0",
	},
	":host([first-item='true'])": {
		marginTop: "0",
		borderRadius: "0.25em 0.25em 0 0",
	},
	":host([open='true'])": {
		marginTop: "1em",
		marginBottom: "1em",
	},
	":host": {
		borderTop: "1px solid #e9e9e9",
		display: "block",
		fontSize: "16px",
		backgroundColor: "#fff",
		transition: "margin-bottom ease 300ms,margin-top ease 300ms",
		boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%)",
	},
})
@watch<AttachedShadowRoot<CpAccordionItem>>({
	open(newer) {
		if (newer === "true")
			this.content.style.height = `${(this.content.firstElementChild as HTMLSlotElement).clientHeight}px`;
		else this.content.style.removeProperty("height");
	},
})
export default class CpAccordionItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	public content: HTMLElement;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpAccordionItem.styleSheet];

		const title = createHtmlElement("div");
		const titleTextWrapper = createHtmlElement("div");
		const titleSlot = createHtmlElement("slot");
		const titleArrow = createHtmlElement("div");
		this.content = createHtmlElement("div");
		const contentSlot = createHtmlElement("slot");

		setAttributes(titleSlot, { name: "title", class: "cp-accordion-item-title" });
		setAttributes(titleArrow, { class: "cp-accordion-item-title-arrow" });
		setAttributes(this.content, { class: "cp-accordion-item-content" });
		setAttributes(contentSlot, { class: "cp-accordion-item-content-slot" });

		title.addEventListener("click", () => this.toggleOpen());

		titleArrow.innerHTML = ArrowDownSvg;
		titleTextWrapper.appendChild(titleSlot);
		title.append(titleTextWrapper, titleArrow);
		this.content.appendChild(contentSlot);
		shadowRoot.append(title, this.content);
	}

	/** 切换是否展开的方法 */
	toggleOpen() {
		const open = this.getAttribute("open");
		if (open === "true") {
			this.setAttribute("open", "false");
			this.dispatchEvent(new CustomEvent("cp-accordion-item-fold", { bubbles: true }));
		} else {
			this.setAttribute("open", "true");
			this.dispatchEvent(new CustomEvent("cp-accordion-item-expand", { bubbles: true }));
		}
	}
}

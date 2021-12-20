import { addCustomEventListener, dispatchCustomEvent, style, watch } from "../../utils";
import type { TabEventDetail, TabsEventDetail } from "./data";

import type CpTab from "./tab";

@style({
	".cp-tabs-children": {
		display: "flex",
	},
	".cp-tabs-weapper-bar": {
		position: "absolute",
		width: "0",
		bottom: "0",
		left: "0",
		height: "2px",
		backgroundColor: "#007FFF",
		transition: "left ease 500ms,width ease 300ms",
	},
	".cp-tabs-wrapper": {
		display: "flex",
		position: "relative",
	},
	":host": {
		display: "block",
		wordSpacing: "0",
		borderBottom: "1px solid rgba(0,0,0,0.12)",
	},
})
@watch<AttachedShadowRoot<CpTabs>>({
	"center"(newer) {
		if (newer === "true") this.wrapper.style.justifyContent = "center";
		else this.wrapper.style.removeProperty("justifyContent");
	},
	"active-key"(newer) {
		if (newer) this.setRealActiveKey(newer);
	},
})
export default class CpTabs extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** tabs shdowDom 下最外层容器 */
	public wrapper: HTMLDivElement;
	/** tabs 当前激活的tab 下的bar */
	public wrapperBar: HTMLDivElement;
	/** 当前组件激活的key,为组件实际显示的值,当为受控的时候,会同步属性 active-key 的值 */
	private realActiveKey: string;

	constructor() {
		super();
		this.realActiveKey = "";
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [CpTabs.styleSheet];

		this.wrapper = document.createElement("div");
		this.wrapperBar = document.createElement("div");
		const children = document.createElement("slot");

		this.wrapper.classList.add("cp-tabs-wrapper");
		this.wrapperBar.classList.add("cp-tabs-weapper-bar");
		children.classList.add("cp-tabs-children");

		addCustomEventListener<TabEventDetail>(this, "cp-tab-click", (event) => {
			const { detail } = event;
			if (detail.key) {
				/** 如果是非受控的,更新内部维护的值,触发组件内部更新 */
				if (!this.getAttribute("active-key")) this.setRealActiveKey(detail.key);
				dispatchCustomEvent<TabsEventDetail>(
					this,
					"change",
					{ activeKey: detail.key, nativeEvent: event },
					{ bubbles: true }
				);
			}
		});

		this.wrapper.append(children, this.wrapperBar);
		shadowRoot.append(this.wrapper);
		console.dir(this);
	}

	/** 当前tabs控制的tab节点 */
	get tabNodes() {
		return Array.from(this.children).filter((node) => node.localName === "cp-tab") as CpTab[];
	}

	/** 激活某一个tab,其余tab应该被取消激活 */
	activeTab(activeKey: string) {
		this.tabNodes.forEach((tab) => {
			if (tab.key === activeKey) {
				tab.active();
			} else tab.cancelAtive();
		});
	}

	/** 渲染tab-bar */
	renderBar(activeKey: string) {
		const tab = this.tabNodes.find((t) => t.key === activeKey);
		if (tab) {
			// tab 的父级是slot,但是偏移的父级是 slot 的父级,这里为什么还没确定
			this.wrapperBar.style.left = `${tab.offsetLeft}px`;
			this.wrapperBar.style.width = `${tab.clientWidth}px`;
		}
	}

	/** 设置保存在组件内部的 activeKey */
	setRealActiveKey(activeKey: string) {
		this.realActiveKey = activeKey;
		this.activeTab(activeKey);
		this.renderBar(activeKey);
	}
}

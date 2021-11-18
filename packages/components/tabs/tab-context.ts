import { style, watch } from '../../utils/decorators';

import { CpTabContextObservedAttributes } from './data';

import CpTabs from './tabs';
import CpTabPanel from './tab-panel';

@style({
	':host': {
		display: 'block',
	},
})
@watch<CpTabContextObservedAttributes, AttachedShadowRoot<TabContext>>(['active-key'], function (attr, older, newer) {
	switch (attr) {
		case 'active-key':
			if (newer) this.setRealActiveKey(newer);
			break;
	}
})
export default class TabContext extends HTMLElement implements CustomElement {
	/**
	 * 维护在组件内部的当前激活的tab key
	 * - 组件的实际显示都依靠这个值
	 * - 为了实现受控,当属性 activeKey变化的时候,会同步给这个值
	 */
	private realActivekey: string;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const tabNodes = this.tabNodes;
		if (tabNodes && tabNodes.length !== 0) this.realActivekey = tabNodes[0].key || '';
		else this.realActivekey = '';

		this.addEventListener('change', ($event) => {
			const { detail } = $event as CustomEvent<{ activeKey: string }>;
			/** 如果是非受控的,更新内部维护的值,触发组件内部更新 */
			if (!this.getAttribute('active-key')) this.setRealActiveKey(detail.activeKey);
		});

		const children = document.createElement('slot');
		shadowRoot.appendChild(children);
	}

	/**  TabContext 组件子元素 tabs */
	get tabsNode() {
		return Array.from(this.children).find((item) => item.localName === 'cp-tabs') as CpTabs | undefined;
	}

	/** TabContext 组件子元素 tab */
	get tabNodes() {
		return this.tabsNode?.tabNodes;
	}

	/** TabContext 组件子元素 tabPanel */
	get tabPanelNodes() {
		return Array.from(this.children).filter((item) => item.localName === 'cp-tab-panel') as CpTabPanel[];
	}

	/** 设置当前 tabContext 激活的key */
	setRealActiveKey(activeKey: string) {
		this.realActivekey = activeKey;
		this.tabPanelNodes.forEach((panel) => {
			if (panel.key === activeKey) panel.setAttribute('active', 'true');
			else panel.setAttribute('active', 'false');
		});
		if (this.tabsNode) this.tabsNode.setAttribute('active-key', activeKey);
	}

	connectedCallback() {
		/** 挂载的时候,如果是非受控的,第一个tab为默认选中的key */
		const tabNodes = this.tabNodes;
		if (!this.getAttribute('active-key') && tabNodes && tabNodes[0]) {
			this.setRealActiveKey(tabNodes[0].key || '');
		}
	}
}

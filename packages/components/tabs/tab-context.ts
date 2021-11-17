import { style, watch } from '../../utils/decorators';

import { CpTabContextObservedAttributes } from './data';

import CpTabs from './tabs';

@style({
	':host': {
		display: 'block',
	},
})
@watch<CpTabContextObservedAttributes, AttachedShadowRoot<TabContext>>(['active-key'], function (attr, older, newer) {
	switch (attr) {
		case 'active-key':
			if (newer) this.realActivekey = newer;
			break;
	}
})
export default class TabContext extends HTMLElement implements CustomElement {
	/**
	 * 维护在组件内部的当前激活的tab key
	 * - 组件的实际显示都依靠这个值
	 * - 为了实现受控,当属性 activeKey变化的时候,会同步给这个值
	 */
	public realActivekey: string | null;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const tabNodes = this.tabNodes;
		if (tabNodes && tabNodes.length !== 0) this.realActivekey = tabNodes[0].key;
		else this.realActivekey = null;

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

	connectedCallback() {}
}

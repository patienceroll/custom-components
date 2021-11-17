import { style, watch } from '../../utils/decorators';

import type { CpTabsObservedAttributes } from './data';

import CpTab from './tab';

@style({
	'.cp-tabs-children': {
		display: 'flex',
	},
	'.cp-tabs-weapper-bar': {
		position: 'absolute',
		width: '74px',
		bottom: '0',
		left: '0',
		height: '2px',
		backgroundColor: '#007FFF',
		transition: 'left ease 300ms,width ease 300ms',
	},
	'.cp-tabs-wrapper': {
		display: 'flex',
		position: 'relative',
	},
	':host': {
		display: 'block',
		wordSpacing: '0',
		borderBottom: '1px solid rgba(0,0,0,0.12)',
	},
})
@watch<CpTabsObservedAttributes, AttachedShadowRoot<CpTabs>>(['center'], function (attr, older, newer) {
	switch (attr) {
		case 'center':
			if (newer === 'true') this.wrapper.style.justifyContent = 'center';
			else this.wrapper.style.removeProperty('justifyContent');
			break;
		case 'active-key':
			break;
	}
})
export default class CpTabs extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** tabs shdowDom 下最外层容器 */
	public wrapper: HTMLDivElement;
	/** tabs 当前激活的tab 下的bar */
	public wrapperBar: HTMLDivElement;
	/** 当前组件激活的key,为组件实际显示的值,当为受控的时候,会同步属性 active-key 的值 */
	public realActiveKey: string | null;
	constructor() {
		super();
		this.realActiveKey = null;
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTabs.styleSheet];
		
		this.wrapper = document.createElement('div');
		this.wrapperBar = document.createElement('div');
		const children = document.createElement('slot');

		this.wrapper.classList.add('cp-tabs-wrapper');
		this.wrapperBar.classList.add('cp-tabs-weapper-bar');
		children.classList.add('cp-tabs-children');

		this.wrapper.append(children, this.wrapperBar);
		shadowRoot.append(this.wrapper);
	}

	/** 当前tabs控制的tab节点(只期望) */
	get tabNodes() {
		return Array.from(this.children).filter((node) => node.localName === 'cp-tab') as CpTab[];
	}

	/** 生成tab选项 */
	generateTab() {}

	connectedCallback() {}
}

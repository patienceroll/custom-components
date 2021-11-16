import { style } from '../../utils/decorators';

import CpTab from './tab';

@style({
	':host': {
		display: 'flex',
		wordSpacing: '0',
	},
})
export default class CpTabs extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTabs.styleSheet];
		const children = document.createElement('slot');
		shadowRoot.append(children);
	}

	/** children里的所有tab（子元素里的,不是子Dom树里的） */
	get childrenTabNodes() {
		return Array.from(this.children).filter((node) => node.localName === 'cp-tab') as CpTab[];
	}

	/** 生成tab选项 */
	generateTab() {}

	connectedCallback() {}
}

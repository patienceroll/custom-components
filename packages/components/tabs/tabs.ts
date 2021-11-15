import CpTab from './tab';

export default class CpTabs extends HTMLElement implements CustomElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const children = document.createElement('slot');

		shadowRoot.append(children);
	}

	/** 获取所有tab(第一子集) */
	getTabNodes() {
		return Array.from(this.children).filter((node) => node.localName === 'cp-tab') as CpTab[];
	}

	connectedCallback() {
    
	}
}

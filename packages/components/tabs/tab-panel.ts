import { style, watch } from '../../utils/index';

import type { CpTabPanelObservedAttributes } from './data';

@style({
	":host([active='true'])": {
		display: 'block',
	},
	':host': {
		display: 'none',
		fontSize: '16px',
		padding: '1.5em',
	},
})
@watch<CpTabPanelObservedAttributes, AttachedShadowRoot<CpTabPanel>>(['active'], function (attr, older, newer) {
	switch (attr) {
		case 'active':
			// 先交由css控制吧
			break;
	}
})
export default class CpTabPanel extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTabPanel.styleSheet];

		const children = document.createElement('slot');
		shadowRoot.append(children);
	}

	/** 当前tabpanel的key */
	get key() {
		return this.getAttribute('key');
	}
}

import type { AccordionItemAttributes } from './data';

import { style, watch } from '../../utils/decorators';

@style({
	':host': {
		display: 'block',
	},
})
@watch<AccordionItemAttributes>(['disable', 'open'], function (attr, older, newer) {})
export default class CpAccordionItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpAccordionItem.styleSheet];
		const titleWrapper = document.createElement('div');
		const title = document.createElement('slot');
		const childrenWrapper = document.createElement('slot');
		const children = document.createElement('slot');

		title.name = 'title';

		titleWrapper.appendChild(title);
		childrenWrapper.appendChild(children);
		shadowRoot.append(titleWrapper, childrenWrapper);
	}
}

import type CpAccordionItem from './accordion-item';
import { style } from '../../utils/decorators';

@style({
	':host': {
		display: 'block',
		fontSize: '16px',
	},
})
export default class CpAccordion extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpAccordion.styleSheet];

		const slot = document.createElement('slot');

		shadowRoot.appendChild(slot);
	}

	/** 获取所有手风琴面板item  */
	get items() {
		return this.querySelectorAll<CpAccordionItem>('cp-accordion-item');
	}
}

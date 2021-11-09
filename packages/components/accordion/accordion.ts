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
	public realActiveKeys: string[];

	constructor() {
		super();
		this.realActiveKeys = this.accordionItems
			.map((i) => {
				if (i.getAttribute('open') === 'true' && i.key) return i.key;
				return '';
			})
			.filter((key) => key);
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpAccordion.styleSheet];

		const slot = document.createElement('slot');

		/** 监听单个折叠面板折叠 */
		this.addEventListener('fold', (event) => {
			const { key } = event.target as CpAccordionItem;
			if (key) {
				this.realActiveKeys = this.realActiveKeys.filter((k) => k !== key);
			}
		});
		/** 监听单个折叠面板展开 */
		this.addEventListener('expand', (event) => {
			console.log(event);
		});

		shadowRoot.appendChild(slot);
	}

	/** 获取所有手风琴面板item  */
	get accordionItems() {
		return Array.from(this.querySelectorAll<CpAccordionItem>('cp-accordion-item'));
	}

	setRealActiveKeys() {}
}

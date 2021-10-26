import type { CpRateObservedAttributes } from './data';

import { style, watch } from '../../utils/decorators';

@style({
	':host': {
		display: 'inline-block',
		fontSize: '24px',
		height: '24px',
		verticalAlign: 'middle',
	},
})
@watch<CpRateObservedAttributes, AttachedShadowRoot<CpRate>>(['value', 'precision'], function (attr, older, newer) {
	switch (attr) {
		case 'value':
			break;
		case 'precision':
			break;
		case 'highest':
			break;
	}
})
export default class CpRate extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRate.styleSheet];
		const slot = document.createElement('slot');

		this.addEventListener('rate', (event) => {
			const { detail } = event as CustomEvent<{ value: number; domEvent: MouseEvent }>;
			const { value, domEvent } = detail;
			const rateItems = Array.from(this.rateItems.values());
			const index = rateItems.findIndex((item) => item === domEvent.target);
			rateItems.forEach((item, i) => {
				if (i < index) {
					item.setAttribute('value', '100');
				} else if (i === index) {
					item.setAttribute('value', `${value * 100}`);
				} else {
					item.setAttribute('value', '0');
				}
			});
		});

		shadowRoot.appendChild(slot);
	}

	/** 评分组件下的所有 “单个评分” */
	get rateItems() {
		return this.querySelectorAll('cp-rate-item');
	}

	/** 评分的精度,默认为 5 */
	get precision() {
		const precision = Number(this.getAttribute('precision'));
		return Number.isNaN(precision) ? precision : 5;
	}

	/** 评分的最高值,默认 100 */
	get highest() {
		const highest = Number(this.getAttribute('highest'));
		return Number.isNaN(highest) ? highest : 100;
	}
}

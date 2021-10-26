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
			console.log(event);
		});

		shadowRoot.appendChild(slot);
	}

	get rateItems() {
	
		return this.querySelectorAll('cp-rate-item');
	}
}

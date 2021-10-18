import type { CpRateItemObservedAttributes } from './data';

import { style, watchAttr } from '../../utils/decorators';

const svg = `<div class="cp-rate-item-base">
	<svg viewBox="0 0 24 24">
		<path fill="currentcolor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
	</svg>
</div>
<div class="cp-rate-item-active">
	<svg viewBox="0 0 24 24">
		<path fill="currentcolor" stroke="currentcolor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
	</svg>
</div>
`;

@style({
	':host': {
		display: 'inline-block',
		lineHeight: '1em',
		fontSize: 'inherit',
		verticalAlign: 'top',
	},
	'.cp-rate-item': {
		width: '1em',
		height: '1em',
		position: 'relative',
	},
	'.cp-rate-item-base': {
		color: '#7F8E9D',
	},
	'.cp-rate-item-active': {
		color: '#faaf00',
		position: 'absolute',
		width: '1em',
		height: '1em',
		top: '0',
		left: '0',
	},
})
@watchAttr<CpRateItemObservedAttributes>({
	attr: ['value'],
	callback(attr, older, newer) {
		switch (attr) {
			case 'value':
				console.log(older, newer);
			default:
				break;
		}
	},
})
export default class CpRateItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRateItem.styleSheet];

		const container = document.createElement('div');
		container.classList.add('cp-rate-item');

		container.innerHTML = svg;
		shadowRoot.appendChild(container);
	}
	attributeChangedCallback(attr: any, older: any, newer: any) {
		switch (attr) {
			case 'value':
				console.log(older, newer, '232');
			default:
				break;
		}
	}
}

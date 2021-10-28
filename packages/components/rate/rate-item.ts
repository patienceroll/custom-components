import type { CpRateItemObservedAttributes } from './data';

import { style, watch } from '../../utils/decorators';
import { useLatestCall } from 'packages/utils/common-functions';

const svg = `<svg viewBox="0 0 24 24"><path fill="currentcolor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>`;

@style({
	'.light svg': {
		stroke: 'currentcolor',
	},
	'.base svg,.light svg': {
		width: '2em',
		height: '2em',
	},
	'.light': {
		position: ' absolute',
		overflow: 'hidden',
		top: '0',
		left: '0',
		color: '#faaf00',
	},
	'.base,.light': {
		width: '2em',
		height: '2em',
		color: '#bdbdbd',
	},
	':host([disable="true"])': {
		pointerEvents: 'none',
	},
	':host(:hover)': {
		transform: 'scale(1.2)',
	},
	':host': {
		display: 'inline-block',
		verticalAlign: 'top',
		fontSize: '12px',
		position: 'relative',
		transition: 'transform 300ms ease',
		cursor: 'pointer',
	},
})
@watch<CpRateItemObservedAttributes, AttachedShadowRoot<CpRateItem>>(
	['value', 'base-color', 'light-color'],
	function (attr, older, newer) {
		const light = this.shadowRoot.querySelector('.light') as HTMLDivElement;
		switch (attr) {
			case 'value':
				if (newer) light.style.width = `${newer}%`;
				else light.style.removeProperty('width');
				break;
			case 'light-color':
				if (newer) light.style.color = newer;
				else light.style.removeProperty('color');
				break;
			case 'base-color':
				const base = this.shadowRoot.querySelector('.base') as HTMLDivElement;
				if (newer) base.style.color = newer;
				else base.style.removeProperty('color');
				break;
			default:
				break;
		}
	}
)
export default class CpRateItem extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRateItem.styleSheet];

		const Base = document.createElement('div');
		const Light = document.createElement('div');
		Base.classList.add('base');
		Light.classList.add('light');

		Base.innerHTML = svg;
		Light.innerHTML = svg;

		this.addEventListener('click', (event) => {
			const { offsetX } = event;
			const { clientWidth } = event.target as HTMLElement;
			this.dispatchEvent(
				new CustomEvent('rate', {
					detail: {
						domEvent: event,
						value: Math.abs(offsetX / clientWidth),
					},
					bubbles: true,
				})
			);
		});

		this.addEventListener(
			'mousemove',
			useLatestCall((event) => {
				const { offsetX } = event;
				const { clientWidth } = event.target as HTMLElement;
				this.dispatchEvent(
					new CustomEvent('moverate', {
						detail: {
							domEvent: event,
							value: Math.abs(offsetX / clientWidth),
						},
						bubbles: true,
					})
				);
			})
		);

		shadowRoot.append(Base, Light);
	}
}

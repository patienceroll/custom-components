import type { CpRadioObservedAttributes } from './data';
import type Ripple from '../ripple/ripple';

import { formatStyle } from 'packages/utils/style';

import '../ripple';

export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 input 元素 */
	radio: HTMLInputElement;
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-radio-radio-wrap > input': {
			opacity: '0',
			position: 'absolute',
			zIndex: '1',
			width: '100%',
			height: '100%',
			margin: '0',
			top: '0',
			left: '0',
		},
		'.cp-radio-icon': {
			width: '100%',
			height: '100%',
		},
		'.cp-radio-radio-wrap': {
			display: 'inline-flex',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
			padding: '0.2em',
			width: '1.2em',
			height: '1.2em',
			verticalAlign: 'middle',
		},
		'.cp-radio-label > slot': {
			display: 'inline-block',
			verticalAlign: 'middle',
		},
		'.cp-radio-label': {
			display: 'inline-block',
			cursor: 'pointer',
		},
		':host': {
			display: 'inline-block',
			cursor: 'pointer',
		},
	};

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet];

		const label = document.createElement('label');
		const radioWrap = document.createElement('span');
		const radio = document.createElement('input');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;
		const radioIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const textSlot = document.createElement('slot');

		radioIcon.setAttribute('viewBox', '0 0 100 100');
		radioIcon.innerHTML = `<circle cx="50" cy="50" r="42" stroke="#e0e0e0" fill="none" stroke-width="8"  />
			<circle cx="50" cy="50" r="28" fill="#e0e0e0" />
		`;

		radioIcon.classList.add('cp-radio-icon');
		label.classList.add('cp-radio-label');
		radioWrap.classList.add('cp-radio-radio-wrap');

		radio.type = 'radio';

		radioWrap.append(radio, ripple, radioIcon);
		label.append(radioWrap, textSlot);
		shadowRoot.append(label);

		this.radio = radio;
	}

	static observedAttributes: CpRadioObservedAttributes[] = ['checked'];
	attributeChangedCallback(
		this: AttachedShadowRoot<CpRadio>,
		attr: CpRadioObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		switch (attr) {
			case 'checked':
				if (newer === 'true') this.radio.checked = true;
				else this.radio.checked = false;
				break;
			default:
				break;
		}
	}
	connectedCallback() {
		if (this.getAttribute('default-checked') === 'true') {
			this.setAttribute('checked', 'true');
		}
	}
}

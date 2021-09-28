import type { CpRadioObservedAttributes } from './data';
import type Ripple from '../ripple/ripple';

import { formatStyle } from 'packages/utils/style';

import '../ripple';

export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 radio 元素 */
	radio: HTMLInputElement;
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-radio-input-wrap > input': {
			margin: '0',
			width: '100%',
			height: '100%',
		},
		'.cp-radio-input-wrap:hover': {
			backgroundColor: '#e0e0e0',
		},
		'.cp-radio-input-wrap': {
			display: 'inline-flex',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
			width: '1.2em',
			height: '1.2em',
			padding: '0.6em',
			borderRadius: '50%',
			verticalAlign: 'middle',
			overflow: 'hidden',
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
		},
	};

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet];

		const label = document.createElement('label');
		const inputWrap = document.createElement('span');
		const radio = document.createElement('input');
		const text = document.createElement('slot');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;

		this.radio = radio;
		radio.type = 'radio';
		radio.id = 'radio';
		label.setAttribute('for', 'radio');

		radio.addEventListener('change', () => {
			this.setAttribute('checked', radio.checked ? 'true' : 'false');
		});

		label.classList.add('cp-radio-label');
		inputWrap.classList.add('cp-radio-input-wrap');

		inputWrap.addEventListener('click', () => {
			const { stable } = ripple.spread({
				top: inputWrap.clientHeight / 2,
				left: inputWrap.clientWidth / 2,
			});
			stable();
		});

		ripple.appendChild(radio);
		inputWrap.append(ripple);
		label.append(text);
		shadowRoot.append(inputWrap, label);
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

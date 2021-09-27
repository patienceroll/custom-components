import type { CpRadioObservedAttributes } from './data';
import type Ripple from '../ripple/ripple';

import { formatStyle } from 'packages/utils/style';

import '../ripple';

export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 radio 元素 */
	radio: HTMLInputElement;
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.text-slot': {
			display: 'inline-block',
			lineHeight: '1.2em',
			verticalAlign: 'middle',
		},
		'.cp-radio-radio-wrapper > input': {
			margin: '0',
			width: '0.6em',
			height: '0.6em',
			left: '0.6em',
			top: '0.6em',
			position: 'absolute',
		},
		'.cp-radio-radio-wrapper:hover': {
			backgroundColor: '#e0e0e0',
		},
		'.cp-radio-radio-wrapper': {
			display: 'inline-block',
			position: 'relative',
			width: '1.2em',
			height: '1.2em',
			padding: '0.6em',
			borderRadius: '50%',
			verticalAlign: 'middle',
			overflow: 'hidden',
		},
		'.cp-radio': {
			display: 'inline-block',
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
		const radioWrapper = document.createElement('span');
		const radio = document.createElement('input');
		const text = document.createElement('slot');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;

		this.radio = radio;
		radio.type = 'radio';

		radio.addEventListener('change', () => {
			this.setAttribute('checked', radio.checked ? 'true' : 'false');
		});

		label.classList.add('cp-radio');
		radioWrapper.classList.add('cp-radio-radio-wrapper');
		text.classList.add('text-slot');

		radioWrapper.addEventListener('click', (event) => {
			event.preventDefault();
			ripple
				.start({
					top: radioWrapper.clientHeight / 2,
					left: radioWrapper.clientWidth / 2,
				})
				.then(({ stop }) => stop());
		});

		radioWrapper.append(ripple, radio);
		label.append(radioWrapper, text);
		shadowRoot.append(label);
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

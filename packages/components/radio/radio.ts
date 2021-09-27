import type { CpRadioObservedAttributes } from './data';

import { formatStyle } from 'packages/utils/style';

export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 radio 元素 */
	radio: HTMLInputElement;
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		':host': {},
	};

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet];

		const radio = document.createElement('input');
		const label = document.createElement('label');
		const labelText = document.createElement('slot');

		this.radio = radio;
		radio.type = 'radio';

		radio.addEventListener('change', () => {
			this.setAttribute('checked', radio.checked ? 'true' : 'false');
		});

		label.append(radio, labelText);
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

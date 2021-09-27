import type { CpRadioObservedAttributes } from './data';

import { formatStyle } from 'packages/utils/style';

export default class CpRadio extends HTMLElement implements CustomElement {
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		':host': {},
	};
	/** 组件实例 radio 元素 */
	radioElement: HTMLInputElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet];

		const radio = document.createElement('input');
		const label = document.createElement('label');
		const labelText = document.createElement('slot');
		this.radioElement = radio;
		radio.type = 'radio';

		radio.addEventListener('click', () => {
			this.checked = !this.checked;
		});
		
		label.append(radio, labelText);
		shadowRoot.append(label);
	}

	get checked() {
		return this.getAttribute('checked') === 'true';
	}

	set checked(checked) {
		this.setAttribute('checked', checked ? 'true' : 'false');
		this.radioElement.checked = checked;
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
				if (newer === 'true') this.checked = true;
				else this.checked = false;
				break;
			default:
				break;
		}
	}
}

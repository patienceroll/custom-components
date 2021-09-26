import { formatStyle } from 'packages/utils/style';

export default class CpRadio extends HTMLElement implements CustomElement {
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
		radio.type = 'radio';
		const label = document.createElement('label');
		const labelText = document.createElement('slot');

		label.append(radio, labelText);
		shadowRoot.append(label);
	}
}

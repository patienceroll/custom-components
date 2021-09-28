import type Ripple from '../ripple/ripple';

import CpButtonBase from './button-base';


import { formatStyle } from '../../utils/style';

import '../ripple';

export default class CpIconButton extends CpButtonBase {
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-icon-button': {
			padding: '8px',
			borderRadius: '50%',
			position: 'relative',
			outline: '0',
			border: 'none',
			userSelect: 'none',
			cursor: 'pointer',
		},
	};
	constructor() {
		super();

		const { shadowRoot } = this as AttachedShadowRoot<CpButtonBase>;

		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, this.#styleSheet];

		const button = shadowRoot.firstElementChild as HTMLButtonElement;
		const IconSlot = document.createElement('slot');

		button.classList.add('cp-icon-button');
		button.append(IconSlot);
	}
}

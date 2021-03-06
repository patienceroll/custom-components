import CpButtonBase from './button-base';

import { createHtmlElement, style } from '../../utils';

import '../ripple';

@style({
	'.cp-icon-button': {
		padding: '8px',
		borderRadius: '50%',
		position: 'relative',
		outline: '0',
		border: 'none',
		userSelect: 'none',
		cursor: 'pointer',
	},
})
export default class CpIconButton extends CpButtonBase {
	static style: CSSStyleObject;
	constructor() {
		super();

		const { shadowRoot } = this as AttachedShadowRoot<CpButtonBase>;

		shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, CpIconButton.styleSheet];

		const button = shadowRoot.firstElementChild as HTMLButtonElement;
		const IconSlot = createHtmlElement('slot');

		button.classList.add('cp-icon-button');
		button.append(IconSlot);
	}
}

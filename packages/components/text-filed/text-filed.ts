import { style } from '../../utils/decorators';

@style({
	'.cp-text-filed-input': {
		verticalAlign: 'top',
		padding: '1.03125em 0.875em',
		border: 'none',
		outline: 'none',
	},
	'.cp-text-field-label': {
		position: 'absolute',
	},
	'.cp-text-field-wrapper': {
		position: 'relative',
	},
	':host': {
		display: 'inline-block',
		fontSize: '16px',
	},
})
export default class CpInput extends HTMLElement implements CustomElement {
	public input: HTMLInputElement;
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shaowRoot = this.attachShadow({ mode: 'open' });
		shaowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		const wrapper = document.createElement('div');
		const label = document.createElement('label');
		this.input = document.createElement('input');

		wrapper.classList.add('cp-text-field-wrapper');
		label.classList.add('cp-text-field-label');
		this.input.classList.add('cp-text-filed-input');

		wrapper.append(label, this.input);
		shaowRoot.appendChild(wrapper);
	}
}

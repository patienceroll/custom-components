import { style } from '../../utils/index';

@style({
	'.cp-text-filed-input': {
		verticalAlign: 'top',
		padding: '1.03125em 0.875em',
		border: 'none',
		outline: 'none',
		fontSize: '16px',
	},
	'.cp-text-field-label': {
		position: 'absolute',
	},
	'.cp-text-field-fieldset': {
		position: 'relative',
		padding: '0',
		margin: '0',
		verticalAlign: 'top',
		border: 'none',
		borderRadius: '0.25em',
		overflow: 'hidden',
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

		const fieldset = document.createElement('fieldset');
		const legend = document.createElement('legend');
		legend.innerHTML = '23';
		const label = document.createElement('label');
		this.input = document.createElement('input');

		fieldset.classList.add('cp-text-field-fieldset');
		label.classList.add('cp-text-field-label');
		this.input.classList.add('cp-text-filed-input');

		fieldset.append(legend, label, this.input);
		shaowRoot.appendChild(fieldset);
	}
}

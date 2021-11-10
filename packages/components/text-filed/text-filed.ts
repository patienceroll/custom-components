import { style } from '../../utils/decorators';

@style({
	'.cp-text-filed-label': {
		position: 'absolute',
	},
	'.cp-text-filed-wrapper': {
		position: 'relative',
	},
	':host': {
		display: 'inline-block',
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

		wrapper.classList.add('cp-text-filed-wrapper');
		label.classList.add('cp-text-filed-label');

		wrapper.append(label, this.input);
		shaowRoot.appendChild(wrapper);
	}
}

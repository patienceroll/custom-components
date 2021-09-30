import type CpRadio from './radio';

export default class CpRadioGroup extends HTMLElement implements CustomElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		const slot = document.createElement('slot');

		shadowRoot.appendChild(slot);

		this.addEventListener('check', (event) => {
			const currentRadio = event.target as CpRadio;
			const radios = this.querySelectorAll(`cp-radio[name="${currentRadio.getAttribute('name')}"]`);
			radios.forEach((radio) => {
				if (event.target !== radio) radio.setAttribute('checked', 'false');
			});
			this.dispatchEvent(new CustomEvent('change', { detail: { value: currentRadio.getAttribute('value') } }));
		});
	}
}

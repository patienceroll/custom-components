import CpInput from './text-filed';

if (!customElements.get('cp-text-field')) {
	customElements.define('cp-text-field', CpInput);
}

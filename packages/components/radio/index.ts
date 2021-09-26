import CpRadio from './radio';

if (customElements.get('cp-radio') === undefined) {
	customElements.define('cp-radio', CpRadio);
}

import CpPaper from './paper.js';

if (typeof customElements.get('cp-paper') === "undefined") {
    customElements.define('cp-paper', CpPaper);
}

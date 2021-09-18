import CpPaper from './paper'



if (typeof customElements.get('cp-paper') === "undefined") {
  customElements.define('cp-paper', CpPaper);
}
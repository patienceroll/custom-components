import Button from './button'

if (!customElements.get("cp-button"))
  customElements.define("cp-button", Button);

import "./index.css";

class Ripple extends HTMLElement {
  constructor() {
    super();
  }
}

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", Ripple);

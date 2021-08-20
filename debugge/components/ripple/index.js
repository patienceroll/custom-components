import Ripple from './ripple.js';

if (!customElements.get("cp-ripple"))
    customElements.define("cp-ripple", Ripple);

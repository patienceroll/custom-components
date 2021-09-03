import CpRipple from './ripple.rewrite.js';

if (!customElements.get("cp-ripple"))
    customElements.define("cp-ripple", CpRipple);

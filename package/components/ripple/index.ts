import CpRipple from "./ripple.rewrite";

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", CpRipple);

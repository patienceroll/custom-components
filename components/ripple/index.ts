import Ripple from "./ripple";

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", Ripple);

import "./index.css";

/** 涟漪效果组件 */
class Ripple extends HTMLElement {
  constructor() {
    super();
  }

  /** 开始涟漪动画 */
  startPiple() {
    const rippleItem = document.createElement("span");
  }
}

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", Ripple);

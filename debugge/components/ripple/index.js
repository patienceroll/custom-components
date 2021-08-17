/** 涟漪效果组件 */
class Ripple extends HTMLElement {
    constructor() {
        super();
    }
}
if (!customElements.get("cp-ripple"))
    customElements.define("cp-ripple", Ripple);

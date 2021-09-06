export default class CpRipple extends HTMLElement {
  static CpRippleStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(
      ":host{width:inherit;height:inherit;display:inline-block;position:absolute;top:0;left:0'z-index:0}"
    );
    sheet.insertRule(".ripple-item{position:absolute;border-radius:50%;}");
    return sheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [CpRipple.CpRippleStyleSheet];
  }

  connectedCallback(this: CpRipple) {}
}

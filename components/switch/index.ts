class Switch extends HTMLElement {
  constructor() {
    super();
  }
}

if (!customElements.get("cp-switch"))
  customElements.define("cp-switch", Switch);

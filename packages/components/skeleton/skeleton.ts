export default class CpSkeleton extends HTMLElement implements CustomElement {
  static style: CSSStyleObject = {};
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const li = document.createElement("li");
  }
}

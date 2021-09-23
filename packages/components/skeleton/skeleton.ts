export default class CpSkeleton extends HTMLElement {
  static style: CSSStyleObject = {};
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const li = document.createElement("li");
  }
}

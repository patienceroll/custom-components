export default class CpCircularProgress extends HTMLElement {
  static CpCircularProgressStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(
      `:host {
      display: block;
    }`,
      0
    );
    styleSheet.insertRule(
      `.cp-circular-progress {
      width: 100%;
      height: 100%;
    }`,
      0
    );
    return styleSheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [
      CpCircularProgress.CpCircularProgressStyleSheet,
    ];

    const circle = `<circle cx="22" cy="22" r="17.2" stroke-width="3.6"></circle>`;
    const svg = `<svg class="cp-circular-progress"  viewBox="0 0 44 44">${circle}</svg>`;

    shadowRoot.innerHTML = svg;
  }
}

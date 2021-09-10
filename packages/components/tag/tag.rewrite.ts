export default class CpTag extends HTMLElement {
  static CpTagStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`:host {
      display: inline-block;
    }`);
    return sheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [CpTag.CpTagStyleSheet];

    const iconSlot = document.createElement("slot");
    const textSlot = document.createElement("slot");
    const close = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    iconSlot.name = "icon";
    iconSlot.setAttribute("part", "icon");
    textSlot.setAttribute("part", "text");
    close.setAttribute("part", "close");
    close.setAttribute("width", "1em");
    close.setAttribute("height", "1em");
    close.setAttribute("viewBox", "0 0 1024 1024");
    path.setAttribute(
      "d",
      "M270.634667 270.634667a21.333333 21.333333 0 0 1 30.165333 0l211.2 211.2 211.2-211.2a21.333333 21.333333 0 1 1 30.165333 30.165333L542.165333 512l211.2 211.2a21.333333 21.333333 0 0 1 2.474667 27.221333l-2.474667 2.944a21.333333 21.333333 0 0 1-30.165333 0L512 542.165333l-211.2 211.2a21.333333 21.333333 0 1 1-30.165333-30.165333l211.2-211.2-211.2-211.2a21.333333 21.333333 0 0 1-2.474667-27.221333z"
    );

    close.appendChild(path);
    shadowRoot.append(iconSlot, textSlot, close);
  }
}

import "../ripple/index";

export default class CpButton extends HTMLElement {
  static cpButtonStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule("button{display:inline-block}");
    return styleSheet;
  })();

  connectedCallback(this: CpButton) {
    if (this.shadowRoot)
      this.shadowRoot.adoptedStyleSheets = [CpButton.cpButtonStyleSheet];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.setAttribute("part", "button");

    // 左侧 icon 容器和插槽
    const startIconWrapper = document.createElement("span");
    const startIconSlot = document.createElement("slot");
    startIconWrapper.setAttribute("part", "start-icon");
    startIconSlot.name = "start-icon";
    startIconWrapper.appendChild(startIconSlot);

    // 文字部分
    const textWrapper = document.createElement("span");
    const textSlot = document.createElement("slot");
    textWrapper.setAttribute("part", "text");
    textWrapper.appendChild(textSlot);

    // 右侧 icon 容器和插槽
    const endIconWrapper = document.createElement("span");
    const endIconSlot = document.createElement("slot");
    endIconWrapper.setAttribute("part", "end-icon");
    endIconSlot.name = "end-icon";
    endIconWrapper.appendChild(endIconSlot);

    const ripple = document.createElement("cp-ripple");

    button.append(startIconWrapper, textWrapper, endIconWrapper, ripple);
    shadowRoot.appendChild(button);
  }
}

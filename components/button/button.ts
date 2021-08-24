import CpRipple from "../ripple/ripple";
import "../ripple/index";

import "./index.css";

export default class CpButton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    // 左侧 icon 容器和插槽
    const startIconWrapper = document.createElement("span");
    const startIconSlot = document.createElement("slot");

    const textWrapper = document.createElement("span");
    const textSlot = document.createElement("slot");

    // 右侧 icon 容器和插槽
    const endIconWrapper = document.createElement("span");
    const endIconSlot = document.createElement("slot");

    const ripple = document.createElement("cp-ripple");
    const button = document.createElement("button");

    startIconWrapper.setAttribute("part", "start-icon");
    startIconSlot.name = "start-icon";
    startIconWrapper.appendChild(startIconSlot);
    textWrapper.setAttribute("part", "text");
    textWrapper.appendChild(textSlot);
    endIconWrapper.setAttribute("part", "end-icon");
    endIconSlot.name = "end-icon";
    endIconWrapper.appendChild(endIconSlot);
    button.setAttribute("part", "button");

    button.append(startIconWrapper, textWrapper, endIconWrapper, ripple);
    shadowRoot.appendChild(button);
  }
}

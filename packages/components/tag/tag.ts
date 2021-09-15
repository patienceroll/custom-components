import type { TagObservedAttributes } from "./data";

export default class CpTag extends HTMLElement {
  static CpTagStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(
      `@keyframes hide {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }`, 0);
    sheet.insertRule(
      `@keyframes show {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }`, 0);
    sheet.insertRule(
      `.cp-tag-container {
      display: inline-block;
      font-size: 14px;
    }`, 0);
    sheet.insertRule(
      `.cp-tag-hide {
      animation-name: hide;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
    }`, 0);
    sheet.insertRule(
      `.cp-tag-show {
      animation-name: show;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
    }`, 0);
    return sheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [CpTag.CpTagStyleSheet];

    const container = document.createElement("span");
    const iconSlot = document.createElement("slot");
    const textSlot = document.createElement("slot");
    const close = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    container.setAttribute("class", "cp-tag-container");
    container.setAttribute("part", "container");
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
    container.append(iconSlot, textSlot, close);
    shadowRoot.appendChild(container);
  }

  static observedAttributes: TagObservedAttributes[] = ["show"];
  attributeChangedCallback(
    attr: TagObservedAttributes,
    older: string | null,
    newer: string | null
  ) {
    switch (attr) {
      case "show":
        const { shadowRoot } = this;
        if (shadowRoot) {
          const { firstElementChild } = shadowRoot;
          if (firstElementChild) {
            if (newer === "true") {
              (firstElementChild as HTMLSpanElement).style.removeProperty(
                "display"
              );

              firstElementChild.setAttribute(
                "class",
                "cp-tag-container cp-tag-show"
              );
            }

            if (newer === "false") {
              firstElementChild.setAttribute(
                "class",
                "cp-tag-container cp-tag-hide"
              );
              setTimeout(() => {
                (
                  shadowRoot.firstElementChild as HTMLSpanElement
                ).style.display = "none";
              }, 300);
            }
          }
        }
        break;
      default:
        break;
    }
  }
}

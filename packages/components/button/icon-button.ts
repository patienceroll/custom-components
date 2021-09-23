import type Ripple from "../ripple/ripple";
import { formatStyle } from "../../utils/style";

import theme from "../../theme/index";

import "../ripple";

export default class CpIconButton extends HTMLElement {
  private rippleItem: ReturnType<Ripple["start"]> | undefined;
  static styleSheet: CSSStyleSheet | undefined;
  static style: CssStyleSheetObject = {
    ".cp-icon-button:hover": {
      backgroundColor: theme.color.background,
    },
    ".cp-icon-button": {
      padding: "8px",
      borderRadius: "50%",
      position: "relative",
      outline: "0",
      border: "none",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
      transition: `background-color ${theme.transition.delay.base} ease `,
    },
    ":host": {
      display: "inline-block",
    },
  };
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    if (typeof CpIconButton.styleSheet === "undefined")
      CpIconButton.styleSheet = formatStyle(CpIconButton.style);

    shadowRoot.adoptedStyleSheets = [CpIconButton.styleSheet];
    const button = document.createElement("button");
    const IconSlot = document.createElement("slot");
    const ripple = document.createElement(
      "cp-ripple"
    ) as AttachedShadowRoot<Ripple>;

    button.classList.add("cp-icon-button");

    this.addEventListener("mousedown", () => {
      const { clientWidth, clientHeight } = this;
      const rippleColor = this.getAttribute("ripple-color");
      this.rippleItem = ripple.start({
        top: clientWidth / 2,
        left: clientHeight / 2,
        backgroundColor: rippleColor,
      });
    });
    this.addEventListener("mouseup", () => {
      if (this.rippleItem) {
        this.rippleItem.then(({ stop }) => stop());
        this.rippleItem = undefined;
      }
    });
    this.addEventListener(
      "touchstart",
      (e) => {
        if (e.targetTouches.length !== 1) return;
        if (e.cancelable) {
          const { clientWidth, clientHeight } = this;
          if (this.rippleItem) this.rippleItem.then(({ stop }) => stop());
          const rippleColor = this.getAttribute("ripple-color");
          this.rippleItem = ripple.start({
            top: clientWidth / 2,
            left: clientHeight / 2,
            backgroundColor: rippleColor,
          });
        }
      },
      { passive: true }
    );
    this.addEventListener("touchend", () => {
      if (this.rippleItem) {
        this.rippleItem.then(({ stop }) => stop());
        this.rippleItem = undefined;
      }
    });

    button.append(IconSlot, ripple);
    shadowRoot.appendChild(button);
  }
}

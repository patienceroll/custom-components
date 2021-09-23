import type Ripple from "../ripple/ripple";
import type { ButtonObservedAttributes } from "./data";

import theme from "../../theme/index";
import { formatStyle, formatKeyframes } from "../../utils/style";

import "../ripple";
import "../circular-progress";

export default class CpButton extends HTMLElement {
  static styleSheet: CSSStyleSheet | undefined;
  static style: CssStyleSheetObject = {
    ".cp-button-loading > rect": {
      animation: "loading 2s linear infinite",
    },
    ".cp-button-loading": {
      display: "none",
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
    },
    ".cp-button-disabled": {
      boxShadow: "none",
    },
    ".cp-button:hover": {
      backgroundColor: theme.color.backgroundHover,
      boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%)",
    },
    ".cp-button": {
      display: "flex",
      alignItems: "center",
      padding: "6px 12px",
      border: "none",
      position: "relative",
      outline: "0",
      userSelect: "none",
      cursor: "pointer",
      width: "100%",
      height: "100%",
      backgroundColor: theme.color.background,
      borderRadius: theme.border.radius,
      boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%)",
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    ':host([disable="true"])': {
      pointerEvents: "none",
    },
    ":host": {
      display: "inline-block",
    },
  };

  static keyframes: KeyframeObject = {
    loading: {
      "0%": {
        strokeDasharray: "0% 400%",
        strokeDashoffset: "0",
      },
      "100%": {
        strokeDasharray: "400% 400%",
        strokeDashoffset: "-400%",
      },
    },
  };
  static keyframesSheet: CSSStyleSheet | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    if (typeof CpButton.styleSheet === "undefined")
      CpButton.styleSheet = formatStyle(CpButton.style);
    if (typeof CpButton.keyframesSheet === "undefined")
      CpButton.keyframesSheet = formatKeyframes(CpButton.keyframes);

    shadowRoot.adoptedStyleSheets = [
      CpButton.keyframesSheet,
      CpButton.styleSheet,
    ];

    const button = document.createElement("button");
    const textWrapper = document.createElement("span");
    const text = document.createElement("slot");
    const leftIcon = document.createElement("slot");
    const rightIcon = document.createElement("slot");
    const ripple = document.createElement(
      "cp-ripple"
    ) as AttachedShadowRoot<Ripple>;
    const loading = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    loading.innerHTML = `<rect x="1"  y="1" rx="4" ry="4"  width="calc(100% - 2px)" height="calc(100% - 2px)" stroke-width="2" stroke="${theme.color.primary}" fill="none" />`;

    button.classList.add("cp-button");
    textWrapper.classList.add("cp-button-text");
    loading.classList.add("cp-button-loading");
    button.setAttribute("part", "button");
    leftIcon.setAttribute("part", "left-icon");
    rightIcon.setAttribute("part", "right-icon");
    loading.setAttribute("part", "loading");
    leftIcon.name = "left-icon";
    rightIcon.name = "right-icon";

    let rippleItem: ReturnType<Ripple["start"]> | undefined;
    this.addEventListener("mousedown", (e) => {
      if (rippleItem) rippleItem.then(({ stop }) => stop());
      rippleItem = ripple.start({ top: e.offsetY, left: e.offsetX });
    });
    this.addEventListener("mouseup", () => {
      if (rippleItem) {
        rippleItem.then(({ stop }) => stop());
        rippleItem = undefined;
      }
    });
    this.addEventListener(
      "touchstart",
      (e) => {
        if (e.targetTouches.length !== 1) return;
        if (e.cancelable) {
          const { targetTouches, target } = e;
          if (target) {
            const [touch] = targetTouches;
            const { pageX, pageY } = touch;
            const { left, top } = (target as this).getBoundingClientRect();
            if (rippleItem) rippleItem.then(({ stop }) => stop());
            rippleItem = ripple.start({ top: pageY - top, left: pageX - left });
          }
        }
      },
      { passive: true }
    );
    this.addEventListener("touchend", () => {
      if (rippleItem) {
        rippleItem.then(({ stop }) => stop());
        rippleItem = undefined;
      }
    });

    textWrapper.append(leftIcon, text, rightIcon);
    button.append(textWrapper, ripple, loading);
    shadowRoot.appendChild(button);
  }

  static observedAttributes: ButtonObservedAttributes[] = [
    "disable",
    "loading",
    "loading-color",
  ];
  attributeChangedCallback(
    this: AttachedShadowRoot<CpButton>,
    attr: ButtonObservedAttributes,
    older: string | null,
    newer: string | null
  ) {
    switch (attr) {
      case "disable":
        const button = this.shadowRoot.firstElementChild as HTMLButtonElement;
        if (newer === "true") button.classList.add("cp-button-disabled");
        else button.classList.remove("cp-button-disabled");
        break;
      case "loading":
        const loading = this.shadowRoot.querySelector(
          'svg[part="loading"]'
        ) as SVGAElement;
        if (newer === "true") {
          this.style.setProperty("pointer-events", "none");
          loading.style.display = "block";
        } else {
          this.style.removeProperty("pointer-events");
          loading.style.display = "none";
        }
        break;
      case "loading-color":
        const loadingRect = (
          this.shadowRoot.querySelector('svg[part="loading"]') as SVGAElement
        ).firstElementChild as SVGRectElement;
        loadingRect.setAttribute("stroke", newer || theme.color.primary);
        break;
      default:
        break;
    }
  }
  connectedCallback() {}
}

import type Ripple from "../ripple/ripple";
import type { ButtonObservedAttributes } from "./data";

import theme from '../../theme/index'

import "../ripple";
import "../circular-progress"

export default class CpButton extends HTMLElement {
  static cpButtonStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();

    styleSheet.insertRule(`.cp-button-loading-rect {
      animation: loading 2s linear infinite;
    }`)
    styleSheet.insertRule(`.cp-button-loading {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }`)
    styleSheet.insertRule(`.cp-button-disabled {
      box-shadow: none;
    }`);
    styleSheet.insertRule(`.cp-button:hover{
      background-color: #c0c0c0;
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%);
    }`);
    styleSheet.insertRule(`.cp-button {
      display: flex;
      align-items: center;
      padding: 6px 16px;
      border: none;
      position: relative;
      outline: 0;
      user-select: none;
      cursor: pointer;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      border-radius: 4px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%);
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1); 
    }`);
    styleSheet.insertRule(`:host([disable="true"]) {
      pointer-events: none;
    `);
    styleSheet.insertRule(`:host {
      display: inline-block;
    }`);
    styleSheet.insertRule(`@keyframes loading {
      0% {
        stroke-dasharray: 0% 400%;
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dasharray: 400% 400%;
        stroke-dashoffset: -400%;
      }
    }`)
    return styleSheet;
  })();

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [CpButton.cpButtonStyleSheet];

    const button = document.createElement("button");
    const textWrapper = document.createElement("span");
    const text = document.createElement("slot");
    const leftIcon = document.createElement("slot");
    const rightIcon = document.createElement("slot");
    const ripple = document.createElement("cp-ripple") as AttachedShadowRoot<Ripple>;
    const loadingSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    loadingSvg.innerHTML = `<rect 
        class="cp-button-loading-rect"
        x="1" 
        y="1" 
        rx="4" 
        ry="4" 
        width="calc(100% - 2px)" 
        height="calc(100% - 2px)"  
        stroke-width="2"
        stroke="${theme.color.primary}" 
        fill="none"  
        />`

    button.setAttribute("class", "cp-button");
    textWrapper.setAttribute("class", "cp-button-text");
    loadingSvg.setAttribute('class', 'cp-button-loading')
    button.setAttribute("part", "button");
    leftIcon.setAttribute("part", "left-icon");
    rightIcon.setAttribute("part", "right-icon");
    loadingSvg.setAttribute('part', "loading")
    leftIcon.name = "left-icon";
    rightIcon.name = "right-icon";

    let rippleItem: ReturnType<Ripple["start"]> | undefined;
    this.addEventListener("mousedown", (e) => {
      e.preventDefault();
      rippleItem = ripple.start({ top: e.offsetY, left: e.offsetX });
    });
    this.addEventListener("mouseup", () => {
      if (rippleItem) {
        rippleItem.then(({ stop }) => stop());
        rippleItem = undefined;
      }
    });
    this.addEventListener("touchstart", (e) => {
      if (e.targetTouches.length !== 1) return;
      if (e.cancelable) {
        e.preventDefault();
        const { targetTouches, target } = e;
        if (target) {
          const [touch] = targetTouches;
          const { pageX, pageY } = touch;
          const { left, top } = (target as this).getBoundingClientRect();
          if (rippleItem) rippleItem.then(({ stop }) => stop());
          rippleItem = ripple.start({ top: pageY - top, left: pageX - left });
        }
      }
    });
    this.addEventListener("touchend", () => {
      if (rippleItem) {
        rippleItem.then(({ stop }) => stop());
        rippleItem = undefined;
      }
    });

    textWrapper.append(leftIcon, text, rightIcon);
    button.append(textWrapper, ripple, loadingSvg);
    shadowRoot.appendChild(button);
  }

  static observedAttributes: ButtonObservedAttributes[] = ["disable", 'loading', 'loading-color'];
  attributeChangedCallback(
    this: AttachedShadowRoot<CpButton>,
    attr: ButtonObservedAttributes,
    older: string | null,
    newer: string | null
  ) {
    switch (attr) {
      case "disable":
        const button = this.shadowRoot.firstElementChild as HTMLButtonElement
        if (newer === "true") {
          button.setAttribute(
            "class",
            "cp-button cp-button-disabled"
          );
        } else {
          button.setAttribute(
            "class",
            "cp-button"
          );
        }
        break;
      case "loading":
        const loadingSvg = this.shadowRoot.querySelector('svg[part="loading"]') as SVGAElement
        if (newer === 'true') {
          this.style.setProperty('pointer-events', 'none');
          loadingSvg.style.display = 'block'
        } else {
          this.style.removeProperty('pointer-events');
          loadingSvg.style.display = 'none'
        }
        break;
      case 'loading-color':
        const loadingRect = (this.shadowRoot.querySelector('svg[part="loading"]') as SVGAElement).firstElementChild as SVGRectElement
        loadingRect.setAttribute('stroke', newer || theme.color.primary)
        break;
      default:
        break;
    }
  }
  connectedCallback() { }
}

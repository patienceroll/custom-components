import type { CircularProgressObservedAttributes } from './data'

import theme from '../../theme/index'
export default class CpCircularProgress extends HTMLElement {
  static CpCircularProgressStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`.cp-circular-svg > circle {
      animation: circle-dash 1.4s ease-in-out infinite;
      stroke-dasharray: 0px 108px;
      stroke-dashoffset: 0;
      transition: stroke-dasharray ease 300ms;
    }`)
    styleSheet.insertRule(`.cp-circular-svg {
      width: 100%;
      height: 100%;
      animation: svg-rotate 1.4s ease-in-out infinite;
      transform: rotate(-90deg);
    }`);
    styleSheet.insertRule(`:host {
      display: block;
    }`);
    styleSheet.insertRule(`@keyframes circle-dash {
      0% {
        stroke-dasharray: 1px 108px;
        stroke-dashoffset: 0
      }
      50% {
        stroke-dasharray: 70px 108px;
        stroke-dashoffset: -15px
      }
      100% {
        stroke-dasharray: 108px 108px;
        stroke-dashoffset: -108px
      }
    }`)
    styleSheet.insertRule(`@keyframes svg-rotate {
      0% {
        transform-origin: center center
        transform: rotate(-90deg);
      }
      100% {
        transform: rotate(270deg)
      }
    }`)
    return styleSheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [
      CpCircularProgress.CpCircularProgressStyleSheet,
    ];

    const circle = `<circle  cx="22" cy="22" r="17.2" stroke=${theme.color.primary}  stroke-width="3.6" fill="none"></circle>`
    const svg = `<svg class="cp-circular-svg"  viewBox="0 0 44 44">${circle}</svg>`

    shadowRoot.innerHTML = svg;
  }

  static observedAttributes: CircularProgressObservedAttributes[] = ['color', 'value']
  attributeChangedCallback(this: AttachedShadowRoot<CpCircularProgress>, attr: CircularProgressObservedAttributes, older: string | null, newer: string | null) {
    const svg = this.shadowRoot.firstElementChild as SVGAElement;
    const circle = svg.firstElementChild as SVGCircleElement;
    switch (attr) {
      case 'color':
        if (newer) {
          circle.setAttribute('stroke', newer)
        } else {
          circle.setAttribute('stroke', theme.color.primary)
        }
        break;
      case 'value':
        if (newer) {
          svg.style.setProperty('animation', 'none');
          circle.style.setProperty('animation', 'none')
          let value = Number(newer);
          if (Number.isNaN(value)) value = 0;
          else if (value < 0) value = 0;
          else if (value > 100) value = 100
          circle.style.setProperty("stroke-dasharray", `${value / 100 * 108}px 108px`)
        } else {
          svg.style.removeProperty('animation')
          circle.style.removeProperty('animation')
        }
        break;
      default:
        break;
    }
  }



}

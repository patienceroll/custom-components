import Theme from '../../theme/index.js';

class CpCircularProgress extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [
            CpCircularProgress.CpCircularProgressStyleSheet,
        ];
        const circle = `<circle  cx="22" cy="22" r="17.2" stroke=${Theme.color.primary}  stroke-width="3.6" fill="none"></circle>`;
        const svg = `<svg class="cp-circular-svg"  viewBox="0 0 44 44">${circle}</svg>`;
        shadowRoot.innerHTML = svg;
    }
    attributeChangedCallback(attr, older, newer) {
        const svg = this.shadowRoot.firstElementChild;
        const circle = svg.firstElementChild;
        switch (attr) {
            case 'color':
                if (newer) {
                    circle.setAttribute('stroke', newer);
                }
                else {
                    circle.setAttribute('stroke', Theme.color.primary);
                }
                break;
            case 'value':
                if (newer) {
                    svg.style.setProperty('animation', 'none');
                    circle.style.setProperty('animation', 'none');
                    let value = Number(newer);
                    if (Number.isNaN(value))
                        value = 0;
                    else if (value < 0)
                        value = 0;
                    else if (value > 100)
                        value = 100;
                    circle.style.setProperty("stroke-dasharray", `${value / 100 * 108}px 108px`);
                }
                else {
                    svg.style.removeProperty('animation');
                    circle.style.removeProperty('animation');
                }
                break;
        }
    }
}
CpCircularProgress.CpCircularProgressStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`.cp-circular-svg > circle {
      animation: circle-dash 1.4s ease-in-out infinite;
      stroke-dasharray: 0px 108px;
      stroke-dashoffset: 0;
      transition: stroke-dasharray ease 300ms;
    }`);
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
    }`);
    styleSheet.insertRule(`@keyframes svg-rotate {
      0% {
        transform-origin: center center
        transform: rotate(-90deg);
      }
      100% {
        transform: rotate(270deg)
      }
    }`);
    return styleSheet;
})();
CpCircularProgress.observedAttributes = ['color', 'value'];

export { CpCircularProgress as default };

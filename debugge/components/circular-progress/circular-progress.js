import Theme from '../../theme/index.js';

class CpCircularProgress extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [
            CpCircularProgress.CpCircularProgressStyleSheet,
        ];
        const circle = `<circle class="cp-circular-progress-circle cp-circular-progress-circle-unstable" cx="22" cy="22" r="17.2" stroke=${Theme.color.primary}  stroke-width="3.6" fill="none"></circle>`;
        const svg = `<svg class="cp-circular-progress cp-circular-progress-svg-rotate"  viewBox="0 0 44 44">${circle}</svg>`;
        shadowRoot.innerHTML = svg;
    }
    attributeChangedCallback(attr, older, newer) {
        switch (attr) {
            case 'color':
                const circle = this.shadowRoot.firstElementChild.firstElementChild;
                if (newer) {
                    circle.setAttribute('stroke', newer);
                }
                else {
                    circle.setAttribute('stroke', Theme.color.primary);
                }
                break;
        }
    }
}
CpCircularProgress.CpCircularProgressStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`@keyframes cp-circular-progress-svg-rotate {
      0% {
        transform-origin: 50% 50%
      }
      100% {
        transform: rotate(360deg)
      }
    }`, 0);
    styleSheet.insertRule(`@keyframes cp-circular-progress-circle-dash {
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
    }`, 0);
    styleSheet.insertRule(`:host {
      display: block;
    }`, 0);
    styleSheet.insertRule(`.cp-circular-progress {
      width: 100%;
      height: 100%;
    }`, 0);
    styleSheet.insertRule(`.cp-circular-progress-circle {
      stroke-dasharray: 80px 108px;
      stroke-dashoffset: 0;
    }`, 0);
    styleSheet.insertRule(`.cp-circular-progress-svg-rotate {
      animation: cp-circular-progress-svg-rotate 1.4s ease-in-out infinite;
    }`, 0);
    styleSheet.insertRule(`.cp-circular-progress-circle-unstable {
      animation: cp-circular-progress-circle-dash 1.4s ease-in-out infinite;
      stroke-dasharray: 1px 108px;
      stroke-dashoffset: 0;
    }`, 0);
    return styleSheet;
})();
CpCircularProgress.observedAttributes = ['color', 'value'];

export { CpCircularProgress as default };

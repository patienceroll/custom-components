export default class CpRipple extends HTMLElement {
  static CpRippleStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`@keyframes start {
        0% {
          transform: scale(0);
          opacity: 0.1;
        }
        100% {
          transform: scale(1);
          opacity: 0.3;
        }
      }`);
    sheet.insertRule(`@keyframes disappear {
        0% {
          opacity: 0.3;
        }
        100% {
          opacity: 0;
        }
      }`);

    sheet.insertRule(`:host {
        width: inherit;
        height: inherit;
        overflow: hidden;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }`);
    sheet.insertRule(`.ripple-item {
        position:absolute;
        border-radius:50%;
      }`);
    sheet.insertRule(`.ripple-start {
      opacity: 0.3;
      transform: scale(1);
      animation-name: start;
      animation-duration: 600ms;
      animation-fill-mode: forwards;
      }`);
    sheet.insertRule(`.ripple-disappear {
      animation-name: disappear;
      animation-duration: 600ms;
      animation-fill-mode: forwards;
      }`);

    return sheet;
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [CpRipple.CpRippleStyleSheet];
  }

  /** 目前涟漪动画开始和消失动画的时间分别都为 600ms,后续应该会添加自定义配置功能 */
  get start() {
    return function (
      this: CpRipple,
      options: {
        /** 涟漪中心点相对父级顶部距离 */
        top: number;
        /** 涟漪中心点相对父级左侧距离 */
        left: number;
        /** 涟漪颜色,默认 #333 */
        backgroundColor?: CSSStyleDeclaration["backgroundColor"];
      }
    ) {
      if (this.shadowRoot && this.parentElement) {
        const { pow, sqrt, abs } = Math;
        const { top, left } = options;
        const { clientWidth, clientHeight } = this.parentElement;
        const rippleItem = document.createElement("div");
        // 计算涟漪半径,涟漪中心点到父元素四个点之中最远的一个点的距离为半径
        const offsetRight = abs(left - clientWidth);
        const offsetBootom = abs(clientHeight - top);
        const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
        const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
        const radius = sqrt(
          pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2)
        );
        rippleItem.style.top = `${top - radius}px`;
        rippleItem.style.left = `${left - radius}px`;
        rippleItem.style.width = `${2 * radius}px`;
        rippleItem.style.height = `${2 * radius}px`;
        rippleItem.style.background = "#333";
        rippleItem.setAttribute("class", "ripple-item ripple-start");
        this.shadowRoot.appendChild(rippleItem);
        return {
          dom: rippleItem,
          finish() {
            rippleItem.setAttribute("class", "ripple-item ripple-disappear");
            setTimeout(() => {
              rippleItem.remove();
            }, 600);
          },
        };
      }
      return null;
    };
  }

  connectedCallback(this: CpRipple) {}
}
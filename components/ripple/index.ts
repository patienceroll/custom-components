import "./index.css";

/** 涟漪效果组件 */
class Ripple extends HTMLElement {
  constructor() {
    super();
  }

  /** 开始涟漪动画 */
  get startPiple() {
    return function (
      this: Ripple,
      options: {
        /** 涟漪相对父级起始点 top */
        top: number;
        /** 涟漪相对父级起始点 left */
        left: number;
        /** 父级宽度 */
        parentWidth: number;
        /** 父级高度 */
        parentHeight: number;
      }
    ) {
      const { pow, sqrt } = Math;
      const { top, left, parentWidth, parentHeight } = options;
      const radius = sqrt(pow(parentWidth, 2) + pow(parentHeight, 2));
      const rippleItem = document.createElement("div");
      rippleItem.setAttribute("class", "cp-ripple-item");
      rippleItem.style.top = `${top - radius}px`;
      rippleItem.style.left = `${left - radius}px`;
      rippleItem.style.width = `${2 * radius}px`;
      rippleItem.style.height = `${2 * radius}px`;
      this.appendChild(rippleItem);
      requestAnimationFrame(() => {
        rippleItem.style.transform = "scale(1)";
        rippleItem.style.opacity = "0.3";
      });
  
      return {
        remove() {
          requestAnimationFrame(() => {
            rippleItem.style.opacity = "0";
          });
          setTimeout(() => {
            rippleItem.remove();
          }, 450);
        },
      };
    };
  }
}

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", Ripple);

import { secondsToNumber } from "utils/time";
import type { PiplePoint } from "./data";

import "./index.css";

/**
 * 涟漪效果组件
 * 此组件只暴露了一个开始涟漪的方法出来
 * 此方法返回一个 remove 函数和当前执行动画的元素
 */
class Ripple extends HTMLElement {
  constructor() {
    super();
  }

  /** 开始涟漪动画 */
  get startPiple() {
    /** 计算 top 和 left 离方形四个点最远的距离,即为涟漪半径 */
    const calculateRadius = (params: PiplePoint) => {
      const { pow, sqrt, abs } = Math;
      const { top, left, parentWidth, parentHeight } = params;
      const offsetRight = abs(left - parentWidth);
      const offsetBootom = abs(parentHeight - top);
      const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
      const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
      return sqrt(pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2));
    };

    return function (this: Ripple, options: PiplePoint) {
      const { top, left } = options;
      const radius = calculateRadius(options);
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
          const delay =
            secondsToNumber(getComputedStyle(rippleItem).transitionDuration, {
              transType: "ms",
            }) || 300;
          setTimeout(() => {
            rippleItem.remove();
          }, Number(delay));
        },
        animateDom: rippleItem,
      };
    };
  }
}

if (!customElements.get("cp-ripple"))
  customElements.define("cp-ripple", Ripple);

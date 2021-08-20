import type { PiplePoint } from "./data";
import { secondsToNumber } from "utils/time";
import { elementAddStyles } from "utils/style";

/**
 * 涟漪效果组件
 * 此组件只暴露了一个开始涟漪的方法出来
 * 此方法返回一个 remove 函数和当前执行动画的元素
 */
export default class Ripple extends HTMLElement {
  constructor() {
    super();
    elementAddStyles(this, Ripple.cpRippleStyle);
  }

  /** 组件容器样式 */
  static cpRippleStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    overflow: "hidden",
    "z-index": "0",
    width: "100%",
    height: "100%",
    "pointer-events": "none",
    "border-radius": "inherit",
  };

  /** 组件动画元素样式 */
  static cpRippleItemStyle = {
    "border-radius": " 50%",
    position: "absolute",
    transform: "scale(0)",
    opacity: "0",
    "transition-property": "transform, opacity",
    "transition-timing-function": "cubic-bezier(0.45, 0.02, 0.39, 0.98),normal",
  };

  /** 开始涟漪动画 */
  get startPiple() {
    /** 计算 top 和 left 离方形四个点最远的距离,即为涟漪半径 */
    const calculateRadius = (
      params: Omit<PiplePoint, "transitionDuration" | "rippleColor">
    ) => {
      const { pow, sqrt, abs } = Math;
      const { top, left, parentWidth, parentHeight } = params;
      const offsetRight = abs(left - parentWidth);
      const offsetBootom = abs(parentHeight - top);
      const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
      const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
      return sqrt(pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2));
    };

    return function (this: Ripple, options: PiplePoint) {
      const { top, left, transitionDuration, rippleColor } = options;
      const radius = calculateRadius(options);
      const rippleItem = document.createElement("div");
      elementAddStyles(rippleItem, Ripple.cpRippleItemStyle);
      rippleItem.style.top = `${top - radius}px`;
      rippleItem.style.left = `${left - radius}px`;
      rippleItem.style.width = `${2 * radius}px`;
      rippleItem.style.height = `${2 * radius}px`;
      rippleItem.style.backgroundImage = `radial-gradient(circle, ${rippleColor} 20%,${rippleColor} 40%, transparent 100%)`;
      rippleItem.style.transitionDuration = transitionDuration;

      this.appendChild(rippleItem);
      requestAnimationFrame(() => {
        rippleItem.style.transform = "scale(1)";
        rippleItem.style.opacity = "0.2";
      });

      return {
        remove() {
          requestAnimationFrame(() => {
            rippleItem.style.opacity = "0";
            rippleItem.style.transitionDuration =
              "var(--cp-motion-smooth),var(--cp-motion-fast)";
          });
          requestAnimationFrame(() => {
            const delay =
              secondsToNumber(getComputedStyle(rippleItem).transitionDuration, {
                transType: "ms",
              }) || 300;

            setTimeout(() => {
              rippleItem.remove();
            }, delay);
          });
        },
        animateDom: rippleItem,
      };
    };
  }
}

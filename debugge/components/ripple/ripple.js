import { secondsToNumber } from '../../utils/time.js';
import { elementAddStyles } from '../../utils/style.js';

/**
 * 涟漪效果组件
 * 此组件只暴露了一个开始涟漪的方法出来
 * 此方法返回一个 remove 函数和当前执行动画的元素
 */
class CpRipple extends HTMLElement {
    constructor() {
        super();
        elementAddStyles(this, CpRipple.cpRippleStyle);
    }
    /** 开始涟漪动画 */
    get startPiple() {
        /** 计算 top 和 left 离方形四个点最远的距离,即为涟漪半径 */
        const calculateRadius = (params) => {
            const { pow, sqrt, abs } = Math;
            const { top, left, parentWidth, parentHeight } = params;
            const offsetRight = abs(left - parentWidth);
            const offsetBootom = abs(parentHeight - top);
            const radiusAdjacentWidth = offsetRight > left ? offsetRight : left;
            const radiusAdjacentHeight = offsetBootom > top ? offsetBootom : top;
            return sqrt(pow(radiusAdjacentWidth, 2) + pow(radiusAdjacentHeight, 2));
        };
        return function (options) {
            const { top, left, transitionDuration, rippleColor, changeOpacity = true, } = options;
            const radius = calculateRadius(options);
            const rippleItem = document.createElement("div");
            elementAddStyles(rippleItem, CpRipple.cpRippleItemStyle);
            rippleItem.style.top = `${top - radius}px`;
            rippleItem.style.left = `${left - radius}px`;
            rippleItem.style.width = `${2 * radius}px`;
            rippleItem.style.height = `${2 * radius}px`;
            rippleItem.style.backgroundImage = `radial-gradient(circle, ${rippleColor},${rippleColor} 80%, transparent 100%)`;
            rippleItem.style.transitionDuration = transitionDuration;
            this.appendChild(rippleItem);
            requestAnimationFrame(() => {
                rippleItem.style.transform = "scale(1)";
                if (changeOpacity)
                    rippleItem.style.opacity = "0";
            });
            return {
                remove() {
                    requestAnimationFrame(() => {
                        rippleItem.style.opacity = "0";
                        rippleItem.style.transitionDuration = "var(--cp-motion-smooth)";
                    });
                    requestAnimationFrame(() => {
                        const delay = secondsToNumber(getComputedStyle(rippleItem).transitionDuration, {
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
/** 组件容器样式 */
CpRipple.cpRippleStyle = {
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
CpRipple.cpRippleItemStyle = {
    "border-radius": " 50%",
    position: "absolute",
    transform: "scale(0)",
    opacity: "0.2",
    "transition-property": "transform, opacity",
    "transition-timing-function": "cubic-bezier(.5,.17,.6,.93)",
};

export { CpRipple as default };

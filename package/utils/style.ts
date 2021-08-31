import type { CSSproperty } from "../css/css";

/** 给html元素添加行内样式 */
export const elementAddStyles = (element: HTMLElement, style: CSSproperty) => {
  Object.keys(style).forEach((key) => {
    element.style.setProperty(key, style[key as keyof CSSproperty] || null);
  });
};

/** 给html元素添加行内样式 */
export const elementAddStyles = (
  element: HTMLElement,
  style: { [key in keyof CSSStyleDeclaration]: "string" }
) => {
  Object.keys(style).forEach((key) => {
    if (typeof key === "string")
      element.style.setProperty(
        key,
        style[key as keyof CSSStyleDeclaration] || null
      );
  });
};

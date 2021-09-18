import type { CSSproperty } from "../css/css";

/** 给html元素添加行内样式 */
export const elementAddStyles = (element: HTMLElement, style: CSSproperty) => {
  Object.keys(style).forEach((key) => {
    element.style.setProperty(key, style[key as keyof CSSproperty] || null);
  });
};

/**
 * @method 格式化样式
 * @param style
 */
export const foramtStyle = (
  style: Record<string, Partial<CSSStyleDeclaration>>
) => {
  // 需要忽略的key
  const excludeKey = ["@keyframes", ":host"];

  const styleSheet = new CSSStyleSheet();

  const transitionStyle = (
    className: string,
    style: Partial<CSSStyleDeclaration>
  ) => {
    let str: string = `${className} {`;
    Object.keys(style).forEach((key: any) => {
      // 驼峰转中划线
      const transitionKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      str += `${transitionKey}:${style[key]};`;
    });

    return str + "}";
  };

  Object.keys(style).forEach((key: string) => {
    // 驼峰转中划线
    const transitionKey = excludeKey.some((str) => key.indexOf(str) > -1)
      ? key
      : `.${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

    styleSheet.insertRule(transitionStyle(transitionKey, style[key]));
  });

  return styleSheet;
};

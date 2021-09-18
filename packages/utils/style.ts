/** 给html元素添加行内样式 */
/**
 * @method 格式化样式
 * @param style
 */
const foramtStyle = (style: Record<string, Partial<CSSStyleDeclaration>>) => {
  // 需要忽略的key
  const excludeKey = ["@keyframes", ":host"];
  const styleSheet = new CSSStyleSheet();

  const transitionStyle = (className: string, style: Record<string, any>) => {
    let str = `${className} {`;
    Object.keys(style).forEach((key) => {
      // 驼峰转中划线
      const transitionKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      str += `${transitionKey}:${style[key]};`;
    });
    return str + "}";
  };
  Object.keys(style).forEach((key) => {
    // 驼峰转中划线
    const transitionKey = excludeKey.some((str) => key.indexOf(str) > -1)
      ? key
      : `.${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    styleSheet.insertRule(transitionStyle(transitionKey, style[key]));
  });
  return styleSheet;
};

export { foramtStyle };

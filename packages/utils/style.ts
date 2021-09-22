/**
 * @method 驼峰转中划线
 * @param str 需要转换的字符串
 */
const humpToOverline = (str: keyof CssProperty) =>
  str.replace(/([A-Z])/g, "-$1").toLowerCase();

/**
 * @method 转换对象属性名为css类名
 * @param selector 选择器
 * @param style 样式对象
 */
const transitionStyle = (selector: string, style: CssProperty) => {
  let str = `${selector} {`;
  Object.keys(style).forEach((key) => {
    // 驼峰转中划线
    const transitionKey = humpToOverline(key as keyof CssProperty);
    str += `${transitionKey}:${style[key as keyof CssProperty]};`;
  });

  return str + "}";
};

/**
 * @method 格式化样式配置对象
 * @param style 需要格式化的组件样式
 */
const foramtStyle = (style: CssStyleSheetObject) => {
  const styleSheet = new CSSStyleSheet();
  Object.keys(style).forEach((key) => {
    const temp = humpToOverline(key as keyof CssProperty);
    styleSheet.insertRule(transitionStyle(temp, style[key]));
  });
  return styleSheet;
};

/** 格式化 keyframes 对象 */
const formatKeyframes = (keyframes: KeyframeObject) => {
  const styleSheet = new CSSStyleSheet();
  const keyframeNames = Object.keys(keyframes);
  keyframeNames.forEach((name) => {
    let keyframeStepStr = '';
    Object.keys(keyframes[name]).forEach(step => {
      keyframeStepStr += transitionStyle(step, keyframes[name][step])
    })
    styleSheet.insertRule(`@keyframes ${name} { ${keyframeStepStr} }`)
  })
  return styleSheet;
}


export { foramtStyle, formatKeyframes };

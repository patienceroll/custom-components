/**
 * #### 此函数可以进行如下操作
 * - 转化rgb --> rgba
 * - rgba 和 rgb 传入一个乘算的透明度值
 * @param {string} color
 * @param {{alphRate:number} | undefined} options alphRate 为 0-1 的数字,会与color的透明度相乘
 */
const rgbToRgba = (color, options = { alphRate: 1 }) => {
  if (typeof color !== "string") return color;
  const regRgbaAndRgb =
    /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})([,]?)([\(\).\d]*)?\)/;
  const colorRemovedSpace = color.replace(/\s+/g, "").match(regRgbaAndRgb);

  if (Array.isArray(colorRemovedSpace)) {
    const red = colorRemovedSpace[1];
    const green = colorRemovedSpace[2];
    const blue = colorRemovedSpace[3];
    const alph = colorRemovedSpace[5];
    return `rgba(${red},${green},${blue},${
      alph ? Number(alph) * options.alphRate : 1 * options.alphRate
    })`;
  }
  return color;
};

window.utils = { rgbToRgba };

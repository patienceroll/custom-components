/**
 * #### 字符串秒转换为数字
 * - 如 "0.3s" --> 0.3
 */
const secondsToNumber = (num) => Number(num.replace(/s/g, ""));

export { secondsToNumber };

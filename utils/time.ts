/**
 * #### 字符串秒转换为数字 
 * - 如 "0.3s" --> 0.3
 */
export const secondsToNumber = (num: string) => Number(num.replace(/s/g, ""));

/**
 * #### 字符串秒转换为数字
 * - 如 "0.3s" --> 0.3
 */
export const secondsToNumber = (
  num: string,
  options?: {
    /** 转换时间类型 默认 s */
    transType?: "ms" | "s";
  }
) => {
  const { transType } = options || {};
  const time = Number(num.replace(/s/g, ""));
  switch (transType) {
    case "ms":
      return time * 1000;
    default:
      return time;
  }
};

/**
 * #### 字符串秒转换为数字
 * - 如 "0.3s" --> 0.3
 */
const secondsToNumber = (num, options) => {
    const { transType } = options || {};
    const time = Number(num.replace(/s/g, ""));
    switch (transType) {
        case "ms":
            return time * 1000;
        default:
            return time;
    }
};

export { secondsToNumber };

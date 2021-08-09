/** class 字符串末尾添加 class */
export const pushClassName = (
  current: string,
  appendChild: string[] | string
) => {
  if (typeof appendChild === "string") {
    if (!current) return appendChild;
    return `${current} ${appendChild}`;
  }
  if (Array.isArray(appendChild)) {
    if (!current) return appendChild.join(" ");
    return `${current} ${appendChild.join(" ")}`;
  }

  return current;
};

/**
 * #### element class 末尾添加 类名
 * ```javascript
 *  // <element class="a" />    ===>   <element class="a b" />
 *  elementPushClass(element,"b")
 *
 *  // <element class="a" />    ===>   <element class="a b c" />
 *  elementPushClass(element,["b","c"])
 * ```
 */
export const elementPushClass = (
  element: HTMLElement,
  appendClass: string[] | string
) => {
  const className = element.getAttribute("class") || "";
  let newClass: HTMLElement["className"] = "";
  if (typeof appendClass === "string") {
    if (!className) newClass = appendClass;
    else newClass = `${className} ${appendClass}`;
  }
  if (Array.isArray(appendClass)) {
    if (!className) newClass = appendClass.join(" ");
    else newClass = `${className} ${appendClass.join(" ")}`;
  }
  element.setAttribute("class", newClass);
};

/**
 * #### element 移除 class 的部分类名
 * ```javascript
 *  // <element class="a b" />    ===>   <element class="a" />
 *  elementRemoveClass(element,"b")
 *
 *  // <element class="a b c" />    ===>   <element class="a" />
 *  elementRemoveClass(element,["b","c"])
 * ```
 */
export const elementRemoveClass = (
  element: HTMLElement,
  removeClass?: string[] | string
) => {
  const className = element.getAttribute("class") || "";
  let newClassName = "";
  if (typeof removeClass === "undefined") element.removeAttribute("class");
  else if (typeof removeClass === "string") {
    newClassName = className
      .split(" ")
      .filter((clas) => clas !== removeClass)
      .join(" ");
  } else if (Array.isArray(removeClass)) {
    className
      .split(" ")
      .filter((clas) => !removeClass.includes(clas))
      .join(" ");
  } else throw new Error("removeClass 必须为字符、字符数组、undefined");

  if (newClassName === "") element.removeAttribute("class");
  else element.setAttribute("class", newClassName);
};
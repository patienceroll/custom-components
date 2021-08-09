'use strict';

/**
 * #### 此函数可以进行如下操作
 * - 转化rgb --> rgba
 * - rgba 和 rgb 传入一个乘算的透明度值
 * @param {string} color
 * @param {{alphRate:number} | undefined} options alphRate 为 0-1 的数字,会与color的透明度相乘
 */
const rgbToRgba = (color, options = { alphRate: 1 }) => {
    if (typeof color !== "string")
        return color;
    const regRgbaAndRgb = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})([,]?)([\(\).\d]*)?\)/;
    const colorRemovedSpace = color.replace(/\s+/g, "").match(regRgbaAndRgb);
    if (Array.isArray(colorRemovedSpace)) {
        const red = colorRemovedSpace[1];
        const green = colorRemovedSpace[2];
        const blue = colorRemovedSpace[3];
        const alph = colorRemovedSpace[5];
        return `rgba(${red},${green},${blue},${alph ? Number(alph) * options.alphRate : 1 * options.alphRate})`;
    }
    return color;
};

/** class 字符串末尾添加 class */
const pushClassName = (current, appendChild) => {
    if (typeof appendChild === "string") {
        if (!current)
            return appendChild;
        return `${current} ${appendChild}`;
    }
    if (Array.isArray(appendChild))
        return `${current} ${appendChild.join(" ")}`;
    return current;
};

/**
 * #### 字符串秒转换为数字
 * - 如 "0.3s" --> 0.3
 */
const secondsToNumber = (num) => Number(num.replace(/s/g, ""));

class Tag extends HTMLElement {
    constructor() {
        super();
        const closeIcon = document.createElement("span");
        closeIcon.setAttribute("class", "cp-tag-close-icon");
        closeIcon.innerHTML = `<svg style="font-size:10px" width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                              </path>
                            </svg>`;
        closeIcon.onclick = () => {
            this.dispatchEvent(new CustomEvent("close"));
            /** 在 remove 之前还需要执行动画 */
            this.setAttribute("class", pushClassName(this.getAttribute("class") || "", "cp-disappear"));
            setTimeout(() => {
                this.remove();
            }, secondsToNumber(getComputedStyle(this).animationDuration) * 1000);
        };
        closeIcon.style.display = "none";
        this.closeIcon = closeIcon;
        this.appendChild(closeIcon);
    }
    static setColor(color) {
        if (color &&
            !["success", "processing", "warning", "errror"].includes(color)) {
            this.style.color = color;
        }
        const style = getComputedStyle(this);
        this.style.border = `1px solid ${rgbToRgba(style.color, {
            alphRate: 0.3,
        })}`;
        this.style.backgroundColor = rgbToRgba(style.color, {
            alphRate: 0.1,
        });
    }
    static setCloseable(closable) {
        if (closable === "true") {
            this.closeIcon.style.display = "unset";
        }
        else {
            this.closeIcon.style.display = "none";
        }
    }
    connectedCallback() { }
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case "closable":
                Tag.setCloseable.call(this, newValue);
                break;
            case "color":
                Tag.setColor.call(this, newValue);
                break;
        }
    }
}
Tag.observedAttributes = ["color", "closable"];
if (!customElements.get("cp-tag"))
    customElements.define("cp-tag", Tag);

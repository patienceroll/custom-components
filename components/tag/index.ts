import type { TagType } from "./data";
import { rgbToRgba } from "utils/color";
import { elementPushClass, elementRemoveClass } from "utils/class-name";
import { secondsToNumber } from "utils/time";

import "./index.css";

class Tag extends HTMLElement {
  constructor() {
    super();
    const closeIcon = Tag.initCloseIcon.call(this);
    this.closeIcon = closeIcon;
    this.appendChild(closeIcon);
  }

  /** 保存在实例里面的 closeIcon 对象 */
  closeIcon: HTMLSpanElement;

  /**
   * #### 初始化 closeIcon
   *
   * - 调用的时候需要  this 需要指向 Tag 实例
   */
  static initCloseIcon(this: Tag): Tag["closeIcon"] {
    const closeIcon = document.createElement("span");
    closeIcon.setAttribute("class", "cp-tag-close-icon");
    closeIcon.innerHTML = `<svg style="font-size:10px" width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                              </path>
                            </svg>`;

    closeIcon.style.display = "none";
    closeIcon.onclick = (event) => {
      const show = this.getAttribute("show");

      const customEvent = new CustomEvent<{
        domEvent: MouseEvent;
        show?: boolean;
      }>("close", {
        detail: {
          domEvent: event,
          show: show ? { ture: false, false: true }[show] : undefined,
        },
      });
      this.dispatchEvent(customEvent);

      if (show === "true") {
        elementRemoveClass(this, "cp-disappear");
      } else if (show === "false") {
        elementPushClass(this, "cp-disappear");
      } else {
        elementPushClass(this, "cp-disappear");
        setTimeout(() => {
          this.remove();
        }, secondsToNumber(getComputedStyle(this).animationDuration) * 1000);
      }
    };
    return closeIcon;
  }

  /**
   * #### class Tag 私有的设置实例颜色的方法
   *
   * - 调用的时候 this 需要指向 Tag 实例
   */
  static setColor(
    this: Tag,
    color: TagType | CSSStyleDeclaration["color"] | null
  ) {
    if (
      color &&
      !["success", "processing", "warning", "errror"].includes(color)
    ) {
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

  /**
   * class Tag 私有的设置是否显示关闭按钮的方法
   *
   * - 调用的时候 this 需要指向 Tag 实例
   */
  static setCloseable(this: Tag, closable: string | null) {
    if (closable === "true") {
      this.closeIcon.style.display = "unset";
    } else {
      this.closeIcon.style.display = "none";
    }
  }

  static setCloseIconOnClick(this: Tag) {}

  connectedCallback() {}

  static observedAttributes = ["color", "closable", "show"];
  attributeChangedCallback(
    attrName: "color" | "closable" | "show",
    oldValue: string | null,
    newValue: string | null
  ) {
    switch (attrName) {
      case "closable":
        Tag.setCloseable.call(this, newValue);
        break;
      case "color":
        Tag.setColor.call(this, newValue);
        break;
      case "show":
        if (newValue === "true") {
          elementRemoveClass(this, "cp-disappear");
          elementPushClass(this, "cp-appear");
          this.style.display = "inline-block";
        } else if (newValue === "false") {
          elementRemoveClass(this, "cp-appear");
          elementPushClass(this, "cp-disappear");
          setTimeout(() => {
            this.style.display = "none";
          }, secondsToNumber(getComputedStyle(this).animationDuration) * 1000);
        }
        break;
      default:
        break;
    }
  }
}

if (!customElements.get("cp-tag")) customElements.define("cp-tag", Tag);

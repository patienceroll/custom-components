(() => {
  class Tag extends HTMLElement {
    constructor() {
      super();

      const closeIcon = document.createElement("span");
      closeIcon.setAttribute("class", "cp-tag-close-icon");
      closeIcon.innerHTML = `<svg style="font-size:10px" width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>`;
      closeIcon.onclick = () => {
        this.dispatchEvent(new CustomEvent("close"));
        this.remove();
      };
      if (this.getAttribute("closable") !== "true")
        closeIcon.style.display = "none";
      this.closeIcon = closeIcon;

      this.appendChild(closeIcon);
    }

    static observedAttributes = ["color", "closable"];

    /**
     * 设置标签颜色
     * @param { string | null } color
     */
    static setColor(color) {
      if (
        color &&
        !["success", "processing", "warning", "errror"].includes(color)
      ) {
        this.style.color = color;
      }
      const { rgbToRgba } = window.utils;
      const style = getComputedStyle(this);
      this.style.border = `1px solid ${rgbToRgba(style.color, { alphRate: 0.3 })}`;
      this.style.backgroundColor = rgbToRgba(style.color, {
        alphRate: 0.1,
      });
    }

    /**
     * 设置标签是否可关闭
     * @param { "true" | "false" | null } closable
     */
    static setCloseable(closable) {
      if (closable === "true") {
        this.closeIcon.style.display = "unset";
      } else {
        this.closeIcon.style.display = "none";
      }
    }

    connectedCallback() {}

    /**
     * @param {"color" | 'closable' } attrName
     */
    attributeChangedCallback(attrName, oldValue, newValue) {
      switch (attrName) {
        case "closable":
          Tag.setCloseable.call(this, newValue);
          break;
        case "color":
          Tag.setColor.call(this, newValue);
          break;
        default:
          break;
      }
    }
  }

  if (!customElements.get("cp-tag")) customElements.define("cp-tag", Tag);
})();

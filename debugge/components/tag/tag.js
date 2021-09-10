class CpTag extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [CpTag.CpTagStyleSheet];
        const container = document.createElement("span");
        const iconSlot = document.createElement("slot");
        const textSlot = document.createElement("slot");
        const close = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        container.setAttribute("class", "cp-tag-container");
        container.setAttribute("part", "container");
        iconSlot.name = "icon";
        iconSlot.setAttribute("part", "icon");
        textSlot.setAttribute("part", "text");
        close.setAttribute("part", "close");
        close.setAttribute("width", "1em");
        close.setAttribute("height", "1em");
        close.setAttribute("viewBox", "0 0 1024 1024");
        path.setAttribute("d", "M270.634667 270.634667a21.333333 21.333333 0 0 1 30.165333 0l211.2 211.2 211.2-211.2a21.333333 21.333333 0 1 1 30.165333 30.165333L542.165333 512l211.2 211.2a21.333333 21.333333 0 0 1 2.474667 27.221333l-2.474667 2.944a21.333333 21.333333 0 0 1-30.165333 0L512 542.165333l-211.2 211.2a21.333333 21.333333 0 1 1-30.165333-30.165333l211.2-211.2-211.2-211.2a21.333333 21.333333 0 0 1-2.474667-27.221333z");
        close.appendChild(path);
        container.append(iconSlot, textSlot, close);
        shadowRoot.appendChild(container);
    }
    attributeChangedCallback(attr, older, newer) {
        switch (attr) {
            case "show":
                const { shadowRoot } = this;
                // 初始化的时候不展示动画
                if (Object.is(older, null))
                    return;
                if (shadowRoot && shadowRoot.firstElementChild) {
                    if (newer === "true") {
                        shadowRoot.firstElementChild.style.removeProperty("display");
                        shadowRoot.firstElementChild.setAttribute("class", "cp-tag-container cp-tag-show");
                    }
                    if (newer === "false") {
                        shadowRoot.firstElementChild.setAttribute("class", "cp-tag-container cp-tag-hide");
                        setTimeout(() => {
                            shadowRoot.firstElementChild.style.display =
                                "none";
                        }, 300);
                    }
                }
                break;
        }
    }
}
CpTag.CpTagStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`@keyframes hide {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }`);
    sheet.insertRule(`@keyframes show {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }`);
    sheet.insertRule(`.cp-tag-container {
      display: inline-block;
      font-size: 14px;
    }`);
    sheet.insertRule(`.cp-tag-hide {
      animation-name: hide;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
    }`);
    sheet.insertRule(`.cp-tag-show {
      animation-name: show;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
    }`);
    return sheet;
})();
CpTag.observedAttributes = ["show"];

export { CpTag as default };

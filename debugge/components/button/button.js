import '../ripple/index.js';

class CpButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [CpButton.cpButtonStyleSheet];
        const button = document.createElement("button");
        const textWrapper = document.createElement("span");
        const text = document.createElement("slot");
        const leftIcon = document.createElement("slot");
        const rightIcon = document.createElement("slot");
        const ripple = document.createElement("cp-ripple");
        button.setAttribute("class", "cp-button");
        button.setAttribute("part", "button");
        textWrapper.setAttribute("class", "cp-button-text");
        leftIcon.name = "left-icon";
        leftIcon.setAttribute("part", "left-icon");
        rightIcon.name = "right-icon";
        rightIcon.setAttribute("part", "right-icon");
        textWrapper.append(leftIcon, text, rightIcon);
        button.append(textWrapper, ripple);
        shadowRoot.appendChild(button);
    }
    connectedCallback() {
        const onClickThis = (event) => {
            if (this.shadowRoot &&
                this.shadowRoot.firstElementChild &&
                this.shadowRoot.firstElementChild.lastElementChild) {
                this.shadowRoot.firstElementChild.lastElementChild.start({
                    top: event.offsetY,
                    left: event.offsetX,
                });
            }
        };
        this.addEventListener("click", onClickThis);
    }
}
CpButton.cpButtonStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`:host {
      display: inline-block;
    }`);
    styleSheet.insertRule(`.cp-button {
      padding: 6px 16px;
      border: none;
      position: relative;
      outline: 0;
      user-select: none;
      cursor: pointer;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      border-radius: 4px;
    }`);
    return styleSheet;
})();

export { CpButton as default };

import '../ripple/index.js';

class CpButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [CpButton.cpButtonStyleSheet];
        const button = document.createElement("button");
        const text = document.createElement("slot");
        const leftIcon = document.createElement("slot");
        const rightIcon = document.createElement("slot");
        button.setAttribute("class", "cp-button");
        button.setAttribute("part", "button");
        leftIcon.name = "left-icon";
        leftIcon.setAttribute("part", "left-icon");
        rightIcon.name = "right-icon";
        rightIcon.setAttribute("part", "right-icon");
        button.append(leftIcon, text, rightIcon);
        shadowRoot.appendChild(button);
    }
}
CpButton.cpButtonStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`:host {
      display: inline-block;
    }`);
    styleSheet.insertRule(`.cp-button {
      border: none;
    }`);
    return styleSheet;
})();

export { CpButton as default };

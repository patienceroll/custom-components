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
        textWrapper.setAttribute("class", "cp-button-text");
        button.setAttribute("part", "button");
        leftIcon.setAttribute("part", "left-icon");
        rightIcon.setAttribute("part", "right-icon");
        leftIcon.name = "left-icon";
        rightIcon.name = "right-icon";
        let rippleItem;
        this.addEventListener("mousedown", (e) => {
            e.preventDefault();
            rippleItem = ripple.start({ top: e.offsetY, left: e.offsetX });
        });
        this.addEventListener("mouseup", () => {
            if (rippleItem) {
                rippleItem.then(({ stop }) => stop());
                rippleItem = undefined;
            }
        });
        this.addEventListener("touchstart", (e) => {
            if (e.targetTouches.length !== 1)
                return;
            if (e.cancelable) {
                e.preventDefault();
                const { targetTouches, target } = e;
                if (target) {
                    const [touch] = targetTouches;
                    const { pageX, pageY } = touch;
                    const { left, top } = target.getBoundingClientRect();
                    if (rippleItem)
                        rippleItem.then(({ stop }) => stop());
                    rippleItem = ripple.start({ top: pageY - top, left: pageX - left });
                }
            }
        });
        this.addEventListener("touchend", () => {
            if (rippleItem) {
                rippleItem.then(({ stop }) => stop());
                rippleItem = undefined;
            }
        });
        textWrapper.append(leftIcon, text, rightIcon);
        button.append(textWrapper, ripple);
        shadowRoot.appendChild(button);
    }
    connectedCallback() { }
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
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%);
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1); 
    }`);
    styleSheet.insertRule(`.cp-button:hover{
      background-color: #c0c0c0;
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%);
    }`);
    return styleSheet;
})();

export { CpButton as default };

import { foramtStyle } from '../../utils/style.js';

class CpDialog extends HTMLElement {
    constructor() {
        super();
        CpDialog.CpCircularProgressStyleSheet =
            CpDialog.CpCircularProgressStyleSheet || foramtStyle(CpDialog.style);
        this.initModal();
    }
    /**
     * @method 初始化弹窗
     */
    initModal() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const dialogContainer = document.createElement("div");
        dialogContainer.classList.add("dialog-container");
        const dialogMask = document.createElement("div");
        dialogMask.classList.add("dialog-mask");
        dialogMask.addEventListener("click", () => {
            this.setAttribute("open", "false");
            this.classList.add("dialog-hiden");
        });
        const content = document.createElement("div");
        content.classList.add("dialog-content");
        content.innerText = "我是弹窗";
        dialogContainer.append(content, dialogMask);
        shadowRoot.adoptedStyleSheets = [CpDialog.CpCircularProgressStyleSheet];
        shadowRoot.append(dialogContainer);
    }
}
CpDialog.CpCircularProgressStyleSheet = null;
CpDialog.style = {};
CpDialog.style = {
    [":host([open=true])"]: {
        display: "block",
    },
    [":host([open=false])"]: {
        display: "none",
    },
    dialogHiden: {
        display: "none",
    },
    dialogContainer: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        transition: "all 1s easein",
    },
    dialogMask: {
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: "100",
        backgroundColor: "rgba(0,0,0,.3)",
        top: "0",
        left: "0",
    },
    dialogContent: {
        position: "absolute",
        minWidth: "500px",
        minHeight: "300px",
        backgroundColor: "#fff",
        top: "50%",
        left: "50%",
        color: "#000",
        textAlign: "center",
        lineHeight: "300px",
        zIndex: "120",
        transform: "translate(-50%,-50%)",
        fontSize: "40px",
    },
};

export { CpDialog as default };

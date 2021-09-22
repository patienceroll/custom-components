import { formatStyle, formatKeyframes } from "../../utils/style";


export default class CpDialog extends HTMLElement {
  private container: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  static styleSheet: CSSStyleSheet | undefined;
  static keyframesSheet: CSSStyleSheet | undefined;
  // 基础层级
  static baseIndex = 0;
  contentPosition = { x: 0, y: 0 };

  static keyframes: KeyframeObject = {
    show: {
      "0%": {
        opacity: "0",
      },
      "100%": {
        opacity: "1",
      },
    },
    hiden: {
      "0%": {
        opacity: "1",
      },
      "100%": {
        opacity: "0",
      },
    },
    contentshow: {
      "0%": {
        top: '10%',
        left: '0',
      },
      "100%": {
        top: '30%',
        transform: 'translateX(-50%)'
      }
    },
    contenthiden: {
      "0%": {
        top: '30%',
        transform: 'translateX(-50%)'
      },
      "100%": {
        top: '10%',
        left: '0',
      },
    }
  };

  static style: CssStyleSheetObject = {
    [":host([open=true])"]: {
      display: "block",
    },
    [":host([open=false])"]: {
      display: "none",
    },
    ".cp-dialog-hiden": {
      opacity: "0",
      animation: "hiden 0.3s",
    },
    ".cp-dialog-show": {
      opacity: "1",
      animation: "show 0.3s",
    },
    ".cp-dialog-container": {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: '1000',
    },
    ".cp-dialog-mask": {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,.1)",
      top: "0",
      left: "0",
    },
    ".cp-dialog-content": {
      position: 'absolute',
      top: '20%',
      textAlign: "center",
      lineHeight: "300px",
      fontSize: "40px",
      left: '50%',
      transform: 'translateX(-50%)',
      transition: 'all .3s ease',
    },
  };

  constructor() {
    super();
    CpDialog.styleSheet = CpDialog.styleSheet || formatStyle(CpDialog.style);
    CpDialog.keyframesSheet =
      CpDialog.keyframesSheet || formatKeyframes(CpDialog.keyframes);
    const shadowRoot = this.attachShadow({ mode: "open" });
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("cp-dialog-container");
    this.container = dialogContainer;

    const dialogMask = document.createElement("div");
    dialogMask.classList.add("cp-dialog-mask");
    dialogMask.addEventListener("click", this.onclickMask);

    const content = document.createElement("div");
    content.classList.add("cp-dialog-content");
    const contentSlot = document.createElement('slot');
    content.append(contentSlot);
    this.content = content;

    shadowRoot.adoptedStyleSheets = [
      CpDialog.keyframesSheet,
      CpDialog.styleSheet as CSSStyleSheet,
    ];
    dialogContainer.append(content, dialogMask);
    shadowRoot.append(dialogContainer);
  }

  private onclickMask = () => {
    return this.hidenDialog();
  }

  setContentPosition(isShow = true) {
    const { x, y } = this.contentPosition;
    if (this.content) {
      if (isShow) {
        this.content.style.left = `${x}px`;
        this.content.style.top = `${y}px`;
        this.content.style.opacity = '0';
        setTimeout(() => {
          if (this.content) {
            this.content.style.left = '';
            this.content.style.opacity = '1';
            this.content.style.top = '';
          }
        }, 300)
      } else {
        this.content.style.left = `${this.contentPosition.x}px`;
        this.content.style.top = `${this.contentPosition.y}px`;
        this.content.style.opacity = '0';
      }
    }
  }

  showDialog(e: PointerEvent) {
    const { x, y } = e;
    this.contentPosition = { x, y };
    if (this.container) {
      this.container.style.zIndex = `${1000 + CpDialog.baseIndex++}`
      this.container.classList.toggle("cp-dialog-hiden", false);
      this.container.classList.toggle("cp-dialog-show", true);
      this.setAttribute("open", "true");
    }
    this.setContentPosition();
  }

  hidenDialog() {
    CpDialog.baseIndex--;
    if (this.container) {
      this.container.classList.add("cp-dialog-hiden");
      this.container.classList.toggle("cp-dialog-show", false);
      setTimeout(() => {
        this.setAttribute("open", "false");
      }, 300);
    }
    this.setContentPosition(false);
  }
}

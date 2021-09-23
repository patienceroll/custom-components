import { formatStyle, formatKeyframes, setDomNodeStyle } from "../../utils/style";
import { DialogType } from './data';
export default class CpDialog extends HTMLElement {
  private container: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private type: DialogType = 'modal';
  static styleSheet: CSSStyleSheet | undefined;
  static keyframesSheet: CSSStyleSheet | undefined;
  // 基础层级
  static baseIndex = 0;
  // 鼠标位置
  mousePosition = { x: '', y: '' };

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
  };

  static style:CSSStyleObject = {
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
    ".cp-dialog-modal-content": {
      position: 'absolute',
      top: '20%',
      fontSize: "40px",
      left: '50%',
      transform: 'translateX(-50%)',
      transition: 'all .2s ease',
    },
    ".cp-dialog-drawer-content": {
      position: 'absolute',
      top: '0',
      fontSize: "40px",
      right: '0',
      transition: 'all .2s ease',
      minWidth: '200px',
      height: '100vh',
      backgroundColor: '#fff',
      boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)'
    },
  };

  constructor() {
    super();
    if (CpDialog.styleSheet === undefined) CpDialog.styleSheet = formatStyle(CpDialog.style);
    if (CpDialog.keyframesSheet === undefined) CpDialog.keyframesSheet = formatKeyframes(CpDialog.keyframes);

    const type = this.getAttribute('type');
    if (['modal', 'drawer'].includes(type as DialogType)) {
      this.type = type as DialogType;
    } else {
      this.type = 'modal'
    }

    const shadowRoot = this.attachShadow({ mode: "open" });
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("cp-dialog-container");
    this.container = dialogContainer;

    const dialogMask = document.createElement("div");
    dialogMask.classList.add("cp-dialog-mask");
    dialogMask.addEventListener("click", this.onclickMask);

    const content = document.createElement("div");
    const contentSlot = document.createElement('slot');
    content.append(contentSlot);
    this.content = content;
    this.setContent();

    shadowRoot.adoptedStyleSheets = [
      CpDialog.keyframesSheet,
      CpDialog.styleSheet,
    ];

    dialogContainer.append(content, dialogMask);
    shadowRoot.append(dialogContainer);
  }

  private setContent() {
    switch (this.type) {
      case 'modal':
        this.content?.classList.add('cp-dialog-modal-content');
        break;
      case 'drawer':
        this.content?.classList.add('cp-dialog-drawer-content');
        break;
      default:
        break;
    }
  }

  private onclickMask = () => {
    return this.hidenDialog();
  }

  /**
   * @method 设置鼠标点击位置
   * @param isShow 是否展示弹窗
   */
  setmousePosition(isShow = true) {
    if (isShow) {
      const { x, y } = window.event as PointerEvent;
      this.mousePosition = { x: `${x}`, y: `${y}` }
    }
    const { x, y } = this.mousePosition;

    if (this.content) {
      if (this.type === 'modal') {
        if (isShow) {
          setDomNodeStyle(this.content, { left: `${x}px`, top: `${y}px`, opacity: '0' })
          setTimeout(() => {
            if (this.content) {
              setDomNodeStyle(this.content, { left: '', top: '', opacity: '1' })
            }
          }, 200)
        } else {
          setDomNodeStyle(this.content, { left: `${x}px`, top: `${y}px`, opacity: '0' })
        }
      } else {
        if (isShow) {
          setDomNodeStyle(this.content, { right: '-100%', top: '0', opacity: '0' })
          setTimeout(() => {
            if (this.content) {
              setDomNodeStyle(this.content, { right: '', top: '', opacity: '1' })
            }
          }, 200)
        } else {
          setDomNodeStyle(this.content, { right: '-100%', top: '0', opacity: '0' })
        }
      }
    }
  }

  /** 打开弹窗 */
  showDialog() {
    if (this.container) {
      this.container.style.zIndex = `${1000 + CpDialog.baseIndex++}`
      this.container.classList.replace('cp-dialog-hiden', 'cp-dialog-show')
      this.setAttribute("open", "true");
    }
    this.setmousePosition();
  }

  hidenDialog() {
    CpDialog.baseIndex--;
    if (this.container) {
      this.container.classList.replace("cp-dialog-show", 'cp-dialog-hiden');
      setTimeout(() => {
        this.setAttribute("open", "false");
      }, 200);
    }
    this.setmousePosition(false);
  }
}

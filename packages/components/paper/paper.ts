



export default class CpPaper extends HTMLElement {
  static CpPaperStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet()
    styleSheet.insertRule(`:host {
      display: block;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }`)

    return styleSheet;
  })()
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.adoptedStyleSheets = [CpPaper.CpPaperStyleSheet];
    const slot = document.createElement('slot');
    shadowRoot.appendChild(slot)
  }
}
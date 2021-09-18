import { foramtStyle } from '../../utils/style'

export default class CpPaper extends HTMLElement {
  static styleSheet: CSSStyleSheet | undefined;
  static style: CssStyleSheetObject = {
    ':host([variant="outlined"])': {

    },
    ":host": {
      display: 'block',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  }
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    if (typeof CpPaper.styleSheet === 'undefined') CpPaper.styleSheet = foramtStyle(CpPaper.style)
    shadowRoot.adoptedStyleSheets = [CpPaper.styleSheet];
    const slot = document.createElement('slot');
    shadowRoot.appendChild(slot)
  }
}
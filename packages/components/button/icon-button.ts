import type Ripple from "../ripple/ripple";
import { foramtStyle } from '../../utils/style'

import theme from '../../theme/index'

import "../ripple";

export default class CpIconButton extends HTMLElement {
  static styleSheet: CSSStyleSheet | undefined;
  static style: CssStyleSheetObject = {
    ".cp-icon-button": {
      position: 'relative',
      outline: '0',
      border: 'none',
      userSelect: 'none',
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      backgroundColor: theme.color.background,
    },
    ':host': {
      display: 'inline-block',
    }
  }
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: "open" });

    if (typeof CpIconButton.styleSheet === 'undefined') CpIconButton.styleSheet = foramtStyle(CpIconButton.style)

    shadowRoot.adoptedStyleSheets = [CpIconButton.styleSheet]
    const button = document.createElement("button");
    const IconSlot = document.createElement('slot');
    const ripple = document.createElement("cp-ripple") as AttachedShadowRoot<Ripple>;

    button.setAttribute('class', "cp-icon-button")
    button.append(IconSlot, ripple)
    shadowRoot.appendChild(button)
  }
}
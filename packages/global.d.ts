/** 扩展 ShadowRoot 属性 */
declare interface ShadowRoot {
  adoptedStyleSheets: CSSStyleSheet[];
}


/** 开启了shadowRoot的元素 */
declare type AttachedShadowRoot<T> = Omit<T, 'shadowRoot'> & {
  shadowRoot: ShadowRoot
}
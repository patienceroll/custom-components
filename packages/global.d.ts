/** 扩展 ShadowRoot 属性 */
declare interface ShadowRoot {
  adoptedStyleSheets: CSSStyleSheet[];
}

/** css 属性对象 */
declare type CssProperty = Partial<Omit<CSSStyleDeclaration, number | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | "setProperty">>


/** 开启了shadowRoot的元素 */
declare type AttachedShadowRoot<T> = Omit<T, 'shadowRoot'> & {
  shadowRoot: ShadowRoot
}
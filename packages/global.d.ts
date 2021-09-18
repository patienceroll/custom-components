/** 扩展 ShadowRoot 属性 */
declare interface ShadowRoot {
  adoptedStyleSheets: CSSStyleSheet[];
}

/** css 属性对象 */
declare type CssProperty = Partial<Omit<CSSStyleDeclaration, typeof Symbol.iterator | number | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | "setProperty">>

/** css 样式表属性对象 */
declare type CssStyleSheetObject = Record<string, CssProperty>

/** keyframe 样式表属性对象  */
declare type KeyframeObject = Record<string, Record<string, CssProperty>>

/** 开启了shadowRoot的元素 */
declare type AttachedShadowRoot<T> = Omit<T, 'shadowRoot'> & {
  shadowRoot: ShadowRoot
}
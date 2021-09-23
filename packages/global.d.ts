/** 扩展 ShadowRoot 属性 */
declare interface ShadowRoot {
  adoptedStyleSheets: CSSStyleSheet[];
}

/** CSS 属性值 */
declare type CSSProperty = Partial<
  Omit<
    CSSStyleDeclaration,
    | typeof Symbol.iterator
    | number
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
  >
>;

/** key 为 className,值为 css 属性值对象的集合 */
declare type CSSStyleObject = Record<string, CSSProperty>;

/** key 为 动画名字,值为 CSSStyleObject 的动画集合  */
declare type KeyframeObject = Record<string, Record<string, CSSProperty>>;

/** 开启了shadowRoot的元素 */
declare type AttachedShadowRoot<T> = Omit<T, "shadowRoot"> & {
  shadowRoot: ShadowRoot;
};

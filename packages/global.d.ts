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

/** 布尔值 html属性字符串形式的值 */
declare type BooleanCharacter = "true" | "false";

/** 字符串形式的数字 */
declare type NumberCharacter = string;

/** key 为 className,值为 css 属性值对象的集合 */
declare type CSSStyleObject = Record<string, CSSProperty>;

/** key 为 动画名字,值为 CSSStyleObject 的动画集合  */
declare type KeyframeObject = Record<string, Record<string, CSSProperty>>;

/** 开启了shadowRoot的元素 */
declare type AttachedShadowRoot<T> = Omit<T, "shadowRoot"> & {
	shadowRoot: ShadowRoot;
};

// https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements
declare class CustomElement extends HTMLElement {
	static styleSheet?: CSSStyleSheet;
	static keyframesSheet?: CSSStyleSheet;
	/** 当 custom element首次被插入文档DOM时，被调用 */
	connectedCallback?() {}

	/** 当 custom element从文档DOM中删除时，被调用 */
	disconnectedCallback?() {}

	/** 当 custom element被移动到新的文档时，被调用 */
	adoptedCallback?() {}

	/** 需要监听的属性名称 */
	static observedAttributes?: string[];

	/** 当 custom element增加、删除、修改自身属性时，被调用 与 observedAttributes 配套使用 */
	attributeChangedCallback?(name: string, oldValue: string, newValue: string) {}
}

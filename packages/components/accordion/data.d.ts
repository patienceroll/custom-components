/** 单个手风琴折叠面板props */
export interface AccordionItemProps extends HTMLElement {
	/** 是否展开 */
	"open"?: BooleanCharacter;
	/** 是否禁用 */
	"disable"?: BooleanCharacter;
	/**
	 * 是否是手风琴面板控制下的第一个折叠面板,
	 * - 与 \<cp-accordion /> 联合使用,如果被 \<cp-accordion /> 包裹,此条属性会受控
	 */
	"first-item"?: BooleanCharacter;
	/**
	 * 是否是手风琴面板控制下的最后一个折叠面板,
	 * - 与 \<cp-accordion /> 联合使用,如果被 \<cp-accordion /> 包裹,此条属性会受控
	 */
	"last-item"?: BooleanCharacter;
	/** 当前折叠面板在折叠面板组下的key */
	"key": string;
}

/** 手风琴折叠面板props */
export interface AccordionProps extends HTMLElement {
	/** 受控状态,当前打开的折叠面板数组,值为JSON形式的数组字符串 */
	"active-keys": string;
}

/** 单个折叠面板自定义事件 */
export interface AccordionItemEventDetail {
	/** 单个折叠面板折叠事件 */
	"cp-accordion-item-fold": undefined;
	/** 单个折叠面板展开事件 */
	"cp-accordion-item-expand": undefined;
}

/** 折叠面板自定义事件 */
export interface AccordionEventDetail {
	change: {
		/** 当前展开的折叠面板 */
		"active-keys": string[];
		/** 当前操作的key */
		"current": string;
	};
}

/** 单个手风琴折叠面板属性变化的值 */
export type AccordionItemObservedAttributes = "open" | "disable" | "key" | "first-item" | "last-item";

/** 手风琴折叠面班监听变化的属性值 */
export type AccordionObservedAttributes = "active-keys";

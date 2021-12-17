export interface CpRateItemProps extends HTMLElement {
	/** 值为 0 ~ 100 的字符串 */
	"value"?: NumberCharacter;
	/** 单个评分的基础颜色 */
	"base-color"?: CSSProperty["color"];
	/** 点亮时的颜色 */
	"light-color"?: CSSProperty["color"];
	/** 是否是禁用的单个评分 */
	"disable"?: BooleanCharacter;
	/** 是否是只读的评分 */
	"readonly"?: BooleanCharacter;
}

export interface CpRateProps extends Pick<CpRateItemProps, "disable" | "readonly" | "base-color" | "light-color"> {
	/** 值为数字的字符串 */
	value?: NumberCharacter;
	/** 评分的精度,值不能大于单个评分所代表的值,不然会出现错误,默认5 */
	precision?: NumberCharacter;
	/** 评分最大值 */
	highest?: NumberCharacter;
}

/** rate item 监听的属性值 */
export type CpRateItemObservedAttributes = "value" | "base-color" | "light-color" | "disable" | "readonly";

/** rate 监听的属性 */
export type CpRateObservedAttributes =
	| "value"
	| "precision"
	| "highest"
	| "disable"
	| "readonly"
	| "base-color"
	| "light-color";

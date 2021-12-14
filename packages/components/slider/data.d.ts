export interface CpSliderProps extends HTMLElement {
	/** 不受控的默认值 */
	"default-value": NumberCharacter;
	"value": NumberCharacter;
	/** 最小值,默认为 0 */
	"min"?: NumberCharacter;
	/** 最大值,默认为 100 */
	"max"?: NumberCharacter;
	/** 评分的精度,默认为 1,值需要大于0 */
	"precision"?: NumberCharacter;
	/** 显示标签 */
	"show-label"?: BooleanCharacter;
}

export type CpSliderObservedAttributes = "value" | "precision" | "min" | "max";

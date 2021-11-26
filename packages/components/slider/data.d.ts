export interface CpSliderProps extends HTMLElement {
	value: NumberCharacter;
	/** 最小值,默认为 0 */
	min?: NumberCharacter;
	/** 最大值,默认为 100 */
	max?: NumberCharacter;
}

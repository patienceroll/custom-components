export type CpRadioObservedAttributes = 'checked' | 'name' | 'color';

export type CpRadioProps = {
	/** 是否选中 */
	'checked'?: BooleanCharacter;
	/** 是否默认选中 */
	'default-checked'?: BooleanCharacter;
	'name'?: string;
	/** 单选 icon 的颜色 */
	'color'?: string;
};

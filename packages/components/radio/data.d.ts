export type CpRadioObservedAttributes = 'checked' | 'name' | 'color';

export type CpRadioProps = {
	/** 是否选中 */
	'checked'?: BooleanCharacter;
	/** 是否默认选中 */
	'default-checked'?: BooleanCharacter;
	/** input[type="radio"] 的 name 属性 */
	'name'?: string;
	/** 单选 icon 的颜色 */
	'color'?: string;
	/** 单选框选中事件 (只能通过 addEventListener 监听) */
	'oncheck': (event: CustomEvent<true>) => void;
};

export type CpRadioGroupProps = {
	/** 是否默认选中 */
	'default-checked'?: string;
	/**
	 * input[type="radio"] 的 name 属性
	 * 会强制改变 dom 元素下所有 cp-radio 的 name 属性
	 */
	'name'?: string;
};

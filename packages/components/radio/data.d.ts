export interface CpRadioProps extends HTMLElement {
	/** 是否选中 */
	checked?: BooleanCharacter;
	/** 是否默认选中 */
	'default-checked'?: BooleanCharacter;
	/** input[type="radio"] 的 name 属性 */
	name?: string;
	/** 单选 icon 的颜色 */
	color?: string;
	/** 单选框选中事件 (只能通过 addEventListener 监听) */
	oncheck: (event: CustomEvent<true>) => void;
}

export interface CpRadioGroupProps extends HTMLElement {
	/** 是否默认选中 */
	'default-checked'?: string;
	/**
	 * input[type="radio"] 的 name 属性
	 * 会强制改变 dom 元素下所有 cp-radio 的 name 属性
	 */
	name?: string;
	/** 单选框值变化事件 */
	onchange: (event: CustomEvent<{ value: string }>) => void;
}

export interface CpRadioGroupEventDetail {
	change: {
		nativeEvent: Event;
		value: string | null;
	};
}

export interface CpRadioEventDetail {
	check: {
		checked: boolean;
		nativeEvent?: Event;
	};
}

export type CpRadioObservedAttributes = 'checked' | 'name' | 'color';

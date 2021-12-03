/** 圆环状进度组件 */
export interface CircularProgressProps extends HTMLElement {
	/** 进度条的颜色 */
	color?: CSSProperty["color"];
	/** 圆环状进度条百分比,值为0-100 */
	value?: NumberCharacter;
	/** 是否展示进度条文字进度label */
	label?: BooleanCharacter;
}

/** 环状进度条监听的属性值 */
export type CircularProgressObservedAttributes = "color" | "value" | "label";

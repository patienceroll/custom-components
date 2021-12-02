export interface CpPopoverProps {
	/** 悬浮气泡context位置,默认 top */
	'placement'?:
		| 'top'
		| 'left-start'
		| 'left-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right'
		| 'right-end';
	/** 禁用hover触发 */
	'disable-hover'?: BooleanCharacter;
	/** 禁用点击触发 */
	'disable-click'?: BooleanCharacter;
	/** 禁用聚焦触发 */
	'disable-focus'?: BooleanCharacter;
}

export type CpPopoverObservedAttributes = 'placement';

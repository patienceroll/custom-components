export interface CpPopoverProps {
	/** 悬浮气泡context位置,默认 bottom */
	placement?:
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
}

export type CpPopoverObservedAttributes = 'placement';

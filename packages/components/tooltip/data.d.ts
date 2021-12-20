import type { CpPopoverProps } from '../popover/data';

export interface CpTooltipProps extends CpPopoverProps {
	/** tooltip context 没有样式,自定义context的时候可以使用 */
	'no-style'?: BooleanCharacter;
	/** 是否展示箭头 */
	arrow: BooleanCharacter;
}

/** 单个手风琴折叠面板属性变化的值 */
export type AccordionItemObservedAttributes = 'open' | 'disable' | 'key' | 'first-item' | 'last-item';

/** 手风琴折叠面班监听变化的属性值 */
export type AccordionObservedAttributes = 'active-keys';

/** 单个手风琴折叠面板props */
export interface AccordionItemProps {
	open?: BooleanCharacter;
	disable?: BooleanCharacter;
}

/** 手风琴折叠面板props */
export interface AccordionProps {
	/** 受控状态,当前打开的折叠面板数组,值为JSON形式的数组字符串 */
	'active-keys': string;
}

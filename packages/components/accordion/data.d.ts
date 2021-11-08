/** button组件监听的属性变化的值 */
export type AccordionItemAttributes = 'open' | 'disable';

/** 手风琴折叠面板单项props */
export interface AccordionItemProps {
	open?: BooleanCharacter;
	disable?: BooleanCharacter;
}

/** button-base 属性 */
export interface ButtonBaseProps extends HTMLElement {
	'ripple-color'?: CSSProperty['color'];
	disable?: BooleanCharacter;
}

/** icon-button 属性 */
export type IconButtonProps = ButtonBaseProps;

/** button 属性 */
export interface ButtonProps extends ButtonBaseProps {
	loading?: BooleanCharacter;
	'loading-color'?: CSSProperty['color'];
}

/** button组件监听的属性变化的值 */
export type ButtonObservedAttributes = 'disable' | 'loading' | 'loading-color';

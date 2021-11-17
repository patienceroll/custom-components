/** button组件监听的属性变化的值 */
export type ButtonObservedAttributes = 'disable' | 'loading' | 'loading-color';

/** button 基础属性 */
export interface ButtonBaseProps {
	'ripple-color': CSSProperty['color'];
}

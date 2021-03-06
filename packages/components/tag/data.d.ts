export type TagType = 'success' | 'processing' | 'warning' | 'error';

export interface TagProps {
	color?: TagType | CSSStyleDeclaration['color'];
	/** 是否可关闭 */
	closable?: 'true';
	/**尺寸 */
	size: string;
	/**是否显示 */
	tagshow: 'true' | 'false';
	/** 图标标签 */
	closeicon?: 'true' | 'false';
	/** 受控状态下是否显示 */
	show?: 'true' | 'false';
	/** 是否展示纯色背景,默认false */
	'pure-background'?: 'true' | 'false';
	onclose?: (event: CustomEvent<{ nativeEvent: MouseEvent; show?: boolean }>) => void;
}

export type TagObservedAttributes =
	| 'color'
	| 'closable'
	| 'show'
	| 'pure-background'
	| 'onclose'
	| 'size'
	| 'closeicon'
	| 'tagshow';

export type TagCheckableObservedAttributes = 'color';

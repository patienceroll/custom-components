/** 纸张进度条监听的属性值 */
export type CpPaperObservedAttributes = '';

/** 纸张 Props */
export interface CpPaperProps {
	/**
	 * 变体
	 * 2. outlined  - 轮廓纸张
	 * 1. primary   - 阴影纸张(默认)
	 */
	variant?: 'outlined' | 'primary';
	/** 方形圆角,默认 false */
	square?: CharacterBoolean;
}

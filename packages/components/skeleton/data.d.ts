export type CpSkeletonObservedAttributes = 'width' | 'variant';

export type CpSkeletonProps = {
	/** 骨架屏条幅的宽度 */
	width?: string;
	/**
	 * 变体
	 * 1. text  - 文字骨架屏(默认)
	 * 2. circular  - 圆形骨架屏
	 * 3. rectangular - 方形骨架屏
	 */
	variant?: 'text' | 'circular' | 'rectangular';
};

export type CpSkeletonObservedAttributes = "width" | "variant" | "animation";

export interface CpSkeletonProps extends HTMLElement {
	/** 骨架屏条幅的宽度 */
	width?: string;
	/**
	 * 变体
	 * 1. text  - 文字骨架屏(默认)
	 * 2. circular  - 圆形骨架屏
	 * 3. rectangular - 方形骨架屏
	 */
	variant?: "text" | "circular" | "rectangular";
	/**
	 * 动画
	 * 1. wave	-	波浪(默认)
	 * 2. twinkle	-	闪烁
	 */
	animation?: "wave" | "twinkle";
}

/**
 * ### 获取HTML元素相对于body的left偏移
 */
export function getOffsetLeft(target: HTMLElement): number {
	const { offsetLeft, offsetParent } = target;
	if (offsetParent instanceof HTMLElement) return getOffsetLeft(offsetParent) + offsetLeft;
	return offsetLeft;
}

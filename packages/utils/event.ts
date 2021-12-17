/** ### 元素触发自定义事件
 * @param target 触发自定义事件的元素
 * @param type 触发自定义事件的类型
 * @param detail 自定义事件的detail
 * @param eventInit 自定义事件的初始化参数
 */
export function dispatchCustomEvent<DetailType>(
	target: HTMLElement,
	type: keyof DetailType,
	detail: DetailType[keyof DetailType],
	eventInit: EventInit = {}
) {
	target.dispatchEvent(new CustomEvent(type as string, { ...eventInit, detail }));
}

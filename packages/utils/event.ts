/** ### 元素触发自定义事件
 * @param target 触发自定义事件的元素
 * @param type 触发自定义事件的类型
 * @param detail 自定义事件的detail
 * @param eventInit 自定义事件的初始化参数
 */
export function dispatchCustomEvent<EventDetail>(
	target: HTMLElement,
	type: keyof EventDetail,
	detail: EventDetail[keyof EventDetail],
	eventInit: EventInit = {}
) {
	target.dispatchEvent(new CustomEvent(type as string, { ...eventInit, detail }));
}

/** ### 元素添加自定义事件监听器
 * @param target 监听自定义事件的元素
 * @param type 监听自定义事件的类型
 * @param Listener 自定义事件的函数
 * @param options addEventListener的 options 参数
 */
export function addCustomEventListener<EventDetail>(
	target: HTMLElement,
	type: keyof EventDetail,
	Listener: (event: CustomEvent<EventDetail[keyof EventDetail]>) => void,
	options?: boolean | AddEventListenerOptions
) {
	target.addEventListener(type as string, Listener as EventListenerOrEventListenerObject, options);
}

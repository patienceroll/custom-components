import { formatKeyframes, formatStyle } from "../utils/style";

/** 自定义组件样式装饰器 */
export function style(param: CSSStyleObject) {
	return function styledecorators(target: typeof CustomElement) {
		target.styleSheet = formatStyle(param);
	};
}

/** 自定义组件动画装饰器 */
export function keyframe(param: KeyframeObject) {
	return function styledecorators(target: typeof CustomElement) {
		target.keyframesSheet = formatKeyframes(param);
	};
}

/** 监听变化的属性值装饰器 */
export function watch<Target extends HTMLElement = HTMLElement>(
	watcher: Record<string, (this: Target, newer: string | null, older: string | null) => void>
) {
	return function (targetClass: typeof CustomElement) {
		targetClass.observedAttributes = Object.keys(watcher);
		targetClass.prototype.attributeChangedCallback = function (this: Target, attr, older, newer) {
			if (typeof watcher[attr] === "function") watcher[attr].apply(this, [newer, older]);
		};
	};
}

import { formatKeyframes, formatStyle } from '../utils/style';

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
export function watch<Attr extends string, Target extends HTMLElement = HTMLElement>(
	attr: Attr[],
	onAttrChange: (this: Target, attr: Attr, older: string | null, newer: string | null) => void
) {
	return function (target: typeof CustomElement) {
		target.observedAttributes = attr;
		target.prototype.attributeChangedCallback = onAttrChange;
	};
}

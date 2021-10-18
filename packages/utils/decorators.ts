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
export function watchAttr<T extends string>(param: {
	attr: T[];
	callback: (attr: T, older: string | null, newer: string | null) => void;
}) {
	return function (target: typeof CustomElement) {
		target.observedAttributes = param.attr;
		Object.defineProperty(target.prototype, 'attributeChangedCallback', {
			get() {
				return param.callback;
			},
		});
		console.dir(target);
		console.log((target as any).a);
	};
}

import { formatKeyframes, formatStyle } from '../utils/style';

/** 自定义组件样式装饰器 */
export function style(parma: CSSStyleObject) {
	return function styledecorators(target: any) {
		target.styleSheet = formatStyle(parma);
	};
}

/** 自定义组件动画装饰器 */
export function keyframe(parma: KeyframeObject) {
	return function styledecorators(target: any) {
		target.keyframesSheet = formatKeyframes(parma);
	};
}

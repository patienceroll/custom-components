import { formatKeyframes, formatStyle } from '../utils/style';

export function style(parma: CSSStyleObject) {
	return function styledecorators(target: any) {
		target.styleSheet = formatStyle(parma);
	};
}

export function keyframe(parma: KeyframeObject) {
	return function styledecorators(target: any) {
		target.keyframesSheet = formatKeyframes(parma);
	};
}

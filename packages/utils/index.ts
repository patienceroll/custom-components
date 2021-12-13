import AttrToNumber from "./attr-to-number";
import { formatStyle, formatKeyframes, disposeDomNodeStyle } from "./style";
import { style, keyframe, watch } from "./decorators";
import Stack from "./stack";
import useLatestCall from "./use-latest-call";
import defineCustomComponents from "./define-custom-components";
import setAttributes from "./set-attributes";
import { createHtmlElement, createSvgElement } from "./element";

const __default = {
	AttrToNumber,
	formatStyle,
	formatKeyframes,
	disposeDomNodeStyle,
	style,
	keyframe,
	watch,
	Stack,
	useLatestCall,
	defineCustomComponents,
	setAttributes,
	createHtmlElement,
	createSvgElement,
};

export {
	AttrToNumber,
	formatStyle,
	formatKeyframes,
	disposeDomNodeStyle,
	style,
	keyframe,
	watch,
	Stack,
	useLatestCall,
	defineCustomComponents,
	setAttributes,
	createHtmlElement,
	createSvgElement,
};

export default __default;

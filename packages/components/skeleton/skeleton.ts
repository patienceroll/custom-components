import { formatKeyframes, formatStyle } from '../../utils/style';

export default class CpSkeleton extends HTMLElement implements CustomElement {
	static style: CSSStyleObject = {
		'span': {
			display: 'block',
		},
		':host': {
			display: 'block',
		},
	};
	static styleSheet?: CSSStyleSheet;
	static keyframes: KeyframeObject = {};
	static keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (typeof CpSkeleton.styleSheet === 'undefined') CpSkeleton.styleSheet = formatStyle(CpSkeleton.style);
		if (typeof CpSkeleton.keyframesSheet === 'undefined')
			CpSkeleton.keyframesSheet = formatKeyframes(CpSkeleton.keyframes);
		shadowRoot.adoptedStyleSheets = [CpSkeleton.keyframesSheet, CpSkeleton.styleSheet];

		const span = document.createElement('span');
		shadowRoot.appendChild(span);
	}
}

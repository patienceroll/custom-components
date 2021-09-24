import { formatStyle } from '../../utils/style';

export default class CpSkeleton extends HTMLElement implements CustomElement {
	static style: CSSStyleObject = {};
	static styleSheet?: CSSStyleSheet;
	static keyframes: KeyframeObject = {};
	static keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (typeof CpSkeleton.styleSheet === 'undefined') CpSkeleton.styleSheet = formatStyle(CpSkeleton.style);
		const span = document.createElement('span');

		shadowRoot.appendChild(span);
	}
}

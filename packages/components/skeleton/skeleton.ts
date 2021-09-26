import type { CpSkeletonObservedAttributes } from './data';

import { formatKeyframes, formatStyle } from '../../utils/style';

export default class CpSkeleton extends HTMLElement implements CustomElement {
	#style: CSSStyleObject = {
		'span': {
			display: 'block',
			height: '1.2em',
			backgroundColor: 'rgba(0, 0, 0, 0.11);',
			transform: 'scale(1,0.6)',
			borderRadius: '4px / 8px',
		},
		':host': {
			display: 'block',
		},
	};
	#styleSheet?: CSSStyleSheet;
	#keyframes: KeyframeObject = {};
	#keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);
		shadowRoot.adoptedStyleSheets = [this.#keyframesSheet, this.#styleSheet];

		const span = document.createElement('span');
		shadowRoot.appendChild(span);
	}

	get a() {
		return async function b() {};
	}

	static observedAttributes: CpSkeletonObservedAttributes[] = ['width'];
	attributeChangedCallback(
		this: AttachedShadowRoot<CpSkeleton>,
		attr: CpSkeletonObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		switch (attr) {
			case 'width':
				const span = this.shadowRoot.firstElementChild as HTMLSpanElement;
				if (newer) span.style.setProperty('width', newer);
				else span.style.removeProperty('width');
				break;
			case 'variant':
				break;
			default:
				break;
		}
	}
}

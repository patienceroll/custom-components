import type { CpSkeletonObservedAttributes } from './data';

import { formatKeyframes, formatStyle } from '../../utils/style';

export default class CpSkeleton extends HTMLElement implements CustomElement {
	#style: CSSStyleObject = {
		'.cp-skeleton-wave': {
			backgroundImage: 'linear-gradient(to right,transparent 0%,#eee 25%,transparent 50%)',
			animation: 'wave 2000ms linear infinite',
			backgroundSize: '200% 100%',
		},
		'.cp-skeleton-twinkle': {
			animation: 'twinkle 2000ms ease infinite',
		},
		'.cp-skeleton-rectangular': {
			transform: 'scale(1)',
			borderRadius: '4px',
		},
		'.cp-skeleton-circular': {
			transform: 'scale(1)',
			borderRadius: '50%',
		},
		'.cp-skeleton': {
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
	#keyframes: KeyframeObject = {
		wave: {
			from: {
				backgroundPositionX: '100%',
			},
			to: {
				backgroundPositionX: '-100%',
			},
		},
		twinkle: {
			'0%': {
				opacity: '1',
			},
			'50%': {
				opacity: '0.5',
			},
			'100%': {
				opacity: '1',
			},
		},
	};
	#keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);
		shadowRoot.adoptedStyleSheets = [this.#keyframesSheet, this.#styleSheet];

		const span = document.createElement('span');
		span.classList.add('cp-skeleton');
		shadowRoot.appendChild(span);
	}

	static observedAttributes: CpSkeletonObservedAttributes[] = ['width', 'variant', 'animation'];
	attributeChangedCallback(
		this: AttachedShadowRoot<CpSkeleton>,
		attr: CpSkeletonObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		const span = this.shadowRoot.firstElementChild as HTMLSpanElement;
		switch (attr) {
			case 'width':
				if (newer) span.style.setProperty('width', newer);
				else span.style.removeProperty('width');
				break;
			case 'variant':
				if (newer === 'circular') {
					const width = this.getAttribute('width');
					span.style.setProperty('height', width || `${span.clientWidth}px`);
					span.classList.remove('cp-skeleton-rectangular');
					span.classList.add('cp-skeleton-circular');
				} else if (newer === 'rectangular') {
					span.style.removeProperty('height');
					span.classList.remove('cp-skeleton-circular');
					span.classList.add('cp-skeleton-rectangular');
				} else {
					// 默认为 text
					span.style.removeProperty('height');
					span.classList.remove('cp-skeleton-circular', 'cp-skeleton-rectangular');
				}
				break;
			case 'animation':
				if (newer === 'wave') {
					span.classList.remove('cp-skeleton-twinkle');
					span.classList.add('cp-skeleton-wave');
				} else if (newer === 'twinkle') {
					span.classList.remove('cp-skeleton-wave');
					span.classList.add('cp-skeleton-twinkle');
				} else {
					span.classList.remove('cp-skeleton-wave cp-skeleton-twinkle');
				}
				break;
			default:
				break;
		}
	}
}

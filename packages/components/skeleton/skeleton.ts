import { style, keyframe, watch } from '../../utils';

@style({
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
})
@keyframe({
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
})
@watch<AttachedShadowRoot<CpSkeleton>>({
	width(newer) {
		if (newer) this.skeleton.style.setProperty('width', newer);
		else this.skeleton.style.removeProperty('width');
	},
	variant(newer) {
		if (newer === 'circular') {
			this.skeleton.style.setProperty('height', `${this.skeleton.clientWidth}px`);
			this.skeleton.classList.remove('cp-skeleton-rectangular');
			this.skeleton.classList.add('cp-skeleton-circular');
		} else if (newer === 'rectangular') {
			this.skeleton.style.removeProperty('height');
			this.skeleton.classList.remove('cp-skeleton-circular');
			this.skeleton.classList.add('cp-skeleton-rectangular');
		} else {
			// 默认为 text
			this.skeleton.style.removeProperty('height');
			this.skeleton.classList.remove('cp-skeleton-circular', 'cp-skeleton-rectangular');
		}
	},
	animation(newer) {
		if (newer === 'wave') {
			this.skeleton.classList.remove('cp-skeleton-twinkle');
			this.skeleton.classList.add('cp-skeleton-wave');
		} else if (newer === 'twinkle') {
			this.skeleton.classList.remove('cp-skeleton-wave');
			this.skeleton.classList.add('cp-skeleton-twinkle');
		} else {
			this.skeleton.classList.remove('cp-skeleton-wave cp-skeleton-twinkle');
		}
	},
})
export default class CpSkeleton extends HTMLElement implements CustomElement {
	/** skeleton , html 为 span 元素 */
	skeleton: HTMLSpanElement;
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpSkeleton.keyframesSheet, CpSkeleton.styleSheet];

		const skeleton = document.createElement('span');

		this.skeleton = skeleton;
		skeleton.classList.add('cp-skeleton');

		shadowRoot.appendChild(skeleton);
	}
}

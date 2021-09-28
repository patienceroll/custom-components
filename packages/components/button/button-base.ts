import type Ripple from '../ripple/ripple';

import theme from '../../theme/index';
import { formatKeyframes, formatStyle } from 'packages/utils/style';

import '../ripple';

export default class CpButtonBase extends HTMLElement implements CustomElement {
	private rippleItem?: ReturnType<Ripple['spread']>;
	/** 组件 button Dom元素 */
	button: HTMLButtonElement;
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-button:hover': {
			backgroundColor: theme.color.backgroundHover,
			boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
		},
		'.cp-button': {
			display: 'flex',
			alignItems: 'center',
			padding: '6px 12px',
			border: 'none',
			position: 'relative',
			outline: '0',
			userSelect: 'none',
			cursor: 'pointer',
			width: '100%',
			height: '100%',
			backgroundColor: theme.color.background,
			borderRadius: 'inherit',
			boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
			transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
		},
		':host([disable="true"])': {
			pointerEvents: 'none',
		},
		':host': {
			borderRadius: theme.border.radius,
			display: 'inline-block',
		},
	};
	#keyframes: KeyframeObject = {};

	constructor() {
		super();

		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [this.#keyframesSheet, this.#styleSheet];

		const button = document.createElement('button');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;

		this.button = button;
		button.classList.add('cp-button');
		button.setAttribute('part', 'button');

		this.addEventListener('mousedown', (e) => {
			if (this.rippleItem) this.rippleItem.then(({ stable }) => stable());
			this.rippleItem = ripple.spread({ top: e.offsetY, left: e.offsetX });
		});
		this.addEventListener('mouseup', () => {
			if (this.rippleItem) {
				this.rippleItem.then(({ stable }) => stable());
				this.rippleItem = undefined;
			}
		});
		this.addEventListener(
			'touchstart',
			(e) => {
				if (e.targetTouches.length !== 1) return;
				if (e.cancelable) {
					const { targetTouches, target } = e;
					if (target) {
						const [touch] = targetTouches;
						const { pageX, pageY } = touch;
						const { left, top } = (target as this).getBoundingClientRect();
						if (this.rippleItem) this.rippleItem.then(({ stable }) => stable());
						this.rippleItem = ripple.spread({
							top: pageY - top,
							left: pageX - left,
						});
					}
				}
			},
			{ passive: true }
		);
		this.addEventListener('touchend', () => {
			if (this.rippleItem) {
				this.rippleItem.then(({ stable }) => stable());
				this.rippleItem = undefined;
			}
		});

		button.appendChild(ripple);
		shadowRoot.appendChild(button);
	}
}

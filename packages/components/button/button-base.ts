import type Ripple from '../ripple/ripple';

import theme from '../../theme/index';
import { formatKeyframes, formatStyle } from 'packages/utils/style';

import '../ripple';

export default class CpButtonBase extends HTMLElement implements CustomElement {
	private rippleItem?: ReturnType<Ripple['start']>;
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
			borderRadius: theme.border.radius,
			boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
			transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
		},
		':host([disable="true"])': {
			pointerEvents: 'none',
		},
		':host': {
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
		button.classList.add('cp-button');
		button.setAttribute('part', 'button');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;

		button.addEventListener('mousedown', (e) => {
			if (this.rippleItem) this.rippleItem.then(({ stop }) => stop());
			this.rippleItem = ripple.start({ top: e.offsetY, left: e.offsetX });
		});
		button.addEventListener('mouseup', (event) => {
			if (this.rippleItem) {
				this.rippleItem.then(({ stop }) => stop());
				this.rippleItem = undefined;
			}
			this.dispatchEvent(
				new CustomEvent('click', {
					detail: {
						domEvent: event,
					},
				})
			);
		});
		button.addEventListener(
			'touchstart',
			(e) => {
				if (e.targetTouches.length !== 1) return;
				if (e.cancelable) {
					const { targetTouches, target } = e;
					if (target) {
						const [touch] = targetTouches;
						const { pageX, pageY } = touch;
						const { left, top } = (target as this).getBoundingClientRect();
						if (this.rippleItem) this.rippleItem.then(({ stop }) => stop());
						this.rippleItem = ripple.start({
							top: pageY - top,
							left: pageX - left,
						});
					}
				}
			},
			{ passive: true }
		);
		button.addEventListener('touchend', (event) => {
			if (this.rippleItem) {
				this.rippleItem.then(({ stop }) => stop());
				this.rippleItem = undefined;
			}
			this.dispatchEvent(
				new CustomEvent('click', {
					detail: {
						domEvent: event,
					},
				})
			);
		});

    button.appendChild(ripple)
		shadowRoot.appendChild(button);
	}
}

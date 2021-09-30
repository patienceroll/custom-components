import type Ripple from '../ripple/ripple';

import { style } from '../../utils/decorators';

import '../ripple';

@style({
	'.cp-button:hover': {
		backgroundColor: '#c0c0c0',
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
		backgroundColor: '#e0e0e0',
		borderRadius: 'inherit',
		boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
		transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
	},
	':host([disable="true"])': {
		pointerEvents: 'none',
	},
	':host': {
		borderRadius: '4px',
		display: 'inline-block',
	},
})
export default class CpButtonBase extends HTMLElement implements CustomElement {
	private ripple?: ReturnType<Ripple['spread']>;
	/** 组件 button Dom元素 */
	button: HTMLButtonElement;
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpButtonBase.styleSheet];

		const button = document.createElement('button');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;

		this.button = button;
		button.classList.add('cp-button');
		button.setAttribute('part', 'button');

		this.addEventListener('mousedown', (e) => {
			if (this.ripple) this.ripple.stable();
			this.ripple = ripple.spread({ top: e.offsetY, left: e.offsetX });
		});
		this.addEventListener('mouseup', () => {
			if (this.ripple) {
				this.ripple.stable();
				this.ripple = undefined;
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
						if (this.ripple) this.ripple.stable();
						this.ripple = ripple.spread({
							top: pageY - top,
							left: pageX - left,
						});
					}
				}
			},
			{ passive: true }
		);
		this.addEventListener('touchend', () => {
			if (this.ripple) {
				this.ripple.stable();
				this.ripple = undefined;
			}
		});

		button.appendChild(ripple);
		shadowRoot.appendChild(button);
	}
}

import Ripple from '../ripple/ripple';

import { style } from '../../utils/index';

if (!customElements.get('cp-ripple')) customElements.define('cp-ripple', Ripple);
@style({
	'.cp-button:hover': {
		backgroundColor: '#c0c0c0',
		boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
	},
	'.cp-button': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '0.375em 0.75em',
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
		borderRadius: '0.25em',
		display: 'inline-block',
		fontSize: '16px',
	},
})
export default class CpButtonBase extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 当前所有涟漪的集合 */
	private ripple = new Set<ReturnType<Ripple['spread']>>();
	/** 组件 button Dom元素 */
	public button: HTMLButtonElement;
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
			this.ripple.add(ripple.spread({ top: e.offsetY, left: e.offsetX, backgroundColor: this.rippleColor }));
		});
		this.addEventListener('mouseup', this.stableRipples);
		/** 如果点击之后,鼠标拖到其他元素去,则不会触发mouseup,此时也清除ripple */
		this.addEventListener('mouseleave', this.stableRipples);
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
						this.ripple.add(
							ripple.spread({
								top: pageY - top,
								left: pageX - left,
								backgroundColor: this.rippleColor,
							})
						);
					}
				}
			},
			{ passive: true }
		);
		this.addEventListener('touchend', this.stableRipples);

		button.appendChild(ripple);
		shadowRoot.appendChild(button);
	}

	/** 清除掉当前button产生的涟漪 */
	stableRipples() {
		this.ripple.forEach((ripple) => {
			ripple.stable();
		});
		this.ripple.clear();
	}

	/** 涟漪的颜色 */
	get rippleColor() {
		return this.getAttribute('ripple-color') || undefined;
	}
}

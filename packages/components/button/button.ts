import type { ButtonObservedAttributes } from './data';

import CpButtonBase from './button-base';

import theme from '../../theme/index';
import { formatStyle, formatKeyframes } from '../../utils/style';

import '../ripple';
import '../circular-progress';

export default class CpButton extends CpButtonBase {
	#styleSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-button-loading > rect': {
			animation: 'loading 2s linear infinite',
		},
		'.cp-button-loading': {
			display: 'none',
			position: 'absolute',
			left: '0',
			top: '0',
			width: '100%',
			height: '100%',
		},
		'.cp-button-disabled': {
			boxShadow: 'none',
		},
	};

	#keyframes: KeyframeObject = {
		loading: {
			'0%': {
				strokeDasharray: '0% 400%',
				strokeDashoffset: '0',
			},
			'100%': {
				strokeDasharray: '400% 400%',
				strokeDashoffset: '-400%',
			},
		},
	};
	#keyframesSheet?: CSSStyleSheet;

	constructor() {
		super();

		const { shadowRoot } = this as AttachedShadowRoot<CpButtonBase>;
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);

		shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, this.#keyframesSheet, this.#styleSheet];

		const button = shadowRoot.firstElementChild as HTMLButtonElement;
		const textWrapper = document.createElement('span');
		const text = document.createElement('slot');
		const leftIcon = document.createElement('slot');
		const rightIcon = document.createElement('slot');
		const loading = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		loading.innerHTML = `<rect x="1"  y="1" rx="4" ry="4"  width="calc(100% - 2px)" height="calc(100% - 2px)" stroke-width="2" stroke="${theme.color.primary}" fill="none" />`;
		loading.classList.add('cp-button-loading');
		leftIcon.setAttribute('part', 'left-icon');
		rightIcon.setAttribute('part', 'right-icon');
		loading.setAttribute('part', 'loading');
		leftIcon.name = 'left-icon';
		rightIcon.name = 'right-icon';

		textWrapper.append(leftIcon, text, rightIcon);
		button.append(textWrapper, loading);
	}

	static observedAttributes: ButtonObservedAttributes[] = ['disable', 'loading', 'loading-color'];
	attributeChangedCallback(
		this: AttachedShadowRoot<CpButton>,
		attr: ButtonObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		switch (attr) {
			case 'disable':
				const button = this.shadowRoot.firstElementChild as HTMLButtonElement;
				if (newer === 'true') button.classList.add('cp-button-disabled');
				else button.classList.remove('cp-button-disabled');
				break;
			case 'loading':
				const loading = this.shadowRoot.querySelector('svg[part="loading"]') as SVGAElement;
				if (newer === 'true') {
					this.style.setProperty('pointer-events', 'none');
					loading.style.display = 'block';
				} else {
					this.style.removeProperty('pointer-events');
					loading.style.display = 'none';
				}
				break;
			case 'loading-color':
				const loadingRect = (this.shadowRoot.querySelector('svg[part="loading"]') as SVGAElement)
					.firstElementChild as SVGRectElement;
				loadingRect.setAttribute('stroke', newer || theme.color.primary);
				break;
			default:
				break;
		}
	}
	connectedCallback() {}
}

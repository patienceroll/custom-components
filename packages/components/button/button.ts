import { style, keyframe, watch, setAttributes, createHtmlElement, createSvgElement } from '../../utils';

import CpButtonBase from './button-base';

import '../ripple';
import '../circular-progress';

@style({
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
})
@keyframe({
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
})
@watch<AttachedShadowRoot<CpButton>>({
	disable(newer) {
		if (newer === 'true') this.button.classList.add('cp-button-disabled');
		else this.button.classList.remove('cp-button-disabled');
	},
	loading(newer) {
		if (newer === 'true') {
			this.style.setProperty('pointer-events', 'none');
			this.loading.style.display = 'block';
		} else {
			this.style.removeProperty('pointer-events');
			this.loading.style.display = 'none';
		}
	},
	'loading-color'(newer) {
		(this.loading.firstElementChild as SVGRectElement).setAttribute('stroke', newer || '#1976d2');
	},
	'ripple-color'(newer) {
		if (newer) this.cpRipple.setAttribute('ripple-color', newer);
		else this.cpRipple.removeAttribute('ripple-color');
	},
})
export default class CpButton extends CpButtonBase {
	/** 组件 loading(加载中动画) Dom元素  */
	public loading: SVGElement;
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		const { shadowRoot } = this as AttachedShadowRoot<CpButtonBase>;
		shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, CpButton.keyframesSheet, CpButton.styleSheet];

		const textWrapper = createHtmlElement('span');
		const text = createHtmlElement('slot');
		const leftIcon = createHtmlElement('slot');
		const rightIcon = createHtmlElement('slot');
		this.loading = createSvgElement('svg');

		this.loading.innerHTML =
			'<rect x=\'1\'  y=\'1\' rx=\'4\' ry=\'4\'  width=\'calc(100% - 2px)\' height=\'calc(100% - 2px)\' stroke-width=\'2\' stroke=\'#1976d2\' fill=\'none\' />';
		this.loading.classList.add('cp-button-loading');

		setAttributes(leftIcon, { part: 'left-icon', name: 'left-icon' });
		setAttributes(rightIcon, { part: 'right-icon', name: 'right-icon' });
		setAttributes(this.loading, { part: 'loading' });

		textWrapper.append(leftIcon, text, rightIcon);
		this.button.append(textWrapper, this.loading);
	}
}

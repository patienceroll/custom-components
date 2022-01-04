import { style, keyframe, watch, setAttributes, createSvgElement } from '../../utils';

@style({
	'.cp-circular-svg > text': {
		dominantBaseline: 'middle',
		textAnchor: 'middle',
		transform: 'rotate(90deg)',
		transformOrigin: 'center center',
	},
	'.cp-circular-svg > circle': {
		animation: 'circle-dash 1.4s ease-in-out infinite',
		strokeDasharray: '0px 127px',
		strokeDashoffset: '0',
		transition: 'stroke-dasharray ease 300ms',
	},
	'.cp-circular-svg': {
		width: '100%',
		height: '100%',
		animation: 'svg-rotate 1.4s ease-in-out infinite',
		transform: 'rotate(-90deg)',
	},
	':host': {
		display: 'block',
	},
})
@keyframe({
	'circle-dash': {
		'0%': {
			strokeDasharray: '1px 127px',
			strokeDashoffset: '0',
		},
		'50%': {
			strokeDasharray: '70px 127px',
			strokeDashoffset: '-15px',
		},
		'100%': {
			strokeDasharray: '127px 127px',
			strokeDashoffset: '-127px',
		},
	},
	'svg-rotate': {
		'0%': {
			transformOrigin: 'center',
			transform: 'rotate(-90deg)',
		},
		'100%': {
			transform: 'rotate(270deg)',
		},
	},
})
@watch<AttachedShadowRoot<CpCircularProgress>>({
	color(newer) {
		this.cpCircle.setAttribute('stroke', newer || '#1976d2');
	},
	value(newer) {
		if (newer) {
			this.cpSvg.style.setProperty('animation', 'none');
			this.cpCircle.style.setProperty('animation', 'none');
			let value = Number(newer);
			if (Number.isNaN(value)) value = 0;
			else if (value < 0) value = 0;
			else if (value > 100) value = 100;
			this.cpText.innerHTML = `${value}%`;
			this.cpCircle.style.setProperty('stroke-dasharray', `${(value / 100) * 127}px 127px`);
		} else {
			this.cpText.innerHTML = '';
			this.cpSvg.style.removeProperty('animation');
			this.cpCircle.style.removeProperty('animation');
		}
	},
	label(newer) {
		if (newer === 'true') this.cpText.removeAttribute('display');
		else this.cpText.setAttribute('display', 'none');
	},
})
export default class CpCircularProgress extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	/** svg里面圆环包围的文字 */
	public cpText: SVGTextElement;

	/** svg里面的圆环 */
	public cpCircle: SVGCircleElement;

	/**  圆环组件的 svg 画布 */
	public cpSvg: SVGElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpCircularProgress.keyframesSheet, CpCircularProgress.styleSheet];

		this.cpSvg = createSvgElement('svg');
		/** 字符串形式为: <text x="22" display="none" y="22" font-size="12" color="#fff"></text> */
		this.cpText = createSvgElement('text');
		/** 字符串形式为: <circle cx="22" cy="22" r="20.2" stroke="#1976d2" stroke-width="3.6" fill="none"></circle> */
		this.cpCircle = createSvgElement('circle');

		setAttributes(this.cpText, {
			x: '22',
			y: '22',
			display: 'none',
			color: '#fff',
			'font-size': '12',
		});
		setAttributes(this.cpCircle, {
			cx: '22',
			cy: '22',
			r: '20.2',
			stroke: '#1976d2',
			fill: 'none',
			'stroke-width': '3.6',
		});
		setAttributes(this.cpSvg, { class: 'cp-circular-svg', viewBox: '0 0 44 44' });

		this.cpSvg.append(this.cpCircle, this.cpText);
		shadowRoot.appendChild(this.cpSvg);
	}
}

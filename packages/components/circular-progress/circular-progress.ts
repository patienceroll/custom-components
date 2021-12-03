import type { CircularProgressObservedAttributes } from './data';

import { style, keyframe, watch } from '../../utils/index';

const circle = `<circle cx="22" cy="22" r="20.2" stroke="#1976d2" stroke-width="3.6" fill="none">
</circle>`;
const text = `<text x="22" display="none" y="22" font-size="12" color="#fff">
</text>`;
const svg = `<svg class="cp-circular-svg" viewBox="0 0 44 44">
	${circle}
	${text}
</svg>`;

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
@watch<CircularProgressObservedAttributes, AttachedShadowRoot<CpCircularProgress>>(
	['color', 'value', 'label'],
	function (attr, older, newer) {
		const svg = this.shadowRoot.firstElementChild as SVGAElement;
		const circle = svg.firstElementChild as SVGCircleElement;
		const text = svg.lastElementChild as SVGTextElement;
		switch (attr) {
			case 'color':
				circle.setAttribute('stroke', newer || '#1976d2');
				break;
			case 'value':
				if (newer) {
					svg.style.setProperty('animation', 'none');
					circle.style.setProperty('animation', 'none');
					let value = Number(newer);
					if (Number.isNaN(value)) value = 0;
					else if (value < 0) value = 0;
					else if (value > 100) value = 100;
					text.innerHTML = `${value}%`;
					circle.style.setProperty('stroke-dasharray', `${(value / 100) * 127}px 127px`);
				} else {
					text.innerHTML = '';
					svg.style.removeProperty('animation');
					circle.style.removeProperty('animation');
				}
				break;
			case 'label':
				if (newer === 'true') text.removeAttribute('display');
				else text.setAttribute('display', 'none');
				break;
			default:
				break;
		}
	}
)
export default class CpCircularProgress extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpCircularProgress.keyframesSheet, CpCircularProgress.styleSheet];
		shadowRoot.innerHTML = svg;
	}
}

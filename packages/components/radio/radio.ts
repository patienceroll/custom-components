import type { CpRadioObservedAttributes } from './data';
import type Ripple from '../ripple/ripple';

import { style, watch } from '../../utils/decorators';

import '../ripple';

@style({
	'.inner-checked': {
		fill: '#1976d2',
		transform: 'scale(1)',
	},
	'.outer-checked': {
		stroke: '#1976d2',
	},
	'.inner': {
		fill: '#999',
		transform: 'scale(0)',
		transition: 'transform 300ms ease',
		transformOrigin: 'center',
	},
	'.outer': {
		stroke: '#999',
		fill: 'none',
		strokeWidth: '8',
	},
	'.cp-radio-icon': {
		width: '100%',
		height: '100%',
	},
	'.cp-radio-radio-wrap > input': {
		opacity: '0',
		position: 'absolute',
		zIndex: '1',
		width: '100%',
		height: '100%',
		margin: '0',
		top: '0',
		left: '0',
		cursor: 'pointer',
	},
	'.cp-radio-radio-wrap:hover': {
		backgroundColor: '#e9e9e9',
	},
	'.cp-radio-radio-wrap': {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		padding: '0.4em',
		width: '1.2em',
		height: '1.2em',
		verticalAlign: 'middle',
		borderRadius: '50%',
	},
	'.cp-radio-label > slot': {
		display: 'inline-block',
		verticalAlign: 'middle',
	},
	'.cp-radio-label': {
		display: 'inline-block',
		cursor: 'pointer',
	},
	':host([disabled="true"])': {
		pointerEvents: 'none',
	},
	':host': {
		display: 'inline-block',
	},
})
@watch<CpRadioObservedAttributes, AttachedShadowRoot<CpRadio>>(
	['checked', 'name'],
	function (
		this: AttachedShadowRoot<CpRadio>,
		attr: CpRadioObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		switch (attr) {
			case 'checked':
				const { firstElementChild: outerCircle, lastElementChild: innerCircle } = this.radioIcon as unknown as {
					firstElementChild: SVGCircleElement;
					lastElementChild: SVGCircleElement;
				};
				if (newer === 'true') {
					this.radio.checked = true;
					outerCircle.classList.add('outer-checked');
					innerCircle.classList.add('inner-checked');

					if (older !== 'true') {
						const event = new CustomEvent<{ checked: true }>('check', { detail: { checked: true }, bubbles: true });
						this.dispatchEvent(event);
					}
				} else {
					this.radio.checked = false;
					outerCircle.classList.remove('outer-checked');
					innerCircle.classList.remove('inner-checked');
				}
				break;
			case 'name':
				if (newer) this.radio.name = newer;
				else this.radio.removeAttribute('name');
				break;
			default:
				break;
		}
	}
)
export default class CpRadio extends HTMLElement implements CustomElement {
	/** 组件实例 input 元素 */
	radio: HTMLInputElement;
	/** 组件实例 svg 元素,用来模拟原生的 radio 的图标 */
	radioIcon: SVGSVGElement;
	static styleSheet: CSSStyleSheet;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.adoptedStyleSheets = [CpRadio.styleSheet];

		const label = document.createElement('label');
		const radioWrap = document.createElement('span');
		const radio = document.createElement('input');
		const ripple = document.createElement('cp-ripple') as AttachedShadowRoot<Ripple>;
		const radioIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const textSlot = document.createElement('slot');

		radioIcon.setAttribute('viewBox', '0 0 100 100');
		radioIcon.innerHTML = `<circle class="outer" cx="50" cy="50" r="42" />
			<circle class="inner" cx="50" cy="50" r="28"  />
		`;

		radioIcon.classList.add('cp-radio-icon');
		label.classList.add('cp-radio-label');
		radioWrap.classList.add('cp-radio-radio-wrap');

		radio.type = 'radio';

		this.addEventListener('click', () => {
			if (this.getAttribute('checked') !== 'true') {
				this.setAttribute('checked', 'true');
			}
		});

		radioWrap.addEventListener('click', () => {
			const { stable } = ripple.spread({
				top: radioWrap.clientHeight / 2,
				left: radioWrap.clientWidth / 2,
			});
			stable();
		});

		radioWrap.append(radio, ripple, radioIcon);
		label.append(radioWrap, textSlot);
		shadowRoot.append(label);

		this.radio = radio;
		this.radioIcon = radioIcon;
	}

	connectedCallback() {
		if (this.getAttribute('default-checked') === 'true') {
			this.setAttribute('checked', 'true');
		}
	}
}

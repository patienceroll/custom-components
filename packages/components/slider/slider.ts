import { style } from '../../utils/decorators';

@style({
	'.cp-slider-block:active .cp-slider-block-shadow': {
		transform: 'translate(-50%,-50%) scale(1)',
	},
	'.cp-slider-block:hover .cp-slider-block-shadow': {
		transform: 'translate(-50%,-50%) scale(0.77)',
	},
	'.cp-slider-block-shadow': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: 'inherit',
		height: 'inherit',
		transform: 'translate(-50%,-50%) scale(0)',
		backgroundColor: 'currentColor',
		opacity: '0.2',
		transition: 'transform 200ms ease ',
		borderRadius: '50%',
	},
	'.cp-slider-block-core': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		width: '1.25em',
		height: '1.25em',
		backgroundColor: 'currentColor',
		borderRadius: '50%',
	},
	'.cp-slider-block': {
		position: 'absolute',
		top: '50%',
		left: '0',
		width: '2.625em',
		height: '2.625em',
		transform: 'translate(-50%,-50%)',
		transition: 'left 300ms ease',
	},
	'.cp-slider-tracked': {
		height: '0.375em',
		width: '0',
		opacity: '1',
		transition: 'width 300ms ease',
	},
	'.cp-slider-rail,.cp-slider-tracked': {
		position: 'absolute',
		width: '100%',
		height: '0.25em',
		backgroundColor: 'currentColor',
		borderRadius: '0.25em',
		left: '0',
		top: '50%',
		transform: 'translateY(-50%)',
		opacity: '0.38',
	},
	':host': {
		display: 'inline-block',
		height: '1.875em',
		position: 'relative',
		fontSize: '16px',
		cursor: 'pointer',
		color: '#1976d2',
	},
})
export default class CpSlider extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	/** 滑块轨道 */
	public sliderRail: HTMLSpanElement;
	/** 滑块占有的轨道 */
	public sliderTracked: HTMLSpanElement;
	/** 滑块的操作块 */
	public sliderBlock: HTMLSpanElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpSlider.styleSheet];

		this.sliderRail = document.createElement('span');
		this.sliderTracked = document.createElement('span');
		this.sliderBlock = document.createElement('span');

		this.sliderRail.classList.add('cp-slider-rail');
		this.sliderTracked.classList.add('cp-slider-tracked');
		this.sliderBlock.classList.add('cp-slider-block');

		this.sliderBlock.innerHTML = `<div class="cp-slider-block-shadow"></div><div class="cp-slider-block-core"></div>`;

		this.addEventListener('click', (event) => {
			this.sliderTracked.style.width = `${(event.offsetX / this.clientWidth) * 100}%`;
			this.sliderBlock.style.left = `${event.offsetX}px`;
		});

		this.sliderBlock.draggable = true;

		this.sliderBlock.addEventListener('drag', (event) => {
			console.log('drag', event);
		});

		shadowRoot.append(this.sliderRail, this.sliderTracked, this.sliderBlock);
	}
}

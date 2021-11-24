import { style } from '../../utils/decorators';

@style({
	'.cp-slider-tracked': {
		position: 'absolute',
		height: '0.375em',
		width: '0',
		opacity: '1',
		transition: 'width 300ms ease',
	},
	'.cp-slider-rail,.cp-slider-tracked': {
		position: 'absolute',
		width: '100%',
		height: '0.25em',
		backgroundColor: '#1976d2',
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
	},
})
export default class CpSlider extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	/** 滑块轨道 */
	public sliderRail: HTMLSpanElement;
	/** 滑块占有的轨道 */
	public sliderTracked: HTMLSpanElement;

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpSlider.styleSheet];

		this.sliderRail = document.createElement('span');
		this.sliderTracked = document.createElement('span');

		this.sliderRail.classList.add('cp-slider-rail');
		this.sliderTracked.classList.add('cp-slider-tracked');

		this.addEventListener('click', (event) => {
			this.sliderTracked.style.width = `${(event.offsetX / this.clientWidth) * 100}%`;
		});

		shadowRoot.append(this.sliderRail, this.sliderTracked);
	}
}

import { style } from '../../utils/decorators';

@style({})
export default class CpSlider extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
	}
}

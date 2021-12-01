import { style } from '../../utils/index';

@style({
	':host': {
		display: 'inline-block',
		position: 'relative',
	},
})
export default class CpTooltip extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTooltip.styleSheet];

		const children = document.createElement('slot');

		const tipWraaper = document.createElement('span');
		const tip = document.createElement('slot');

		tipWraaper.appendChild(tip);
		shadowRoot.append(children, tipWraaper);
	}
}

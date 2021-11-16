import { style } from '../../utils/decorators';

@style({
	':host': {
		display: 'block',
		fontSize: '16px',
		padding: '1.5em',
	},
})
export default class CpTabPanel extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpTabPanel.styleSheet];

		const children = document.createElement('slot');
		shadowRoot.append(children);
	}
}

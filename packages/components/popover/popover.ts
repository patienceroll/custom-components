import { style } from '../../utils/index';

@style({
	':host([placement="top"]) .cp-popover-context-wrapper': {
		left: '50%',
		top: '0',
		bottom: 'unset',
		transform: 'translate(-50%,calc(-100% - 0.625em))',
	},
	':host([placement="bottom-end"]) .cp-popover-context-wrapper': {
		left: 'unset',
		right: '0',
		transform: 'translate(0,calc(100% + 0.625em))',
	},
	':host([placement="bottom-start"]) .cp-popover-context-wrapper': {
		left: '0',
		transform: 'translate(0,calc(100% + 0.625em))',
	},
	'.cp-popover-context-wrapper': {
		position: 'absolute',
		bottom: '0',
		left: '50%',
		transform: 'translate(-50%,calc(100% + 0.625em))',
		backgroundColor: '#6d6d6d',
	},
	':host': {
		display: 'inline-block',
		position: 'relative',
		fontSize: '16px',
	},
})
export default class CpPopover extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	/** 悬浮泡泡内容容器 */
	private popoverContextWrapper: HTMLDivElement;

	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpPopover.styleSheet];

		const children = document.createElement('slot');
		this.popoverContextWrapper = document.createElement('div');
		const context = document.createElement('slot');

		context.name = 'popover-context';

		this.popoverContextWrapper.classList.add('cp-popover-context-wrapper');

		this.popoverContextWrapper.appendChild(context);
		shadowRoot.append(children, this.popoverContextWrapper);
	}
}

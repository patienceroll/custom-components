import { style, watch } from '../../utils/index';
import type { CpAvatarObservedAttributes } from './data';

@style({
	'.cp-avatar-children-slot': {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	':host': {
		width: '2.5em',
		height: '2.5em',
		lineHeight: '2.5em',
		display: 'inline-block',
		fontSize: '16px',
		verticalAlign: 'top',
		borderRadius: '50%',
		color: '#fff',
		textAlign: 'center',
		backgroundColor: '#bdbdbd',
		overflow: 'hidden',
		fontWeight: 'bold',
	},
})
@watch<CpAvatarObservedAttributes, AttachedShadowRoot<CpAvatar>>([], function (attr, older, newer) {})
export default class CpAvatar extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 组件children 插槽 */
	public childrenSlot: HTMLSlotElement;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpAvatar.styleSheet];

		this.childrenSlot = document.createElement('slot');
		this.childrenSlot.classList.add('cp-avatar-children-slot');

		shadowRoot.appendChild(this.childrenSlot);
	}
}

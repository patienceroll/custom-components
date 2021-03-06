import { style, keyframe, disposeDomNodeStyle } from '../../utils';
import type { DrawerHeaderProps } from '../drawer/data';
import CpMask from '../mask/mask';

const icon =
	'<svg  t=\'1632705635683\' class=\'close-icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2363\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' width=\'100%\' height=\'100%\'><defs><style type=\'text/css\'></style></defs><path width=\'100%\' height=\'100%\' d=\'M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z\' fill=\'#444444\' p-id=\'2364\'></path></svg>';
@style({
	'.cp-dialog-modal-content': {
		top: '20%',
		minWidth: '30%',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: 'all .3s ease-in-out',
		backgroundColor: '#fff',
	},
	'.cp-dialog-header': {
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: '70px',
		alignItems: 'center',
		borderBottom: '1px solid #eee',
		fontSize: '20px',
		padding: '10px',
		boxSizing: 'border-box',
	},
	'.cp-dialog-header .cp-dialog-header-close-icon': {
		marginRight: '10px',
		cursor: 'pointer',
		width: '1em',
		height: '1em',
		transition: 'transform .3s ease-in-out',
	},
	'.cp-dialog-header .cp-dialog-header-close-icon:hover': {
		transform: 'rotate(90deg)',
	},
	'.cp-dialog-header .cp-dialog-header-title': {
		fontSize: '1em',
	},
	'.cp-dialog-content': {
		padding: '10px',
		minHeight: '200px',
	},
	'.cp-dialog-footer': {
		height: '70px',
		borderTop: '1px solid #eee',
		padding: '10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		boxSizing: 'border-box',
	},
	'.cp-dialog-footer .cp-dialog-footer-cancel-button': {
		marginRight: '10px',
	},
})
@keyframe({
	show: {
		'0%': {
			opacity: '0',
		},
		'100%': {
			opacity: '1',
		},
	},
	hiden: {
		'0%': {
			opacity: '1',
		},
		'100%': {
			opacity: '0',
		},
	},
})
export default class CpDialog extends CpMask implements CustomElement {
	#closeIcon?: HTMLElement;
	// ????????????
	#mousePosition = { x: '', y: '' };
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		this.maskContent.classList.add('cp-dialog-modal-content');

		this.maskContent.append(this.#renderHeader(), this.#renderContent(), this.#renderFooter());

		(this.shadowRoot as ShadowRoot).adoptedStyleSheets = [
			...(this.shadowRoot as ShadowRoot).adoptedStyleSheets,
			CpDialog.styleSheet,
			CpDialog.keyframesSheet,
		];
	}

	disconnectedCallback() {
		this.#closeIcon?.removeEventListener('click', this.close.bind(this), false);
	}

	/** ?????????????????? */
	#renderHeader() {
		const title = this.getAttribute('title') as DrawerHeaderProps['title'];

		const header = document.createElement('header');
		header.classList.add('cp-dialog-header');

		const headerTitle = document.createElement('div');
		headerTitle.classList.add('cp-dialog-header-title');
		const headerTitleSlot = document.createElement('slot');
		headerTitleSlot.name = 'dialog-title';
		headerTitle.innerHTML = title ? `<span>${title}</span>` : '';
		headerTitle.append(headerTitleSlot);
		const closeIcon = document.createElement('div');
		closeIcon.innerHTML = icon;
		closeIcon.classList.add('cp-dialog-header-close-icon');
		closeIcon.addEventListener('click', this.close.bind(this), false);
		header.append(headerTitle, closeIcon);
		this.#closeIcon = closeIcon;

		return header;
	}

	/** ?????????????????? */
	#renderContent() {
		const content = document.createElement('div');
		content.classList.add('cp-dialog-content');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);
		return content;
	}

	/** ???????????????????????? */
	#renderFooter() {
		const footer = document.createElement('div');
		footer.classList.add('cp-dialog-footer');
		const footerSlot = document.createElement('slot');
		const confirm = document.createElement('cp-button');
		const cancel = document.createElement('cp-button');
		confirm.append('??????');
		cancel.append('??????');
		confirm.classList.add('cp-dialog-footer-confirm-button');
		cancel.classList.add('cp-dialog-footer-cancel-button');
		footer.append(cancel, confirm);
		footerSlot.name = 'dialog-footer';
		return footer;
	}

	/**
	 * @method ????????????????????????
	 * @param isShow ??????????????????
	 */
	disposemousePosition(isShow = true) {
		if (isShow) {
			const { x, y } = window.event as PointerEvent;
			this.#mousePosition = { x: `${x}`, y: `${y}` };
		}
		const { x, y } = this.#mousePosition;
		// ??????
		if (isShow) {
			disposeDomNodeStyle(this.maskContent, {
				left: `${x}px`,
				top: `${y}px`,
				transform: 'scale(0,0)',
				opacity: '0',
			});

			setTimeout(() => {
				disposeDomNodeStyle(this.maskContent, {
					left: '50%',
					top: '20%',
					transform: 'scale(1,1) translateX(-50%)',
					opacity: '1',
				});
			}, 300);
		} else {
			return new Promise((resolve) => {
				disposeDomNodeStyle(this.maskContent, {
					left: `${x}px`,
					top: `${y}px`,
					transform: 'scale(0.5,0.5)',
					opacity: '0',
				});
				setTimeout(() => {
					resolve('close');
				}, 300);
			});
		}
	}

	async onMaskShow() {
		await this.disposemousePosition();
	}

	async onMaskClose() {
		await this.disposemousePosition(false);
	}
}

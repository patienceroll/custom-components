import { formatStyle, formatKeyframes, setDomNodeStyle } from '../../utils/style';
import CpMask from '../mask/mask';
import { DrawerHeaderProps } from './data';

const icon = `<svg  t="1632705635683" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2363" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><defs><style type="text/css"></style></defs><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="#444444" p-id="2364"></path></svg>`;

export default class CpDrawer extends CpMask implements CustomElement {
	#closeIcon?: HTMLElement;
	#container: HTMLElement;
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-drawer-container': {
			position: 'fixed',
			top: '0',
			fontSize: '40px',
			right: '0',
			transition: 'all .2s ease',
			minWidth: '30%',
			height: '100vh',
			backgroundColor: '#fff',
			boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)',
			overflow: 'auto',
		},
		'.cp-drawer-content': {
			padding: '10px',
		},
		'.cp-drawer-header': {
			display: 'flex',
			justifyContent: 'space-between',
			minHeight: '80px',
			boxSizing: 'border-box',
			padding: '10px',
			alignItems: 'center',
			borderBottom: '1px solid #eee',
		},
		'.cp-drawer-header-title-content': {
			display: 'flex',
			alignItems: 'center',
		},
		'.cp-drawer-header-title-content .cp-drawer-header-close-icon': {
			marginRight: '10px',
			cursor: 'pointer',
		},
		'.cp-drawer-header-title-content .cp-drawer-header-close-icon:hover': {
			backgroundColor: '#fff',
			transition: 'background-color 1s ease',
		},
		'.cp-drawer-header-title-content .cp-drawer-header-title': {
			fontSize: '22px',
		},
		'.cp-drawer-header-action': {
			minWidth: '30%',
			height: '100%',
		},
		'.cp-drawer-footer-content': {
			height: '80px',
			borderTop: '1px solid #eee',
			position: 'absolute',
			width: '100%',
			bottom: '0',
			boxSizing: 'border-box',
			padding: '10px',
		},
	};
	#keyframes: KeyframeObject = {
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
	};

	constructor() {
		super();
		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);
		const container = document.createElement('div');
		container.classList.add('cp-drawer-container');
		this.#container = container;
		container.append(this.#renderHeader(), this.#renderContent());

		if (this.shadowRoot) {
			this.shadowRoot.append(container);
			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				this.#styleSheet,
				this.#keyframesSheet,
			];
		}
	}

	#renderHeader() {
		const title = this.getAttribute('title') as DrawerHeaderProps['title'];
		const header = document.createElement('header');
		header.classList.add('cp-drawer-header');

		const headerTitleContent = document.createElement('div');
		headerTitleContent.classList.add('cp-drawer-header-title-content');
		const headerTitle = document.createElement('div');
		headerTitle.classList.add('cp-drawer-header-title');
		const headerTitleSlot = document.createElement('slot');
		headerTitleSlot.name = 'drawer-header-title';
		headerTitle.innerHTML = title ? `<span>${title}</span>` : '';
		headerTitle.append(headerTitleSlot);

		const closeIcon = document.createElement('div');
		closeIcon.innerHTML = icon;
		closeIcon.classList.add('cp-drawer-header-close-icon');
		this.#closeIcon = closeIcon;
		headerTitleContent.append(closeIcon, headerTitle);
		closeIcon.addEventListener('click', this.close.bind(this), false);
		const headerAction = document.createElement('div');
		headerAction.classList.add('cp-drawer-header-action');
		const headerActionSlot = document.createElement('slot');
		headerActionSlot.name = 'drawer-header-action';
		headerAction.append(headerActionSlot);
		header.append(headerTitleContent, headerAction);
		return header;
	}

	#renderContent() {
		const content = document.createElement('div');
		content.classList.add('cp-drawer-content');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);
		return content;
	}

	// todo: 还没想好怎么写
	// #renderFooter() {
	// 	const showFooter = this.getAttribute('show-footer') as BooleanCharacter;

	// 	const footerContent = document.createElement('div');
	// 	footerContent.classList.add('cp-drawer-footer-content');
	// 	const footerSlot = document.createElement('slot');
	// 	footerSlot.name = 'drawer-footer-content';
	// 	footerContent.append(footerSlot);
	// 	return footerContent;
	// }

	disconnectedCallback() {
		this.#closeIcon?.removeEventListener('click', this.close.bind(this), false);
	}

	/** 处理抽屉动画*/
	disposeDrawerAnimation(isShow = true) {
		if (isShow) {
			setDomNodeStyle(this.#container, { right: '-100%', top: '0', opacity: '0' });
			setTimeout(() => {
				setDomNodeStyle(this.#container, { right: '', top: '', opacity: '1' });
			}, 200);
		} else {
			setDomNodeStyle(this.#container, { right: '-100%', top: '0', opacity: '0' });
		}
	}

	onBeforeShow() {
		this.disposeDrawerAnimation(true);
	}

	onBeforeClose() {
		this.disposeDrawerAnimation(false);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('close');
			}, 200);
		});
	}
}

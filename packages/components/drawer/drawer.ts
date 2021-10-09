import { style, keyframe } from '../../utils/decorators';
import CpMask from '../mask/mask';
import { DrawerHeaderProps, Direction } from './data';

const icon = `<svg  t="1632705635683" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2363" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"><defs><style type="text/css"></style></defs><path width="100%" height="100%" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="#444444" p-id="2364"></path></svg>`;
@style({
	'.cp-drawer-container': {
		backgroundColor: '#fff',
		boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)',
		overflow: 'auto',
	},
	'.cp-drawer-close-container': {
		opacity: '0',
	},
	// right
	'.cp-drawer-right-container': {
		top: '0',
		right: '0',
		minWidth: '35vw',
		height: '100vh',
		animation: 'right-show .3s ease-in-out',
	},
	'.cp-drawer-right-close-container': {
		right: '0',
		top: '0',
		minWidth: '35vw',
		height: '100vh',
		animation: 'right-close .3s ease-in-out',
	},
	// left
	'.cp-drawer-left-container': {
		left: '0',
		top: '0',
		minWidth: '35vw',
		height: '100vh',
		animation: 'left-show .3s ease-in-out',
	},
	'.cp-drawer-left-close-container': {
		left: '0',
		top: '0',
		minWidth: '35vw',
		height: '100vh',
		animation: 'left-close .3s ease-in-out',
	},
	// top
	'.cp-drawer-top-container': {
		width: '100%',
		minHeight: '40vh',
		left: '0',
		top: '0',
		animation: 'top-show .3s ease-in-out',
	},
	'.cp-drawer-top-close-container': {
		width: '100%',
		minHeight: '40vh',
		left: '0',
		top: '0',
		animation: 'top-close .3s ease-in-out',
	},
	// bottom
	'.cp-drawer-bottom-container': {
		width: '100%',
		minHeight: '40vh',
		left: '0',
		bottom: '0',
		animation: 'bottom-show .3s ease-in-out',
	},
	'.cp-drawer-bottom-close-container': {
		width: '100%',
		minHeight: '40vh',
		left: '0',
		bottom: '0',
		animation: 'bottom-close .3s ease-in-out',
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
		height: '60px',
		fontSize: '24px',
	},
	'.cp-drawer-header-title-content .cp-drawer-header-close-icon': {
		marginRight: '10px',
		cursor: 'pointer',
		width: '1em',
		height: '1em',
		transition: 'transform .3s ease-in-out',
	},
	'.cp-drawer-header-title-content .cp-drawer-header-close-icon:hover': {
		transform: 'rotate(90deg)',
	},
	'.cp-drawer-header-title-content .cp-drawer-header-title': {
		fontSize: '1em',
	},
	'.cp-drawer-header-action': {
		minWidth: '35vw',
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
})
@keyframe({
	'right-show': {
		'0%': {
			opacity: '0',
			// 100% 是相对于自身宽度
			transform: 'translateX(100%)',
		},
		'100%': {
			transform: 'translateX(0)',
		},
	},
	'right-close': {
		'0%': {
			opacity: '1',
			transform: 'translateX(0)',
		},
		'100%': {
			opacity: '0',
			transform: 'translateX(100%)',
		},
	},
	'left-show': {
		'0%': {
			opacity: '0',
			transform: 'translateX(-100%)',
		},
		'100%': {
			opacity: '1',
			transform: 'translateX(0)',
		},
	},
	'left-close': {
		'0%': {
			opacity: '1',
			transform: 'translateX(0)',
		},
		'100%': {
			opacity: '0',
			transform: 'translateX(-100%)',
		},
	},
	'top-show': {
		'0%': {
			opacity: '0',
			transform: 'translateY(-100%)',
		},
		'100%': {
			opacity: '1',
			transform: 'translateY(0)',
		},
	},
	'top-close': {
		'0%': {
			opacity: '1',
			transform: 'translateY(0)',
		},
		'100%': {
			opacity: '0',
			transform: 'translateY(-100%)',
		},
	},
	'bottom-show': {
		'0%': {
			opacity: '0',
			transform: 'translateY(100%)',
		},
		'100%': {
			opacity: '1',
			transform: 'translateY(0)',
		},
	},
	'bottom-close': {
		'0%': {
			opacity: '1',
			transform: 'translateY(0)',
		},
		'100%': {
			opacity: '0',
			transform: 'translateY(100%)',
		},
	},
})
export default class CpDrawer extends CpMask {
	/** 弹出位置 */
	#direction?: Direction;
	#closeIcon?: HTMLElement;
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor() {
		super();
		this.maskContent.classList.add('cp-drawer-container');
		this.#disposeDirection();
		this.#disposeDrawerClass();
		this.maskContent.append(this.#renderHeader(), this.#renderContent());
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				CpDrawer.styleSheet,
				CpDrawer.keyframesSheet,
			];
		}
	}

	disconnectedCallback() {
		this.#closeIcon?.removeEventListener('click', this.close.bind(this), false);
	}

	/** 渲染抽屉头部 */
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
		closeIcon.addEventListener('click', this.close.bind(this), false);
		headerTitleContent.append(closeIcon, headerTitle);
		this.#closeIcon = closeIcon;

		const headerAction = document.createElement('div');
		headerAction.classList.add('cp-drawer-header-action');
		const headerActionSlot = document.createElement('slot');
		headerActionSlot.name = 'drawer-header-action';
		headerAction.append(headerActionSlot);

		header.append(headerTitleContent, headerAction);

		return header;
	}

	/** 渲染抽屉内容 */
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

	/** 处理方向 */
	#disposeDirection() {
		const direction = this.getAttribute('direction') as Direction;
		this.#direction = direction || 'right';
	}

	/** 处理抽屉动画*/
	#disposeDrawerClass(isShow = true) {
		if (isShow) {
			this.maskContent.classList.add(`cp-drawer-${this.#direction}-container`);
			this.maskContent.classList.remove(`cp-drawer-${this.#direction}-close-container`, 'cp-drawer-close-container');
		} else {
			this.maskContent.classList.remove(`cp-drawer-${this.#direction}-container`);
			this.maskContent.classList.add(`cp-drawer-${this.#direction}-close-container`, 'cp-drawer-close-container');
		}
	}

	onMaskShow() {
		this.#disposeDrawerClass(true);
	}

	onMaskClose() {
		this.#disposeDrawerClass(false);
	}
}

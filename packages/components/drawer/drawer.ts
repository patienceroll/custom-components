import { formatStyle, formatKeyframes, setDomNodeStyle } from '../../utils/style';
import CpMask from '../mask/mask';
import { DrawerHeaderProps } from './data';

export default class CpDrawer extends CpMask implements CustomElement {
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
			height: '80px',
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
			width: '20px',
			height: '20px',
			marginRight: '10px',
			textAlign: 'center',
			lineHeight: '20px',
			fontSize: '20px',
		},
		'.cp-drawer-header-title-content .cp-drawer-header-title': {
			fontSize: '20px',
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
		const content = document.createElement('div');
		content.classList.add('cp-drawer-content');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);
		container.append(this.#renderHeader(), content);
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
		const headerTitle = document.createElement('span');
		headerTitle.classList.add('cp-drawer-header-title');
		const headerTitleSlot = document.createElement('slot');
		headerTitleSlot.name = 'drawer-header-title';
		headerTitle.innerHTML = title ? title : '';
		headerTitle.append(headerTitleSlot);

		const closeIcon = document.createElement('div');
		closeIcon.innerHTML = '<span>x</span>';
		closeIcon.classList.add('cp-drawer-header-close-icon');
		headerTitleContent.append(closeIcon, headerTitle);

		const headerAction = document.createElement('div');
		headerAction.classList.add('cp-drawer-header-action');
		const headerActionSlot = document.createElement('slot');
		headerActionSlot.name = 'drawer-header-action';
		headerAction.append(headerActionSlot);

		header.append(headerTitleContent, headerAction);

		return header;
	}

	/**
	 * @method 设置鼠标点击位置
	 * @param isShow 是否展示弹窗
	 */
	setmousePosition(isShow = true) {
		// 抽屉
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
		this.setmousePosition(true);
	}

	onBeforeClose() {
		this.setmousePosition(false);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('close');
			}, 200);
		});
	}
}

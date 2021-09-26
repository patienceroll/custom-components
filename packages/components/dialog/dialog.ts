import { formatStyle, formatKeyframes, setDomNodeStyle } from '../../utils/style';
import CpMask from '../mask/mask';
import { DialogType } from './data';

export default class CpDialog extends CpMask implements CustomElement {
	#content: HTMLElement;
	#type: DialogType = 'modal';
	// 鼠标位置
	#mousePosition = { x: '', y: '' };
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-dialog-hiden': {
			opacity: '0',
			animation: 'hiden 0.3s',
		},
		'.cp-dialog-show': {
			opacity: '1',
			animation: 'show 0.3s',
		},
		'.cp-dialog-modal-content': {
			position: 'fixed',
			top: '20%',
			fontSize: '40px',
			minWidth: '30%',
			left: '50%',
			transform: 'translateX(-50%)',
			transition: 'all .3s ease',
		},
		'.cp-dialog-drawer-content': {
			position: 'fixed',
			top: '0',
			fontSize: '40px',
			right: '0',
			transition: 'all .3s ease',
			minWidth: '30%',
			height: '100vh',
			backgroundColor: '#fff',
			boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)',

			overflow: 'auto',
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
	// 基础层级
	static baseIndex = 0;

	constructor() {
		super();

		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);
		const content = document.createElement('div');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);
		this.#content = content;
		this.setDialogClass();
		if (this.shadowRoot) {
			this.shadowRoot.append(content);
			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				this.#styleSheet,
				this.#keyframesSheet,
			];
		}
	}

	private setDialogClass() {
		const type = this.getAttribute('type');
		if (['modal', 'drawer'].includes(type as DialogType)) {
			this.#type = type as DialogType;
		} else {
			this.#type = 'modal';
		}
		switch (this.#type) {
			case 'modal':
				this.#content?.classList.add('cp-dialog-modal-content');
				break;
			case 'drawer':
				this.#content?.classList.add('cp-dialog-drawer-content');
				break;
			default:
				break;
		}
	}

	/**
	 * @method 设置鼠标点击位置
	 * @param isShow 是否展示弹窗
	 */
	setmousePosition(isShow = true) {
		if (isShow) {
			const { x, y } = window.event as PointerEvent;

			this.#mousePosition = { x: `${x}`, y: `${y}` };
		}
		const { x, y } = this.#mousePosition;

		if (this.#type === 'modal') {
			// 弹窗
			if (isShow) {
				setDomNodeStyle(this.#content, { left: `${x}px`, top: `${y}px`, opacity: '0' });
				setTimeout(() => {
					setDomNodeStyle(this.#content, { left: '', top: '', opacity: '1' });
				}, 200);
			} else {
				setDomNodeStyle(this.#content, { left: `${x}px`, top: `${y}px`, opacity: '0' });
			}
		} else {
			// 抽屉
			if (isShow) {
				setDomNodeStyle(this.#content, { right: '-100%', top: '0', opacity: '0' });
				setTimeout(() => {
					setDomNodeStyle(this.#content, { right: '', top: '', opacity: '1' });
				}, 200);
			} else {
				setDomNodeStyle(this.#content, { right: '-100%', top: '0', opacity: '0' });
			}
		}
	}

	onBeforeClose() {
		this.setmousePosition(false);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('close');
			}, 200);
		});
	}

	onBeforeShow() {
		this.setmousePosition();
	}
}

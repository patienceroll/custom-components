import { formatStyle, formatKeyframes, setDomNodeStyle } from '../../utils/style';
import CpMask from '../mask/mask';
import { DialogType } from './data';
export default class CpDialog extends CpMask {
	content: HTMLElement;
	type: DialogType = 'modal';
	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;
	// 基础层级
	static baseIndex = 0;
	// 鼠标位置
	mousePosition = { x: '', y: '' };

	static keyframes: KeyframeObject = {
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

	static style: CSSStyleObject = {
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
			left: '50%',
			transform: 'translateX(-50%)',
			transition: 'all .2s ease',
			zIndex: '100',
		},
		'.cp-dialog-drawer-content': {
			position: 'fixed',
			top: '0',
			fontSize: '40px',
			right: '0',
			transition: 'all .2s ease',
			minWidth: '500px',
			height: '100vh',
			backgroundColor: '#fff',
			boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)',
			zIndex: '100',
		},
	};

	constructor() {
		super([CpDialog.styleSheet, CpDialog.keyframesSheet]);

		const content = document.createElement('div');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);
		this.content = content;
		this.setDialogClass();
		this.shadowRoot?.append(content);
	}

	private setDialogClass() {
		const type = this.getAttribute('type');
		if (['modal', 'drawer'].includes(type as DialogType)) {
			this.type = type as DialogType;
		} else {
			this.type = 'modal';
		}
		switch (this.type) {
			case 'modal':
				this.content?.classList.add('cp-dialog-modal-content');
				break;
			case 'drawer':
				this.content?.classList.add('cp-dialog-drawer-content');
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
			this.mousePosition = { x: `${x}`, y: `${y}` };
		}
		const { x, y } = this.mousePosition;

		if (this.content) {
			if (this.type === 'modal') {
				if (isShow) {
					setDomNodeStyle(this.content, { left: `${x}px`, top: `${y}px`, opacity: '0' });
					setTimeout(() => {
						if (this.content) {
							setDomNodeStyle(this.content, { left: '', top: '', opacity: '1' });
						}
					}, 200);
				} else {
					setDomNodeStyle(this.content, { left: `${x}px`, top: `${y}px`, opacity: '0' });
				}
			} else {
				if (isShow) {
					setDomNodeStyle(this.content, { right: '-100%', top: '0', opacity: '0' });
					setTimeout(() => {
						if (this.content) {
							setDomNodeStyle(this.content, { right: '', top: '', opacity: '1' });
						}
					}, 200);
				} else {
					setDomNodeStyle(this.content, { right: '-100%', top: '0', opacity: '0' });
				}
			}
		}
	}

	closeCallback() {
		this.setmousePosition(false);
	}

	showCallback() {
		this.setmousePosition();
	}
}

CpDialog.styleSheet = formatStyle(CpDialog.style);
CpDialog.keyframesSheet = formatKeyframes(CpDialog.keyframes);

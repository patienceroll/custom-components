import { formatStyle, formatKeyframes, setDomNodeStyle } from '../../utils/style';
import CpMask from '../mask/mask';

export default class CpDialog extends CpMask implements CustomElement {
	// 鼠标位置
	#mousePosition = { x: '', y: '' };
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		'.cp-dialog-modal-content': {
			top: '20%',
			minWidth: '30%',
			left: '50%',
			transform: 'translateX(-50%)',
			transition: 'all .4s ease',
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
		this.maskContent.append(contentSlot);
		this.maskContent.classList.add('cp-dialog-modal-content');

		(this.shadowRoot as ShadowRoot).append(content);
		(this.shadowRoot as ShadowRoot).adoptedStyleSheets = [
			...(this.shadowRoot as ShadowRoot).adoptedStyleSheets,
			this.#styleSheet,
			this.#keyframesSheet,
		];
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
		// 弹窗
		if (isShow) {
			setDomNodeStyle(this.maskContent, {
				left: `${x}px`,
				top: `${y}px`,
				opacity: '0',
				zIndex: `${1000 + CpDialog.index}`,
			});
			setTimeout(() => {
				setDomNodeStyle(this.maskContent, { left: '', top: '', opacity: '1', zIndex: `${1000 + CpDialog.index}` });
			}, 400);
		} else {
			return new Promise((resolve) => {
				setDomNodeStyle(this.maskContent, {
					left: `${x}px`,
					top: `${y}px`,
					opacity: '0',
					zIndex: `${1000 + CpDialog.index}`,
				});
				setTimeout(() => {
					resolve('close');
				}, 400);
			});
		}
	}

	async onBeforeClose() {
		await this.setmousePosition(false);
	}

	async onBeforeShow() {
		await this.setmousePosition();
	}
}

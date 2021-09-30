import { formatKeyframes, formatStyle } from 'packages/utils/style';
import CpMask from '../mask/mask';
import { MessageInt } from './data';

export default class CpMessage extends CpMask implements CustomElement {
	#message: HTMLElement;
	#style: CSSStyleObject = {
		'.cp-message-content': {
			top: '100px',
			left: '50%',
			height: '40px',
			borderRadius: '10px',
			transform: 'translateX(-50%)',
			backgroundColor: 'pink',
			color: '#fff',
			overflow: 'hidden',
			textAlign: 'ctenter',
			padding: '10px 20px',
			border: '1px solid #eee',
			display: 'flex',
			alignItems: 'center',
		},
		'.cp-message-show': {
			animation: 'show-message .3s ease-in-out',
			opacity: '1',
		},
		'.cp-message-close': {
			animation: 'close-message .3s ease-in-out',
			opacity: '0',
		},
	};
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#keyframes: KeyframeObject = {
		'show-message': {
			'0%': {
				transform: 'translate(-50%,-100px)',
				opacity: '0',
			},
			'100%': {
				transform: 'translate(-50%,0)',
				opacity: '1',
			},
		},
		'close-message': {
			'0%': {
				transform: 'translate(-50%,0)',
				opacity: '1',
			},
			'100%': {
				transform: 'translate(-50%,-100px)',
				opacity: '0',
			},
		},
	};

	constructor() {
		super();

		if (this.#styleSheet === undefined) this.#styleSheet = formatStyle(this.#style);
		if (this.#keyframesSheet === undefined) this.#keyframesSheet = formatKeyframes(this.#keyframes);

		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				this.#styleSheet,
				this.#keyframesSheet,
			];
		}

		const message = document.createElement('div');
		this.maskContent.classList.add('cp-message-content');
		this.showMask = false;
		this.#message = message;
		message.innerText = '消息弹窗';
		this.maskContent.append(message);
	}

	#timer: number = 0;

	showMessage({ message, duration = 3000 }: MessageInt) {
		this.#message.innerHTML = message;
		this.show();
		clearInterval(this.#timer as number);
		this.#timer = setTimeout(() => {
			this.close();
		}, duration);
	}

	async onBeforeShow() {
		this.maskContent.classList.add('cp-message-show');
		this.maskContent.classList.remove('cp-message-close');
	}

	async onBeforeClose() {
		clearTimeout(this.#timer);
		return new Promise((resolve) => {
			this.maskContent.classList.replace('cp-message-show', 'cp-message-close');
			setTimeout(() => {
				resolve('close');
			}, 300);
		});
	}
}

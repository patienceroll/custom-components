import { formatStyle, formatKeyframes } from '../../utils/style';
import { OpenType } from './data';

export default class CpMask extends HTMLElement implements CustomElement {
	static index = 0;
	#maskNode: HTMLElement;
	#styleSheet?: CSSStyleSheet;
	#keyframesSheet?: CSSStyleSheet;
	#style: CSSStyleObject = {
		':host([open=true])': {
			display: 'block',
		},
		':host([open=false])': {
			display: 'none',
		},
		'.cp-mask': {
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,.2)',
			top: '0',
			left: '0',
			zIndex: `${CpMask.index + 1000}px`,
		},
		'.cp-mask-show': {
			opacity: '1',
			animation: 'show 0.2s ease',
		},
		'.cp-mask-close': {
			opacity: '0',
			animation: 'close 0.2s ease',
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
		close: {
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

		const shadowRoot = this.attachShadow({ mode: 'open' });
		const closable = this.getAttribute('mask-closable');
		const mask = document.createElement('div');
		mask.classList.add('cp-mask');
		this.#maskNode = mask;
		this.disposeMaskClosable(closable as OpenType);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet, this.#keyframesSheet];
		shadowRoot.append(mask);
	}

	disposeMaskClosable(closable: OpenType) {
		if (closable === 'false') {
			this.#maskNode.removeEventListener('click', this.close.bind(this));
		} else if (closable === 'true') {
			this.#maskNode.addEventListener('click', this.close.bind(this));
		}
	}

	disposeOpen(open: OpenType = 'true') {
		if (open === 'true') {
			this.#maskNode.classList.add('cp-mask-show');
			this.#maskNode.classList.remove('cp-mask-close');
		} else {
			this.#maskNode?.classList.replace('cp-mask-show', 'cp-mask-close');
		}
	}

	static observedAttributes = ['open', 'mask-closable'];
	attributeChangedCallback(name: 'open' | 'mask-closable', _: string, newValue: string) {
		switch (name) {
			case 'open':
				this.disposeOpen(newValue as OpenType);
				break;
			case 'mask-closable':
				this.disposeMaskClosable(newValue as OpenType);
			default:
				break;
		}
	}

	/** 关闭mask回调 */
	onBeforeClose() {}

	/** 开启mask回调 */
	onBeforeShow() {}

	/** 打开蒙层 */
	async show() {
		CpMask.index++;
		await this.onBeforeShow();
		this.setAttribute('open', 'true');
	}

	/** 关闭蒙层 */
	async close() {
		CpMask.index--;
		this.disposeOpen('false');
		await this.onBeforeClose();
		this.setAttribute('open', 'false');
	}
}

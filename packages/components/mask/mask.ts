import { formatStyle, formatKeyframes } from '../../utils/style';

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
			position: 'fixed',
			width: '100vw',
			height: '100vh',
			backgroundColor: 'rgba(0,0,0,.2)',
			top: '0',
			left: '0',
			zIndex: `${CpMask.index + 1000}px`,
			overflow: 'hidden',
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
		this.disposeMaskClosable(closable as BooleanCharacter);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet, this.#keyframesSheet];
		shadowRoot.append(mask);
	}

	disposeMaskClosable(closable: BooleanCharacter) {
		if (closable === 'false') {
			this.#maskNode.removeEventListener('click', this.close.bind(this), false);
		} else {
			this.#maskNode.addEventListener('click', this.close.bind(this), false);
		}
	}

	disposeOpen(open: BooleanCharacter = 'true') {
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
				this.disposeOpen(newValue as BooleanCharacter);
				break;
			case 'mask-closable':
				this.disposeMaskClosable(newValue as BooleanCharacter);
			default:
				break;
		}
	}

	disconnectedCallback() {
		this.#maskNode.removeEventListener('click', this.close.bind(this), false);
	}

	/** 关闭mask回调 */
	onBeforeClose() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('close');
			}, 200);
		});
	}

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

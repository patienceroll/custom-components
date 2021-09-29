import { formatStyle, formatKeyframes } from '../../utils/style';

export default class CpMask extends HTMLElement implements CustomElement {
	/** 蒙层内容 */
	maskContent: HTMLElement;
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
			backgroundColor: 'rgba(0,0,0,.45)',
			top: '0',
			left: '0',
			overflow: 'hidden',
		},
		'.cp-mask-content': {
			position: 'fixed',
			boxSizing: 'border-box',
		},
		'.cp-mask-show': {
			opacity: '1',
			animation: 'show 0.4s ease',
		},
		'.cp-mask-close': {
			opacity: '0',
			animation: 'close 0.4s ease',
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
		const maskContent = document.createElement('div');
		maskContent.classList.add('cp-mask-content');
		mask.classList.add('cp-mask');
		this.maskContent = maskContent;
		this.#maskNode = mask;

		this.disposeMaskClosable(closable as BooleanCharacter);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet, this.#keyframesSheet];
		shadowRoot.append(mask, maskContent);
	}

	disposeMaskClosable(closable: BooleanCharacter) {
		if (closable === 'false') {
			this.#maskNode.removeEventListener('click', this.close.bind(this), false);
		} else {
			this.#maskNode.addEventListener('click', this.close.bind(this), false);
		}
	}

	#disposeOpen(isOpen: BooleanCharacter = 'true') {
		if (isOpen === 'true') {
			this.#maskNode.classList.add('cp-mask-show');
			this.#maskNode.classList.remove('cp-mask-close');
		} else {
			this.#maskNode?.classList.replace('cp-mask-show', 'cp-mask-close');
		}

		const zIndex = `${1000 + (isOpen === 'true' ? ++CpMask.index : --CpMask.index)}`;
		this.#maskNode.style.zIndex = zIndex;
		this.maskContent.style.zIndex = zIndex;
	}

	static observedAttributes = ['open', 'mask-closable'];
	attributeChangedCallback(name: 'open' | 'mask-closable', _: string, newValue: string) {
		switch (name) {
			case 'open':
				throw new Error("not support directly modify 'open' attributes");
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
	onBeforeClose?() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('close');
			}, 400);
		});
	}

	/** 开启mask回调 */
	onBeforeShow?() {}

	/** 打开蒙层 */
	async show() {
		const isOpen = this.getAttribute('open') as BooleanCharacter;
		if (isOpen === 'true') return;
		this.#disposeOpen('true');
		await (this.onBeforeShow && this.onBeforeShow());
		this.setAttribute('open', 'true');
	}

	/** 关闭蒙层 */
	async close() {
		const isOpen = this.getAttribute('open') as BooleanCharacter;
		if (isOpen === 'false') return;
		this.#disposeOpen('false');
		await (this.onBeforeClose && this.onBeforeClose());
		this.setAttribute('open', 'false');
	}
}

import { formatStyle, formatKeyframes } from '../../utils/style';
import Stack from '../../utils/stack';

const stack = new Stack<CpMask>();
stack.finished = function (removeItem: CpMask) {
	const len = this.getLength();
	// 新增弹窗才会走这个for循环
	if (!removeItem) {
		for (let i = 0; i < len; i++) {
			this.stack[i].disposeEvent(true);
		}
	}
	removeItem?.disposeEvent?.(true);
	this.top?.disposeEvent();
	if (this.top) this.top.zIndex = len;
};

export default class CpMask extends HTMLElement implements CustomElement {
	/**是否需要展示蒙层 */
	showMask: boolean = true;
	/** 层级 */
	zIndex: number = 0;
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
		':host': {
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
			animation: 'show 0.3s ease',
		},
		'.cp-mask-close': {
			opacity: '0',
			animation: 'close 0.3s ease',
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

		this.#disposeMaskClosable(closable as BooleanCharacter);
		shadowRoot.adoptedStyleSheets = [this.#styleSheet, this.#keyframesSheet];
		shadowRoot.append(mask, maskContent);
	}

	#onKeydown = (e: KeyboardEvent) => {
		if (e.keyCode === 27) {
			this.dispatchEvent(new CustomEvent('close', { detail: null, bubbles: false }));
		}
	};

	disposeEvent(remove = false) {
		if (!remove) {
			this.addEventListener('close', this.close.bind(this), false);
			document.addEventListener('keydown', this.#onKeydown, false);
		} else {
			this.removeEventListener('close', this.close.bind(this), false);
			document.removeEventListener('keydown', this.#onKeydown, false);
		}
	}

	#disposeMaskClosable(closable: BooleanCharacter) {
		if (closable === 'false') {
			this.#maskNode.removeEventListener('click', this.close.bind(this), false);
		} else {
			this.#maskNode.addEventListener('click', this.close.bind(this), false);
		}
	}

	#disposeOpen(isOpen: BooleanCharacter = 'true') {
		if (this.showMask) {
			if (isOpen === 'true') {
				this.#maskNode.classList.add('cp-mask-show');
				this.#maskNode.classList.remove('cp-mask-close');
				this.#maskNode.style.zIndex = `${1000 + this.zIndex}`;
			} else {
				this.#maskNode?.classList.replace('cp-mask-show', 'cp-mask-close');
			}
		} else {
			this.#maskNode.style.display = 'none';
		}

		this.maskContent.style.zIndex = `${1000 + this.zIndex}`;
	}

	static observedAttributes = ['mask-closable'];
	attributeChangedCallback(name: 'mask-closable', _: string, newValue: string) {
		switch (name) {
			case 'mask-closable':
				this.#disposeMaskClosable(newValue as BooleanCharacter);
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
			}, 300);
		});
	}

	/** 开启mask回调 */
	onBeforeShow?() {
		return Promise.resolve();
	}

	/** 打开蒙层 */
	async show() {
		const isOpen = this.getAttribute('open') as BooleanCharacter;
		if (isOpen === 'true') return;
		stack.push(this);
		this.#disposeOpen('true');
		this.setAttribute('open', 'true');
		await this.onBeforeShow?.();
	}

	/** 关闭蒙层 */
	async close() {
		this.#disposeOpen('false');
		await this.onBeforeClose?.();
		const isOpen = this.getAttribute('open') as BooleanCharacter;
		if (isOpen === 'false') return;
		this.setAttribute('open', 'false');
		stack.remove(this);
	}
}

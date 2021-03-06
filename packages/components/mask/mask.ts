import { style, keyframe, Stack, dispatchCustomEvent, watch } from '../../utils';

const stack = new Stack<CpMask>();
stack.finished = function (removeItem: CpMask) {
	const len = this.getLength();
	// 新增弹窗才会走这个for循环
	if (!removeItem) {
		for (let i = 0; i < len; i++) {
			this.stack[i]._disposeEvent(true);
		}
	}
	removeItem?._disposeEvent?.(true);
	this.top?._disposeEvent();
	if (this.top) this.top.zIndex = len;
};

@style({
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
})
@keyframe({
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
})
@watch<CpMask>({
	['mask-closable'](_, newValue) {
		this.disposeMaskClosable(newValue as BooleanCharacter);
	},
})
export default class CpMask extends HTMLElement implements CustomElement {
	/** 层级 */
	public zIndex = 0;
	/** 蒙层内容 */
	public maskContent: HTMLElement;
	#maskNode: HTMLElement;

	static styleSheet: CSSStyleSheet;
	static keyframesSheet: CSSStyleSheet;

	constructor(showMask = true) {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const closable = this.getAttribute('mask-closable');

		const mask = document.createElement('div');
		const maskContent = document.createElement('div');
		maskContent.classList.add('cp-mask-content');
		mask.classList.add(showMask ? 'cp-mask' : 'no-mask');
		this.maskContent = maskContent;
		this.#maskNode = mask;

		this.disposeMaskClosable(closable as BooleanCharacter);
		// 动画结束
		this.#maskNode.addEventListener('animationend', this.#disposeMaskAnimation);
		shadowRoot.adoptedStyleSheets = [CpMask.styleSheet, CpMask.keyframesSheet];
		shadowRoot.append(mask, maskContent);
	}

	disconnectedCallback() {
		this.#maskNode.removeEventListener('animationend', this.#disposeMaskAnimation);
		this.#maskNode.removeEventListener('click', this.close.bind(this), false);
	}

	_disposeEvent(remove = false) {
		if (!remove) {
			this.addEventListener('close', this.close.bind(this), false);
			document.addEventListener('keydown', this.#onKeydown, false);
		} else {
			this.removeEventListener('close', this.close.bind(this), false);
			document.removeEventListener('keydown', this.#onKeydown, false);
		}
	}

	#disposeMaskAnimation = (e: AnimationEvent) => {
		switch (e.animationName) {
			case 'close':
				// 动画结束
				if ([...this.#maskNode.classList].includes('cp-mask-close')) {
					this.setAttribute('open', 'false');
					stack.remove(this);
				}
				break;
			default:
				break;
		}
	};

	#onKeydown = (e: KeyboardEvent) => {
		if (e.keyCode === 27) {
			dispatchCustomEvent(this, 'close', undefined, { bubbles: false });
		}
	};

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
			this.#maskNode.style.zIndex = `${1000 + this.zIndex}`;
			this.maskContent.style.zIndex = `${1000 + this.zIndex}`;
		} else {
			this.#maskNode?.classList.replace('cp-mask-show', 'cp-mask-close');
		}
	}

	/** 关闭mask回调 */
	protected onMaskClose?() {
		// TODO
	}

	/** 开启mask回调 */
	protected onMaskShow?() {
		// TODO
	}

	/** 打开蒙层 */
	show() {
		const isOpen = this.getAttribute('open') as BooleanCharacter;
		if (isOpen === 'true') return;
		stack.push(this);
		this.setAttribute('open', 'true');
		this.#disposeOpen('true');
		this.onMaskShow?.();
	}

	/** 关闭蒙层 */
	close() {
		this.#disposeOpen('false');
		this.onMaskClose?.();
	}
}

interface A {
	a: 1;
}

interface B extends A {
	ccc: 1;
}

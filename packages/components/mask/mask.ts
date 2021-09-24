import { formatStyle, formatKeyframes } from '../../utils/style';

export default class CpMask extends HTMLElement implements CustomElement {
	/** 蒙层节点 */
	maskNode: HTMLElement | null = null;
	static styleSheet: CSSStyleSheet;
	static style: CSSStyleObject = {
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
			backgroundColor: 'rgba(0,0,0,.1)',
			top: '0',
			left: '0',
			zIndex: '50',
		},
		'.cp-mask-show': {
			animation: 'show 0.2s ease',
		},
		'.cp-mask-close': {
			animation: 'close 0.2 ease',
		},
	};
	static keyframesSheet: CSSStyleSheet;
	static keyframes: KeyframeObject = {
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

	constructor(styleSheet: CSSStyleSheet[]) {
		super();
		if (CpMask.styleSheet === undefined) CpMask.styleSheet = formatStyle(CpMask.style);
		if (CpMask.keyframesSheet === undefined) CpMask.keyframesSheet = formatKeyframes(CpMask.keyframes);

		const shadowRoot = this.attachShadow({ mode: 'open' });

		const mask = document.createElement('div');
		mask.classList.add('cp-mask');
		this.maskNode = mask;

		shadowRoot.adoptedStyleSheets = [CpMask.styleSheet, CpMask.keyframesSheet, ...styleSheet];
		shadowRoot.append(mask);
	}

	connectedCallback() {
		this.maskNode?.addEventListener('click', () => {
			this.close();
		});
	}

	static observedAttributes = ['open'];
	attributeChangedCallback(name: 'open', _: string, newValue: string) {
		switch (name) {
			case 'open':
				this.setMask(newValue);
				break;
			default:
				break;
		}
	}

	setMask(open = 'true') {
		if (this.maskNode) {
			if (open === 'true') {
				this.maskNode.classList.add('cp-mask-show');
				this.maskNode.classList.remove('cp-mask-close');
			} else {
				this.maskNode.classList.replace('cp-mask-show', 'cp-mask-close');
			}
		}
	}

	/** 关闭mask回调 */
	closeCallback() {}

	/** 开启mask回调 */
	showCallback() {}

	/** 打开蒙层 */
	show() {
		this.showCallback();
		this.setAttribute('open', 'true');
	}

	/** 关闭蒙层 */
	close() {
		this.closeCallback();
		this.setAttribute('open', 'false');
	}
}

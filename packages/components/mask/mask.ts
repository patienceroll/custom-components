import { formatStyle, formatKeyframes } from '../../utils/style';
import CpDialog from '../dialog/dialog';
import { OpenType } from './data';

export default class CpMask extends HTMLElement implements CustomElement {
	/** 蒙层节点 */
	maskNode: HTMLElement;
	static index = 0;
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
			opacity: '1',
			animation: 'close 0.2s ease',
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

	constructor() {
		super();
		if (CpMask.styleSheet === undefined) CpMask.styleSheet = formatStyle(CpMask.style);
		if (CpMask.keyframesSheet === undefined) CpMask.keyframesSheet = formatKeyframes(CpMask.keyframes);
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const mask = document.createElement('div');
		mask.classList.add('cp-mask');
		this.maskNode = mask;
		shadowRoot.adoptedStyleSheets = [CpMask.styleSheet, CpMask.keyframesSheet];
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
				this.disposeOpen(newValue as OpenType);
				break;
			default:
				break;
		}
	}

	disposeOpen(open: OpenType = 'true') {
		if (open === 'true') {
			this.maskNode.classList.add('cp-mask-show');
			this.maskNode.classList.remove('cp-mask-close');
		} else {
			this.maskNode?.classList.replace('cp-mask-show', 'cp-mask-close');
		}
	}

	/** 关闭mask回调 */
	onBeforeClose() {}

	/** 开启mask回调 */
	onBeforeShow() {}

	/** 打开蒙层 */
	async show() {
		CpDialog.index++;
		await this.onBeforeShow();
		this.setAttribute('open', 'true');
	}

	/** 关闭蒙层 */
	async close() {
		CpMask.index--;
		await this.onBeforeClose();
		this.setAttribute('open', 'false');
	}
}

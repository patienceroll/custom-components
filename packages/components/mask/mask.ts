import { formatStyle, formatKeyframes } from '../../utils/style';

export default class CpMask extends HTMLElement {
	static styleSheet?: CSSStyleSheet;
	static style: CSSStyleObject = {
		':host([open=true])': {
			display: 'block',
		},
		':host([open=false])': {
			display: 'none',
		},
		'.cp-mask-container': {
			position: 'fixed',
			width: '100%',
			height: '100%',
			top: '0',
			left: '0',
		},
		'.cp-mask': {
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,.1)',
			top: '0',
			left: '0',
		},
		'.cp-mask-show': {
			animation: 'show 0.2s ease',
		},
		'.cp-mask-hiden': {
			animation: 'hiden 0.2 ease',
		},
	};
	static keyframesSheet?: CSSStyleSheet;
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

	maskNode: HTMLElement | null = null;

	setMask() {
		if (this.maskNode) {
			if (this.getAttribute('open') === 'true') {
				this.maskNode.classList.add('cp-mask-show');
				this.maskNode.classList.remove('cp-mask-hiden');
			} else {
				this.maskNode.classList.replace('cp-mask-show', 'cp-mask-hiden');
			}
		}
	}

	showMask() {
		this.setAttribute('open', 'true');
		this.setMask();
	}

	hidenMask() {
		this.setAttribute('open', 'false');
		this.setMask();
	}

	constructor() {
		super();
		if (CpMask.styleSheet === undefined) CpMask.styleSheet = formatStyle(CpMask.style);
		if (CpMask.keyframesSheet === undefined) CpMask.keyframesSheet = formatKeyframes(CpMask.keyframes);
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const container = document.createElement('div');
		container.classList.add('cp-mask-container');
		const mask = document.createElement('div');
		mask.classList.add('cp-mask');
		this.maskNode = mask;

		const content = document.createElement('div');
		content.classList.add('cp-mask-content');
		const contentSlot = document.createElement('slot');
		content.append(contentSlot);

		container.append(mask, content);
		shadowRoot.append(container);

		mask.addEventListener('click', () => {
			this.hidenMask();
		});

		shadowRoot.adoptedStyleSheets = [CpMask.styleSheet, CpMask.keyframesSheet];
	}
}

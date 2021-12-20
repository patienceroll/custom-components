import { style, watch } from '../../utils';
@style({
	'.cp-tag-box': {
		position: 'relactive',
	},
	'.cp-tag-content': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
	},
	'.color': {
		color: 'red',
	},
	':host(:hover)': {
		cursor: 'pointer',
	},
	':host': {
		borderRadius: '0.25em',
		border: '1px solid red',
		padding: '0.1em',
	},
	'.cp-icon-center': {
		verticalAlign: 'middle',
		width: '22px',
		height: '22px',
	},
})
@watch<AttachedShadowRoot<CpTag>>({
	color(newer) {
		this.style.setProperty('color', newer);
		// this.style.setProperty('background',newer)
		this.style.setProperty('border', `1px solid ${newer}`);
	},
	size(newer) {
		if (newer == 'mini') {
			this.style.setProperty('padding', '0.1em');
		} else if (newer == 'small') {
			this.style.setProperty('padding', '0.2em');
		} else if (newer == 'medium') {
			this.style.setProperty('padding', '0.3em');
		}
	},
	tagshow(newer) {
		if (newer === 'true') {
			this.style.setProperty('display', 'inline');
		} else {
			this.style.setProperty('display', 'none');
		}
	},
})
export default class CpTag extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	public Tag: HTMLElement;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({
			mode: 'open',
		});
		// 挂载唯一样式表
		shadowRoot.adoptedStyleSheets = [CpTag.styleSheet];

		// 创建dom元素
		//创建插槽

		const contentSlot = document.createElement('slot');
		const rightSlot = document.createElement('slot');
		const rightDiv = document.createElement('div');
		rightDiv.style.display = 'inline-block';
		rightDiv.classList.add('cp-icon-center');
		rightDiv.style.paddingLeft = '3px';
		rightDiv.innerHTML =
			'<svg t=\'1637291848053\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2626\' width=\'20\' height=\'20\'><path d=\'M825.76 246.496L560.256 512l265.504 265.504-48.256 48.256-265.536-265.504-265.472 265.504-48.256-48.256 265.472-265.536-265.472-265.472 48.256-48.256L512 463.744l265.504-265.504z\' fill=\'#bfbfbf\' p-id=\'2627\'></path></svg>';
		rightSlot.append(rightDiv);
		this.Tag = document.createElement('div');
		this.Tag.style.setProperty('display', 'inline');
		if (this.getAttribute('closeicon') && this.getAttribute('tagshow')) {
			rightDiv.addEventListener('click', () => {
				if (this.getAttribute('tagshow') !== 'true') {
					this.setAttribute('tagshow', 'true');
				} else {
					this.setAttribute('tagshow', 'false');
				}
			});

			this.Tag.append(contentSlot, rightSlot);
		} else {
			this.Tag.append(contentSlot);
		}
		shadowRoot.append(this.Tag);
	}
}

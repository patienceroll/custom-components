import { createHtmlElement, setAttributes, style, watch } from 'packages/utils';
import type { CpInputProps } from './data';

@style({
	'.label-standard-focused': {},
	'.label': {
		display: 'inline-block',
		position: 'absolute',
		top: '0',
		left: '0',
		fontSize: '1em',
		height: '1.4375em',
		transform: 'translate()',
	},
	'.input-standard': {
		height: '1.4375em',
		padding: '0.25em 0 0.3125em',
	},
	'.input': {
		border: 'none',
		outline: 'none',
		fontSize: 'inherit',
		backgroundColor: 'transparent',
	},
	'.input-wrapper-standard-focused::after': {
		transform: 'scaleX(1)',
	},
	'.input-wrapper-standard::after': {
		borderBottom: '2px solid #1976d2',
		transform: 'scaleX(0)',
		transformOrigin: 'center',
		transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
	},
	'.input-wrapper-standard::before': {
		borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
	},
	'.input-wrapper-standard': {
		marginTop: '1em',
	},
	'.input-wrapper::before,.input-wrapper::after': {
		position: 'absolute',
		left: '0',
		right: '0',
		bottom: '0',
		content: '"\\00a0"',
		boxSizing: 'inherit',
		pointerEvents: 'none',
	},
	'.input-wrapper:hover::before': {
		borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
	},
	'.input-wrapper': {
		display: 'inline-block',
		position: 'relative',
		boxSizing: 'border-box',
	},
	':host': {
		display: 'inline-block',
		position: 'relative',
		height: '3em',
		fontSize: '16px',
	},
})
@watch<CpInput>({
	variant() {
		this.setVariant();
	},
})
export default class CpInput extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 输入框组件输入框元素 */
	public cpInputInput: HTMLInputElement;
	/** 包裹输入框组件输入框的元素 */
	public cpInputInputWrapper: HTMLDivElement;
	/** 输入框组件Label元素 */
	public cpInputLabel: HTMLLabelElement;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		this.cpInputInput = createHtmlElement('input');
		this.cpInputLabel = createHtmlElement('label');
		this.cpInputInputWrapper = createHtmlElement('div');
		const labelContext = createHtmlElement('slot');

		setAttributes(this.cpInputInput, { id: 'input', class: 'input' });
		setAttributes(this.cpInputLabel, { for: 'input', class: 'label' });
		setAttributes(this.cpInputInputWrapper, { class: 'input-wrapper' });

		this.cpInputInput.addEventListener('focus', this.addFocusStyle.bind(this));
		this.cpInputInput.addEventListener('blur', this.clearFocusStyle.bind(this));

		this.cpInputLabel.appendChild(labelContext);
		this.cpInputInputWrapper.appendChild(this.cpInputInput);
		shadowRoot.append(this.cpInputLabel, this.cpInputInputWrapper);
	}

	/** 设置输入框样式,默认 standard */
	setVariant() {
		this.cpInputInput.classList.remove('input-outlined', 'input-filled', 'input-standard');
		this.cpInputInputWrapper.classList.remove(
			'input-wrapper-outlined',
			'input-wrapper-filled',
			'input-wrapper-standard'
		);
		if (this.cpInputVariant === 'outlined') {
			this.cpInputInput.classList.add('input-outlined');
			this.cpInputInputWrapper.classList.add('input-wrapper-outlined');
		} else if (this.cpInputVariant === 'filled') {
			this.cpInputInput.classList.add('input-filled');
			this.cpInputInputWrapper.classList.add('input-wrapper-filled');
		} else {
			this.cpInputInput.classList.add('input-standard');
			this.cpInputInputWrapper.classList.add('input-wrapper-standard');
		}
	}

	connectedCallback() {
		this.setVariant();
	}

	/** 获取当前组件变体类型 */
	get cpInputVariant() {
		return (this.getAttribute('variant') || 'standard') as NonNullable<CpInputProps['variant']>;
	}

	/** 聚焦的时候,添加css */
	addFocusStyle() {
		this.clearFocusStyle();
		switch (this.cpInputVariant) {
			case 'filled':
				this.cpInputInputWrapper.classList.add('input-wrapper-filled-focused');
				this.cpInputLabel.classList.add('label-filled-focused');
				break;
			case 'outlined':
				this.cpInputInputWrapper.classList.add('input-wrapper-outlined-focused');
				this.cpInputLabel.classList.add('label-outlined-focused');
				break;
			case 'standard':
			default:
				this.cpInputInputWrapper.classList.add('input-wrapper-standard-focused');
				this.cpInputLabel.classList.add('label-standard-focused');
		}
	}

	/** 清除聚焦状态下的css */
	clearFocusStyle() {
		this.cpInputInputWrapper.classList.remove(
			'input-wrapper-standard-focused',
			'input-wrapper-filled-focused',
			'input-wrapper-outlined-focused'
		);
		this.cpInputLabel.classList.remove('label-standard-focused', 'label-filled-focused', 'label-outlined-focused');
	}
}

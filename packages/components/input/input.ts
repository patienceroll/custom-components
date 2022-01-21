import { createHtmlElement, setAttributes, style, watch } from 'packages/utils';
import type { CpInputProps } from './data';

@style({
	/**
	 * ----------------------------------       outlined 样式       -----------------------------------
	 */
	'.fieldset-outlined': {
		position: 'absolute',
		margin: '0',
		inset: '-0.3215em 0 0',
		pointerEvents: 'none',
		borderRadius: 'inherit',
		borderStyle: 'solid',
	},
	'.input-wrapper-outlined-focused,.input-wrapper-outlined-focused:hover': {
		borderColor: 'currentColor',
		borderWidth: '2px',
		padding: '0'
	},
	'.input-wrapper-outlined:hover': {
		borderColor: 'rgba(0, 0, 0, 0.87)',
	},
	'.input-wrapper-outlined': {
		boxSizing: 'border-box',
		padding: '0.0625em',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		borderRadius: '0.25em',
	},
	'.label-outlined-inserted': {
		transform: 'translate(0.71875em,-0.375em) scale(0.75)',
	},
	'.label-outlined-focused': {
		transform: 'translate(0.71875em,-0.375em) scale(0.75)',
		color: 'currentColor',
	},
	'.label-outlined': {
		transform: 'translate(0.71875em,1.25em)',
		transition: 'transform 200ms ease',
		transformOrigin: 'top left',
		backgroundColor: '#fff',
		display: 'block',
		zIndex: '1',
		padding: '0 0.3125em',
		lineHeight: '1em',
		pointerEvents: 'none'
	},
	'.input-outlined': {
		height: '3.25em',
		padding: '0.90625em 0.75em',
		boxSizing: 'border-box',
	},
	':host([variant="outlined"])': {
		boxSizing: 'border-box',
		height: '3.5em',
	},
	/**
	 * ----------------------------------       standard 样式       -----------------------------------
	 */
	'.label-standard-inserted': {
		transform: 'translate(0,0) scale(0.75)',
	},
	'.label-standard-focused': {
		color: 'currentColor',
		transform: 'translate(0,0) scale(0.75)',
	},
	'.label-standard': {
		height: '1.4375em',
		lineHeight: '1.4375em',
		transform: 'translate(0,1.25em) scale(1)',
		transformOrigin: 'top left',
		transition: 'transform ease 200ms',
	},
	'.input-standard': {
		height: '1.4375em',
		padding: '0.25em 0 0.3125em',
	},
	'.fieldset-standard': {
		display: 'none',
	},
	'.input-wrapper-standard-focused::after': {
		transform: 'scaleX(1)',
	},
	'.input-wrapper-standard::after': {
		borderBottom: '2px solid currentColor',
		transform: 'scaleX(0)',
		transformOrigin: 'center',
		transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
	},
	'.input-wrapper-standard:hover::before': {
		borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
	},
	'.input-wrapper-standard::before': {
		borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
	},
	'.input-wrapper-standard::before,.input-wrapper-standard::after': {
		position: 'absolute',
		left: '0',
		right: '0',
		bottom: '0',
		content: '"\\00a0"',
		boxSizing: 'inherit',
		pointerEvents: 'none',
	},
	'.input-wrapper-standard': {
		marginTop: '1em',
	},
	/**
	 * ----------------------------------       基础样式       -----------------------------------
	 */
	'.input': {
		border: 'none',
		outline: 'none',
		fontSize: 'inherit',
		backgroundColor: 'transparent',
	},
	'.input-wrapper': {
		display: 'inline-block',
		position: 'relative',
		boxSizing: 'border-box',
	},
	'.label': {
		display: 'inline-block',
		position: 'absolute',
		top: '0',
		left: '0',
		fontSize: '1em',
		color: 'rgba(0,0,0,0.6)',
	},
	':host': {
		display: 'inline-block',
		position: 'relative',
		height: '3em',
		margin: '0.5em',
		color: '#1976d2',
		fontSize: '16px',
		verticalAlign: 'top',
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
	// /** 输入框组件 fieldset 元素 */
	// public cpInputFieldset: HTMLFieldSetElement;
	// /** 输入框组件 legend 元素 */
	// public cpInputLegend: HTMLLegendElement;
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpInput.styleSheet];

		this.cpInputInput = createHtmlElement('input');
		this.cpInputLabel = createHtmlElement('label');
		this.cpInputInputWrapper = createHtmlElement('div');
		const labelContext = createHtmlElement('slot');
		// this.cpInputFieldset = createHtmlElement('fieldset');
		// this.cpInputLegend = createHtmlElement('legend');

		setAttributes(this.cpInputInput, { id: 'input', class: 'input' });
		setAttributes(this.cpInputLabel, { for: 'input', class: 'label' });
		setAttributes(this.cpInputInputWrapper, { class: 'input-wrapper' });

		this.cpInputInput.addEventListener('focus', this.addFocusStyle.bind(this));
		this.cpInputInput.addEventListener('blur', this.onInputBlur.bind(this));

		this.cpInputLabel.appendChild(labelContext);
		// this.cpInputFieldset.appendChild(this.cpInputLegend);
		// this.cpInputInputWrapper.append(this.cpInputInput, this.cpInputFieldset);
		this.cpInputInputWrapper.append(this.cpInputInput);
		shadowRoot.append(this.cpInputLabel, this.cpInputInputWrapper);
	}

	/** 设置输入框样式,默认 standard */
	setVariant() {
		this.cpInputLabel.classList.remove('label-standard', 'label-outlined', 'label-filled');
		this.cpInputInput.classList.remove('input-outlined', 'input-filled', 'input-standard');
		this.cpInputInputWrapper.classList.remove(
			'input-wrapper-outlined',
			'input-wrapper-filled',
			'input-wrapper-standard'
		);
		// this.cpInputFieldset.classList.remove('fieldset-standard', 'fieldset-outlined', 'fieldset-filled');
		if (this.cpInputVariant === 'outlined') {
			this.cpInputLabel.classList.add('label-outlined');
			this.cpInputInput.classList.add('input-outlined');
			this.cpInputInputWrapper.classList.add('input-wrapper-outlined');
			// this.cpInputFieldset.classList.add('fieldset-outlined');
		} else if (this.cpInputVariant === 'filled') {
			this.cpInputLabel.classList.add('label-filled');
			this.cpInputInput.classList.add('input-filled');
			this.cpInputInputWrapper.classList.add('input-wrapper-filled');
			// this.cpInputFieldset.classList.add('fieldset-filled');
		} else {
			this.cpInputLabel.classList.add('label-standard');
			this.cpInputInput.classList.add('input-standard');
			this.cpInputInputWrapper.classList.add('input-wrapper-standard');
			// this.cpInputFieldset.classList.add('fieldset-standard');
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

	/** 判断当前输入框是否输入了数据,根据不同情况进行样式操作 */
	setInputInsertStyle() {
		const { value } = this.cpInputInput;
		if (value.length === 0)
			this.cpInputLabel.classList.remove('label-standard-inserted', 'label-filled-inserted', 'label-outlined-inserted');
		else {
			switch (this.cpInputVariant) {
				case 'filled':
					this.cpInputLabel.classList.add('label-filled-inserted');
					break;
				case 'outlined':
					this.cpInputLabel.classList.add('label-outlined-inserted');
					break;
				case 'standard':
				default:
					this.cpInputLabel.classList.add('label-standard-inserted');
			}
		}
	}

	/** 当 input元素失去焦点 */
	onInputBlur() {
		this.clearFocusStyle();
		this.setInputInsertStyle();
	}
}

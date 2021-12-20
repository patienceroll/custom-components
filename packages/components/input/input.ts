import { createHtmlElement, setAttributes, style, watch } from 'packages/utils';

@style({
	'.label': {
		display: 'inline-block',
		position: 'absolute',
	},
	'.input-standard': {
		height: '1.4375em',
		padding: '0.25em 0 0.3125em',
	},
	'.input': {
		border: 'none',
		outline: 'none',
		fontSize: 'inherit',
	},
	'.input-wrapper-standard::before': {
		borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
	},
	'.input-wrapper-standard': {
		marginTop: '1em',
	},
	'.input-wrapper::before': {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		content: '"\\00a0"',
		boxSizing: 'inherit',
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
	variant(newer) {
		this.setVariant(newer);
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

		this.cpInputLabel.appendChild(labelContext);
		this.cpInputInputWrapper.appendChild(this.cpInputInput);
		shadowRoot.append(this.cpInputLabel, this.cpInputInputWrapper);
	}

	/** 设置输入框样式,默认 standard */
	setVariant(variant?: string | null) {
		this.cpInputInput.classList.remove('input-outlined', 'input-filled', 'input-standard');
		this.cpInputInputWrapper.classList.remove(
			'input-wrapper-outlined',
			'input-wrapper-filled',
			'input-wrapper-standard'
		);
		if (variant === 'outlined') {
			this.cpInputInput.classList.add('input-outlined');
			this.cpInputInputWrapper.classList.add('input-wrapper-outlined');
		} else if (variant === 'filled') {
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
}

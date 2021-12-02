import { style, watch } from '../../utils/index';
import type { CpPopoverObservedAttributes } from './data';

@style({
	'.cp-popover-right-end': {
		right: '0',
		bottom: '0',
		transform: 'translate(calc(100% + 0.625em),0)',
	},
	'.cp-popover-right-start': {
		right: '0',
		top: '0',
		transform: 'translate(calc(100% + 0.625em),0)',
	},
	'.cp-popover-right': {
		right: '0',
		top: '50%',
		transform: 'translate(calc(100% + 0.625em),-50%)',
	},
	'.cp-popover-left-end': {
		left: '0',
		bottom: '0',
		transform: 'translate(calc(-100% - 0.625em),0)',
	},
	'.cp-popover-left-start': {
		left: '0',
		top: '0',
		transform: 'translate(calc(-100% - 0.625em),0)',
	},
	'.cp-popover-left': {
		left: '0',
		top: '50%',
		transform: 'translate(calc(-100% - 0.625em),-50%)',
	},
	'.cp-popover-top-end': {
		right: '0',
		top: '0',
		transform: 'translate(0,calc(-100% - 0.625em))',
	},
	'.cp-popover-top-start': {
		left: '0',
		top: '0',
		transform: 'translate(0,calc(-100% - 0.625em))',
	},
	'.cp-popover-top': {
		left: '50%',
		top: '0',
		transform: 'translate(-50%,calc(-100% - 0.625em))',
	},
	'.cp-popover-bottom-end': {
		bottom: '0',
		right: '0',
		transform: 'translate(0,calc(100% + 0.625em))',
	},
	'.cp-popover-bottom-start': {
		left: '0',
		bottom: '0',
		transform: 'translate(0,calc(100% + 0.625em))',
	},
	'.cp-popover-bottom': {
		bottom: '0',
		left: '50%',
		transform: 'translate(-50%,calc(100% + 0.625em))',
	},
	'.cp-popover-context-wrapper': {
		position: 'absolute',
		backgroundColor: '#6d6d6d',
		visibility: 'hidden',
	},
	':host': {
		display: 'inline-block',
		position: 'relative',
		fontSize: '16px',
	},
})
@watch<CpPopoverObservedAttributes, AttachedShadowRoot<CpPopover>>(['placement'], function (attr, older, newer) {
	switch (attr) {
		case 'placement':
			if (newer) {
				this.popoverContextWrapper.className = '';
				this.popoverContextWrapper.classList.add(`cp-popover-context-wrapper`, `cp-popover-${newer}`);
			} else this.popoverContextWrapper.className = `cp-popover-context-wrapper cp-popover-top`;

			break;
	}
})
export default class CpPopover extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;

	/** 悬浮气泡内容容器 */
	public popoverContextWrapper: HTMLDivElement;

	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpPopover.styleSheet];

		const children = document.createElement('slot');
		this.popoverContextWrapper = document.createElement('div');
		const context = document.createElement('slot');

		context.name = 'popover-context';

		this.popoverContextWrapper.classList.add('cp-popover-context-wrapper', 'cp-popover-top');

		const hidePopOverContext = (event: Event) => {
			const { type } = event;
			if (type === 'mouseleave' && this.disableHover) return;
			if (type === 'focusout' && this.disableFocus) return;
			if (type === 'click' && this.disableClick) return;
			this.popoverContextWrapper.style.removeProperty('visibility');
		};

		const showPopoverContext = (event: Event) => {
			const { type } = event;
			event.stopPropagation();
			if (type === 'mouseenter' && this.disableHover) return;
			if (type === 'click' && this.disableClick) return;
			if (type === 'focusin' && this.disableFocus) return;

			// 添加点击事件隐藏的方法
			if (type === 'click') this.ownerDocument.addEventListener('click', hidePopOverContext, { once: true });
			this.popoverContextWrapper.style.visibility = 'unset';
		};

		this.addEventListener('mouseenter', showPopoverContext);
		this.addEventListener('focusin', showPopoverContext);
		this.addEventListener('click', showPopoverContext);

		this.addEventListener('mouseleave', hidePopOverContext);
		this.addEventListener('focusout', hidePopOverContext);

		this.popoverContextWrapper.appendChild(context);
		shadowRoot.append(children, this.popoverContextWrapper);
	}

	/** 是否禁用hover触发 */
	get disableHover() {
		return this.getAttribute('disable-hover') === 'true';
	}

	/** 是否禁用点击触发 */
	get disableClick() {
		return this.getAttribute('disable-click') === 'true';
	}

	/** 是否禁用聚焦触发 */
	get disableFocus() {
		return this.getAttribute('disable-focus') === 'true';
	}
}

import type { CpRateObservedAttributes } from './data';

import { style, watch } from '../../utils/decorators';

@style({
	':host': {
		display: 'inline-block',
		fontSize: '24px',
		height: '24px',
		verticalAlign: 'middle',
	},
})
@watch<CpRateObservedAttributes, AttachedShadowRoot<CpRate>>(['value', 'precision'], function (attr, older, newer) {
	switch (attr) {
		case 'value':
			break;
		case 'precision':
			break;
		case 'highest':
			break;
	}
})
export default class CpRate extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [CpRate.styleSheet];
		const slot = document.createElement('slot');

		this.addEventListener('rate', (event) => {
			const { detail } = event as CustomEvent<{ value: number; domEvent: MouseEvent }>;
			const { value: rateItemValue, domEvent } = detail;
			const rateItems = Array.from(this.rateItems.values());
			const index = rateItems.findIndex((item) => item === domEvent.target);
			const perRateItemValue = this.highest / rateItems.length;
			/** 当前事件触发的评分value值 */
			const eventValue = perRateItemValue * index + perRateItemValue * rateItemValue;
			/** 计算出来的评分应该展示几个星 */
			const measureIndex = Math.floor(eventValue / perRateItemValue);

			/** 余下的需要分配到单个评分的值 */
			const remaindEventValue = eventValue % perRateItemValue;
			const precision = this.precision;
			/** 余下的需要分配到单个评分的值按照精度的余数 */
			const remaindRateItemValue = remaindEventValue % precision;
			/** 精度不应该大于单个评分的值,不然会导致显示错误，程序不管这个问题,交由用户控制 */
			const measureRateItemValue = parseInt(
				`${
					remaindRateItemValue < precision / 2
						? remaindEventValue - remaindRateItemValue
						: remaindEventValue + (precision - remaindRateItemValue)
				}`
			);
			rateItems.forEach((item, i) => {
				if (i < measureIndex) {
					item.setAttribute('value', '100');
				} else if (i === index) {
					item.setAttribute('value', `${(measureRateItemValue / perRateItemValue) * 100}`);
				} else {
					item.setAttribute('value', '0');
				}
			});
			this.dispatchEvent(
				new CustomEvent('change', {
					detail: {
						value: measureIndex * perRateItemValue + measureRateItemValue,
					},
				})
			);
		});

		shadowRoot.appendChild(slot);
	}

	/** 评分组件下的所有 “单个评分” */
	get rateItems() {
		return this.querySelectorAll('cp-rate-item');
	}

	/** 评分的精度,默认为 5 */
	get precision() {
		const precision = Number(this.getAttribute('precision'));
		return Number.isNaN(precision) ? precision : 5;
	}

	/** 评分的最高值,默认 100 */
	get highest() {
		const highest = Number(this.getAttribute('highest'));
		return Number.isNaN(highest) ? highest : 100;
	}
}

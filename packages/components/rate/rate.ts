import type { CpRateObservedAttributes } from './data';

import { style, watch } from '../../utils/decorators';
import { useLatestCall } from 'packages/utils/common-functions';

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
			const { value, domEvent } = detail;
			const rateItems = Array.from(this.rateItems.values());
			const index = rateItems.findIndex((item) => item === domEvent.target);
			if (index !== -1) this.renderRateItems(((index + value) * this.highest) / rateItems.length);
		});

		this.addEventListener(
			'moverate',
			useLatestCall((event) => {
				const { detail } = event as CustomEvent<{ value: number; domEvent: MouseEvent }>;
				const { value, domEvent } = detail;
				const rateItems = Array.from(this.rateItems.values());
				const index = rateItems.findIndex((item) => item === domEvent.target);
				if (index !== -1) this.renderRateItems(((index + value) * this.highest) / rateItems.length);
			})
		);

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

	/** 根据当前分数绘制单个评分的颜色 */
	renderRateItems(rate: number) {
		const { precision, highest } = this;
		const rateItems = Array.from(this.rateItems.values());
		/** 每个星标识的评分值 */
		const perRateItemValue = highest / rateItems.length;
		/** 全部点亮的星个数 */
		const lightRateItems = Math.floor(rate / perRateItemValue);
		/** 计算部分点亮的单个评分所需要的值 */
		const rateItemValue = rate % perRateItemValue;
		/** 部分点亮的单个评分的值按照精度的余数 */
		const remaindRateItemValue = rateItemValue % precision;
		/** 精度不应该大于单个评分的值,不然会导致显示错误，程序不管这个问题,交由用户控制 */
		const measureRateItemValue = parseInt(
			`${
				remaindRateItemValue < precision / 2
					? rateItemValue - remaindRateItemValue
					: rateItemValue + (precision - remaindRateItemValue)
			}`
		);
		rateItems.forEach((item, i) => {
			if (i < lightRateItems) {
				item.setAttribute('value', '100');
			} else if (i === lightRateItems) {
				item.setAttribute('value', `${(measureRateItemValue / perRateItemValue) * 100}`);
			} else {
				item.setAttribute('value', '0');
			}
		});
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: {
					value: lightRateItems * perRateItemValue + measureRateItemValue,
				},
			})
		);
	}
}

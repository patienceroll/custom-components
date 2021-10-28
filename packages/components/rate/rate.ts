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
			const value = Number(newer);
			if (!Number.isNaN(value)) {
				const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(value);
				this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
			} else throw new Error('错误的value值');
			break;
		case 'precision':
			break;
		case 'highest':
			break;
		case 'disable':
			if (newer) this.rateItems.forEach((item) => item.setAttribute('disable', newer));
			else this.rateItems.forEach((item) => item.removeAttribute('disable'));
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
			if (index !== -1) {
				const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(
					((index + value) * this.highest) / rateItems.length
				);
				this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
				this.onChange(lightRateNum * perRateItemValue + partOfLightRateValue);
			}
		});

		this.addEventListener(
			'moverate',
			useLatestCall((event) => {
				const { detail } = event as CustomEvent<{ value: number; domEvent: MouseEvent }>;
				const { value, domEvent } = detail;
				const rateItems = Array.from(this.rateItems.values());
				const index = rateItems.findIndex((item) => item === domEvent.target);
				if (index !== -1) {
					const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(
						((index + value) * this.highest) / rateItems.length
					);
					this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
					this.dispatchEvent(
						new CustomEvent('changehover', {
							detail: {
								value: lightRateNum * perRateItemValue + partOfLightRateValue,
							},
						})
					);
				}
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
		const precision = this.getAttribute('precision');
		return precision ? Number(precision) : 5;
	}
	/** 评分的最高值,默认 100 */
	get highest() {
		const highest = this.getAttribute('highest');
		return highest ? Number(highest) : 100;
	}

	/** 当前组件的值 */
	get value() {
		const value = this.getAttribute('value');
		return value ? Number(value) : this.highest;
	}

	/** 根据当前分数计算渲染参数 */
	calculateRenderParams(rate: number) {
		const { precision, highest } = this;
		const rateItems = Array.from(this.rateItems.values());
		/** 每个星标识的评分值 */
		const perRateItemValue = highest / rateItems.length;
		/** 全部点亮的星个数 */
		const lightRateNum = Math.floor(rate / perRateItemValue);

		/** 计算部分点亮的单个评分所需要的值 */
		const rateItemValue = rate % perRateItemValue;
		/** 部分点亮的单个评分的值按照精度的余数 */
		const remaindRateItemValue = rateItemValue % precision;
		/**  部分点亮的星经过精度计算后的值,精度不应该大于单个评分的值,不然会导致显示错误，程序不管这个问题,交由用户控制 */
		const partOfLightRateValue = parseInt(
			`${
				remaindRateItemValue < precision / 2
					? rateItemValue - remaindRateItemValue
					: rateItemValue + (precision - remaindRateItemValue)
			}`
		);

		return {
			lightRateNum,
			partOfLightRateValue,
			perRateItemValue,
		};
	}

	/** 根据需要点亮的星的个数，和部分点亮的星的值渲染 */
	renderLightItem(lightRateNum: number, partOfLightRatePercent: number) {
		Array.from(this.rateItems.values()).forEach((item, i) => {
			if (i < lightRateNum) {
				item.setAttribute('value', '100');
			} else if (i === lightRateNum) {
				item.setAttribute('value', `${partOfLightRatePercent * 100}`);
			} else {
				item.setAttribute('value', '0');
			}
		});
	}

	onChange(value: number) {
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: {
					value,
				},
			})
		);
	}
}

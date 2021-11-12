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
@watch<CpRateObservedAttributes, AttachedShadowRoot<CpRate>>(
	['value', 'precision', 'highest', 'disable', 'readonly', 'custom', 'base-color', 'light-color'],

	function (attr, older, newer) {
		switch (attr) {
			case 'value':
				if (newer && !Number.isNaN(Number(newer))) this.setRealValue(Number(newer));
				break;
			case 'precision':
				this.renderRate();
				break;
			case 'highest':
				this.renderRate();
				break;
			case 'custom':
				if (newer) this.rateItems.forEach((item) => item.setAttribute('custom', newer));
				else this.rateItems.forEach((item) => item.removeAttribute('custom'));
				break;
			case 'disable':
				if (newer === 'true') this.rateItems.forEach((item) => item.setAttribute('disable', newer));
				else this.rateItems.forEach((item) => item.removeAttribute('disable'));
				break;
			case 'readonly':
				if (newer === 'true') this.rateItems.forEach((item) => item.setAttribute('readonly', newer));
				else this.rateItems.forEach((item) => item.removeAttribute('readonly'));
				break;
			case 'base-color':
				if (newer) this.rateItems.forEach((item) => item.setAttribute('base-color', newer));
				else this.rateItems.forEach((item) => item.removeAttribute('base-color'));
				break;
			case 'light-color':
				if (newer) this.rateItems.forEach((item) => item.setAttribute('light-color', newer));
				else this.rateItems.forEach((item) => item.removeAttribute('light-color'));
				break;
		}
	}
)
export default class CpRate extends HTMLElement implements CustomElement {
	static styleSheet: CSSStyleSheet;
	/** 如果是受控的评分,会把value的值同步过来,如果是非受控的,则在组件内部控制 */
	public realValue = this.highest;
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
				const newRealValue = lightRateNum * perRateItemValue + partOfLightRateValue;

				const valueAttr = this.getAttribute('value');
				/** 如果是非受控的,才会去渲染评分 */
				if (!valueAttr || Number.isNaN(Number(valueAttr))) {
					this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
					this.realValue = newRealValue;
				}
				this.dispatchEvent(
					new CustomEvent('change', {
						detail: {
							value: newRealValue,
						},
					})
				);
			}
		});

		this.addEventListener('moverate', (event) => {
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
		});

		/** useLatestcall 的原因是,rateItem 的 moverate 也使用了 useLatestcall,
		 * 保证 mouseleave 是在 moverate之后触发 */
		this.addEventListener(
			'mouseleave',
			useLatestCall(() => {
				const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(this.realValue);
				this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
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
		return precision && !Number.isNaN(precision) ? Number(precision) : 5;
	}
	/** 评分的最高值,默认 100 */
	get highest() {
		const highest = this.getAttribute('highest');
		return highest && !Number.isNaN(highest) ? Number(highest) : 100;
	}

	/** 当前组件的值 */
	get value() {
		const value = this.getAttribute('value');
		return value && !Number.isNaN(value) ? Number(value) : this.highest;
	}

	/** 设置组件展示的真实值 */
	setRealValue(value: number) {
		this.realValue = value;
		const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(value);
		this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
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

	/** 渲染评分 */
	renderRate() {
		const { lightRateNum, partOfLightRateValue, perRateItemValue } = this.calculateRenderParams(this.realValue);
		this.renderLightItem(lightRateNum, partOfLightRateValue / perRateItemValue);
	}
}

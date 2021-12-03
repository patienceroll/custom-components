/**
 * ## 自定义元素或者html元素的属性值转化为Number
 * @param target 当前属性值的target
 * @param attrName 属性值名
 * @param notANumberInstead 如果转化后的属性值是NaN,则返回这个值
 * @returns 属性值
 */
export default function AttrToNumber(target: CustomElement, attrName: string, notANumberInstead?: number) {
	const value = target.getAttribute(attrName);
	return value && !Number.isNaN(value) ? Number(value) : notANumberInstead;
}

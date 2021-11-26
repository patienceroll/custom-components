/**
 * ## 自定义元素或者html元素的属性值转化为Number
 * @param target 获取属性值的目标元素
 * @param attrName 目标元素的属性值名
 * @param notANumberInstead 如果属性值不能转化为Number,返回这个替代值
 * @returns 属性值
 */
export default function AttrToNumber(target: CustomElement, attrName: string, notANumberInstead: number) {
	const value = target.getAttribute(attrName);
	return value && !Number.isNaN(value) ? Number(value) : notANumberInstead;
}

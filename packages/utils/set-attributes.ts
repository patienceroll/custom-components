/** ### 给 Element 设置多个属性 */
export default function setAttributes(target: Element, attrs: Record<string, string>) {
	Object.keys(attrs).forEach((key) => target.setAttribute(key, attrs[key]));
}

/** ## 向html定义 custom components */
export default function defineCustomComponents(name: string, componentsClass: CustomElementConstructor) {
	if (!customElements.get(name)) customElements.define(name, componentsClass);
}

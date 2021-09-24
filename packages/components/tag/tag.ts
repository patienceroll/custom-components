import type { TagObservedAttributes } from './data';

export default class CpTag extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({
			mode: 'open',
		});
	}

	static observedAttributes: TagObservedAttributes[] = ['show'];
	attributeChangedCallback(
		this: AttachedShadowRoot<CpTag>,
		attr: TagObservedAttributes,
		older: string | null,
		newer: string | null
	) {
		switch (attr) {
		}
	}
}

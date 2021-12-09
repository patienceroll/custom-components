import { defineCustomComponents } from "../../utils";

class CpSwitch extends HTMLElement implements CustomElement {
	constructor() {
		super();
	}
}
defineCustomComponents("cp-switch", CpSwitch);

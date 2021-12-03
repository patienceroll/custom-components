import CpRadio from "./radio";
import CpRadioGroup from "./radio-group";

if (customElements.get("cp-radio") === undefined) {
	customElements.define("cp-radio", CpRadio);
}
if (customElements.get("cp-radio-group") === undefined) {
	customElements.define("cp-radio-group", CpRadioGroup);
}

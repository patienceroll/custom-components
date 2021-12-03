import CpRate from "./rate";
import CpRateItem from "./rate-item";

if (!customElements.get("cp-rate")) customElements.define("cp-rate", CpRate);
if (!customElements.get("cp-rate-item")) customElements.define("cp-rate-item", CpRateItem);

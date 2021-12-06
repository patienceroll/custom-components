import CpTabs from "./tabs";
import CpTab from "./tab";
import CpTabPanel from "./tab-panel";
import CpContext from "./tab-context";

if (!customElements.get("cp-tab")) customElements.define("cp-tab", CpTab);
if (!customElements.get("cp-tabs")) customElements.define("cp-tabs", CpTabs);
if (!customElements.get("cp-tab-panel")) customElements.define("cp-tab-panel", CpTabPanel);
if (!customElements.get("cp-tab-context")) customElements.define("cp-tab-context", CpContext);

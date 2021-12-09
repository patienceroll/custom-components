import CpTabs from "./tabs";
import CpTab from "./tab";
import CpTabPanel from "./tab-panel";
import CpContext from "./tab-context";

if (!customElements.get("cp-tab")) defineCustomComponents("cp-tab", CpTab);
if (!customElements.get("cp-tabs")) defineCustomComponents("cp-tabs", CpTabs);
if (!customElements.get("cp-tab-panel")) defineCustomComponents("cp-tab-panel", CpTabPanel);
if (!customElements.get("cp-tab-context")) defineCustomComponents("cp-tab-context", CpContext);

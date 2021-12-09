import { defineCustomComponents } from "../../utils";

import CpTabs from "./tabs";
import CpTab from "./tab";
import CpTabPanel from "./tab-panel";
import CpContext from "./tab-context";

defineCustomComponents("cp-tab", CpTab);
defineCustomComponents("cp-tabs", CpTabs);
defineCustomComponents("cp-tab-panel", CpTabPanel);
defineCustomComponents("cp-tab-context", CpContext);

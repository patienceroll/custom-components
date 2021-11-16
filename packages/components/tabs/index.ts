import CpTabs from './tabs';
import CpTab from './tab';
import CpTabPanel from './tab-panel';

if (!customElements.get('cp-tab')) customElements.define('cp-tab', CpTab);
if (!customElements.get('cp-tabs')) customElements.define('cp-tabs', CpTabs);
if (!customElements.get('cp-tab-panel')) customElements.define('cp-tab-panel', CpTabPanel);

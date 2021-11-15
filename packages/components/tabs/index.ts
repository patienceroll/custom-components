import CpTabs from './tabs';
import CpTab from './tab';

if (!customElements.get('cp-tab')) customElements.define('cp-tab', CpTab);
if (!customElements.get('cp-tabs')) customElements.define('cp-tabs', CpTabs);

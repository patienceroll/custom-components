import CpButton from './button';
import CpIconButton from './icon-button';

if (!customElements.get('cp-button')) customElements.define('cp-button', CpButton);
if (!customElements.get('cp-icon-button')) customElements.define('cp-icon-button', CpIconButton);

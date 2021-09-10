import CpTag from './tag.js';
import CpTag$1 from './tag.rewrite.js';

if (!customElements.get("cp-tag"))
    customElements.define("cp-tag", CpTag);
if (!customElements.get("cp-tag-rewrite"))
    customElements.define("cp-tag-rewrite", CpTag$1);

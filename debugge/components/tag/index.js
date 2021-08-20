import Tag from './tag.js';

if (!customElements.get("cp-tag"))
    customElements.define("cp-tag", Tag);

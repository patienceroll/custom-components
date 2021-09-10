import CpTag from "./tag";
import CpTagRewrite from "./tag.rewrite";

if (!customElements.get("cp-tag")) customElements.define("cp-tag", CpTag);
if (!customElements.get("cp-tag-rewrite"))
  customElements.define("cp-tag-rewrite", CpTagRewrite);

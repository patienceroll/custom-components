import CpAccordionItem from "./accordion-item";
import CpAccordion from "./accordion";

if (!customElements.get("cp-accordion")) customElements.define("cp-accordion", CpAccordion);
if (!customElements.get("cp-accordion-item")) customElements.define("cp-accordion-item", CpAccordionItem);

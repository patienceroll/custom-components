import CpAccordion from "packages/components/accordion/accordion";
import CpAccordionItem from "packages/components/accordion/accordion-item";
import CpAvatar from "packages/components/avatar/avatar";
import CpButton from "packages/components/button/button";
import CpIconButton from "packages/components/button/icon-button";
import CpCircularProgress from "packages/components/circular-progress/circular-progress";
import CpDialog from "packages/components/dialog/dialog";
import CpDrawer from "packages/components/drawer/drawer";
import CpMask from "packages/components/mask/mask";
import CpMessage from "packages/components/message/message";
import CpPaper from "packages/components/paper/paper";
import CpPopover from "packages/components/popover/popover";
import CpRadio from "packages/components/radio/radio";
import CpRadioGroup from "packages/components/radio/radio-group";
import CpRate from "packages/components/rate/rate";
import CpRateItem from "packages/components/rate/rate-item";
import CpRipple from "packages/components/ripple/ripple";
import CpSkeleton from "packages/components/skeleton/skeleton";
import CpSlider from "packages/components/slider/slider";
import CpSwitch from "packages/components/switch/switch";
import CpTab from "packages/components/tabs/tab";
import CpTabContext from "packages/components/tabs/tab-context";
import CpTabPanel from "packages/components/tabs/tab-panel";
import CpTabs from "packages/components/tabs/tabs";
import CpTag from "packages/components/tag/tag";
import CpInput from "packages/components/text-filed/text-filed";
import CpTooltip from "packages/components/tooltip/tooltip";

interface HTMLS extends HTMLElementTagNameMap {
	"cp-accordion": AttachedShadowRoot<CpAccordion>;
	"cp-accordion-item": AttachedShadowRoot<CpAccordionItem>;
	"cp-avatar": AttachedShadowRoot<CpAvatar>;
	"cp-button": AttachedShadowRoot<CpButton>;
	"cp-icon-button": AttachedShadowRoot<CpIconButton>;
	"cp-circular-progress": AttachedShadowRoot<CpCircularProgress>;
	"cp-dialog": AttachedShadowRoot<CpDialog>;
	"cp-drawer": AttachedShadowRoot<CpDrawer>;
	"cp-mask": AttachedShadowRoot<CpMask>;
	"cp-message": AttachedShadowRoot<CpMessage>;
	"cp-paper": AttachedShadowRoot<CpPaper>;
	"cp-radio": AttachedShadowRoot<CpRadio>;
	"cp-radio-group": AttachedShadowRoot<CpRadioGroup>;
	"cp-rate": AttachedShadowRoot<CpRate>;
	"cp-rate-item": AttachedShadowRoot<CpRateItem>;
	"cp-ripple": AttachedShadowRoot<CpRipple>;
	"cp-skeletion": AttachedShadowRoot<CpSkeleton>;
	"cp-slider": AttachedShadowRoot<CpSlider>;
	"cp-tab": AttachedShadowRoot<CpTab>;
	"cp-tabs": AttachedShadowRoot<CpTabs>;
	"cp-tab-panel": AttachedShadowRoot<CpTabPanel>;
	"cp-tab-context": AttachedShadowRoot<CpTabContext>;
	"cp-tag": AttachedShadowRoot<CpTag>;
	"cp-tooltip": AttachedShadowRoot<CpTooltip>;
	"cp-popover": AttachedShadowRoot<CpPopover>;
	"cp-text-field": AttachedShadowRoot<CpInput>;
	"cp-switch": AttachedShadowRoot<CpSwitch>;
	"cp-skeleton": AttachedShadowRoot<CpSkeleton>;
}

/** ### 创建html元素（包括自定义组件）
 * - 此方法暂时还没有包含 createElement 的 is 配置
 */
export function createHtmlElement<TagName extends keyof HTMLS>(tagName: TagName) {
	return document.createElement(tagName) as HTMLS[TagName];
}

/** ### 创建svg元素 */
export function createSvgElement<TagName extends keyof SVGElementTagNameMap>(tagName: TagName) {
	return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

/** ## 向html定义 custom components */
export function defineCustomComponents(
	name: Exclude<keyof HTMLS, keyof HTMLElementTagNameMap>,
	componentsClass: CustomElementConstructor
) {
	if (!customElements.get(name)) customElements.define(name, componentsClass);
}

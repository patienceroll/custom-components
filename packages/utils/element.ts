import type CpAccordion from "packages/components/accordion/accordion";
import type CpAccordionItem from "packages/components/accordion/accordion-item";
import type CpAvatar from "packages/components/avatar/avatar";
import type CpButton from "packages/components/button/button";
import type CpIconButton from "packages/components/button/icon-button";
import type CpCircularProgress from "packages/components/circular-progress/circular-progress";
import type CpDialog from "packages/components/dialog/dialog";
import type CpDrawer from "packages/components/drawer/drawer";
import type CpMask from "packages/components/mask/mask";
import type CpMessage from "packages/components/message/message";
import type CpPaper from "packages/components/paper/paper";
import type CpPopover from "packages/components/popover/popover";
import type CpRadio from "packages/components/radio/radio";
import type CpRadioGroup from "packages/components/radio/radio-group";
import type CpRate from "packages/components/rate/rate";
import type CpRateItem from "packages/components/rate/rate-item";
import type CpRipple from "packages/components/ripple/ripple";
import type CpSkeleton from "packages/components/skeleton/skeleton";
import type CpSlider from "packages/components/slider/slider";
import type CpSwitch from "packages/components/switch/switch";
import type CpTab from "packages/components/tabs/tab";
import type CpTabContext from "packages/components/tabs/tab-context";
import type CpTabPanel from "packages/components/tabs/tab-panel";
import type CpTabs from "packages/components/tabs/tabs";
import type CpTag from "packages/components/tag/tag";

import type CpTooltip from "packages/components/tooltip/tooltip";

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

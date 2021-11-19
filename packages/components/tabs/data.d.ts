/** tab选项的属性 */
export interface TabProps extends HTMLElement {
	/** 当前tab是否激活 */
	active?: BooleanCharacter;
	/** 当前tab的key,Tabs依据这个值激活tab */
	key: string;
}

/** tabs选项的属性 */
export interface TabsProps extends HTMLElement {
	/** 当前激活的tab key */
	'active-key'?: string;
	/** tab是否居中显示 */
	'center'?: BooleanCharacter;
}

/** tabPanel 的属性 */
export interface TabPanelProps extends HTMLElement {
	/** 当前tab是否激活 */
	active?: BooleanCharacter;
	/** 当前tabPanel的key,TabContext依据这个值激活tabPanel */
	key: string;
}

/** tabContext 属性 */
export interface TabContext extends HTMLElement {
	/** 当前激活的tab key */
	'active-key'?: string;
}

export type CpTabContextObservedAttributes = 'active-key';

export type CpTabsObservedAttributes = 'center' | 'active-key';

export type CpTabObservedAttributes = 'key';

export type CpTabPanelObservedAttributes = 'active';

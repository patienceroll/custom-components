import type { TagObservedAttributes } from './data';

import { style,watch } from '../../utils/decorators';
@style({
	'.cp-tag-box':{
		position:'relactive',
	},
	'.cp-tag-content':{
		position:'absolute',
		top:'50%',
		left:'50%',
		transform:'translate(-50%,-50%)'
	},
	'.color':{
		color:'red'
	},
	':host(:hover)':{
		cursor:'pointer'
	},
	':host':{
		borderRadius:'0.25em'
	}
	
})
@watch<TagObservedAttributes,AttachedShadowRoot<CpTag>>(
	['color' ,'show', 'closable','pure-background' , 'onclose','size'],
	function(attr,older,newer){
		console.log(attr)
		switch(attr){
			case 'color' :
				this.style.setProperty('color',attr)
				this.style.setProperty('background',attr)
				this.style.setProperty('border',`1px solid ${newer}`)
			case 'size':
				if(newer == 'mini'){
					this.style.setProperty('padding','0.1em')
				}else if(newer == 'small'){
					this.style.setProperty('padding','0.2em')
				}else if(newer == 'medium'){
					this.style.setProperty('padding','0.3em')
				}
				
		}
	}
)
export default class CpTag extends HTMLElement implements CustomElement{
	static styleSheet: CSSStyleSheet;
	public Tag : HTMLElement;
	constructor() {
		super();
		const shadowRoot = this.attachShadow({
			mode: 'open',
		});
		// 挂载唯一样式表
		shadowRoot.adoptedStyleSheets = [CpTag.styleSheet];

		// 创建dom元素
		//创建插槽
		
		const contentSlot = document.createElement('slot')
		this.Tag = document.createElement('div')
		this.Tag.style.setProperty('display','inline')
		this.Tag.append(contentSlot)

		shadowRoot.append(this.Tag);
	}


}

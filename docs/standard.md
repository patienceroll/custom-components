## 基础代码规范

#### 组件

1. 组件前缀都以 cp 命名(意为 custom ponents),形式为 cp-\[customPonentsName\],同时符合 html 自定义组件的标准, 必须添加 - 以区分 html 原生标签。

#### 事件处理

1. 组件的自定义方法(如: Tag 组件的 close 方法),需要把触发方法的 DOM 事件通过 Detail 传递出去,字段为 domEvent。
2. 自定义事件的 type 分为两种情况,如果是暴露给外部使用的,直接暴露名字,如果是组件之间通信用到的,名为 组件名 + 事件, Tag 组件的 close 方法命名为 close,而折叠面板与父组件通信的事件,名为 cp-accordion-item-expand

```javascript
closeIcon.onclick = (event) => {
	const customEvent = new CustomEvent('cp-tag-close', {
		detail: {
			domEvent: event,
		},
	});
	this.dispatchEvent(customEvent);
};
```

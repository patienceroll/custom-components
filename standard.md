## 基础代码规范

#### 组件

1. 组件前缀都以 cp 命名(意为 custom ponents),同时符合 html 自定义组件的标准, 必须添加 - 以区分 html 原生标签。

#### 样式

1. 样式变量在 css/index.css 里面声明,同时加以 cp 前缀。
2. 注意样式简洁,最好不要有多余的代码,如样式代码功能重复,样式代码无意义的情况。
3. 动画则以 cp-animate 前缀命名

#### 事件处理

1. 组件的自定义方法(如：Tag 的 onclose 方法),需要把触发方法的 DOM 事件通过 Detail 传递出去,字段为 domEvent

```javascript
closeIcon.onclick = (event) => {
  const customEvent = new CustomEvent("close", {
    detail: {
      domEvent: event,
    },
  });
  this.dispatchEvent(customEvent);
};
```

- [CustomEvent 相关资料](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

#### Web Components 相关资料

- [MDN Web Componets](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
- [阮一峰 Web Componets 教程](https://www.bookstack.cn/read/webapi-tutorial/docs-webcomponents.md)
- [Google Developer Web Componets](https://developers.google.com/web/fundamentals/web-components)

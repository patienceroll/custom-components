## 基础代码规范

#### 组件

1. 组件前缀都以 cp 命名(意为 custom ponents),形式为 cp-\[customPonentsName\],同时符合 html 自定义组件的标准, 必须添加 - 以区分 html 原生标签。

#### 事件处理

1. 组件的自定义方法(如: Tag 组件的 onclose 方法),需要把触发方法的 DOM 事件通过 Detail 传递出去,字段为 domEvent。

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


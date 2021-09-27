> 基础弹窗组件

- 支持插入任意节点。
- 支持代码调用展示弹窗。
- 支持打开抽屉式组件
- 支持从不同方向弹出抽屉
- 渐入渐出弹出隐藏动画。

| 参数          | 说明               | 类型                          | 默认值  |
| ------------- | ------------------ | ----------------------------- | ------- |
| open          | 是否显示抽屉       | boolean                       | false   |
| show          | 打开弹窗方法       | function                      | -       |
| hiden         | 隐藏弹窗方法       | function                      | -       |
| mask-closable | 点击蒙层关闭弹窗   | boolean                       | true    |
| type          | 弹窗或者抽屉组件   | 'modal' 'drawer'              | 'modal' |
| direction     | 从不同方位弹出抽屉 | 'top' 'bottom' 'left' 'right' | 'right' |

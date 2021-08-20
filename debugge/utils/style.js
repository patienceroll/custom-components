/** 给html元素添加行内样式 */
const elementAddStyles = (element, style) => {
    Object.keys(style).forEach((key) => {
        element.style.setProperty(key, style[key] || null);
    });
};

export { elementAddStyles };

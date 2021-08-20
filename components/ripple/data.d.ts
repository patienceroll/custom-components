/** 涟漪起始点数据 */
export type PiplePoint = {
  /** 涟漪相对父级起始点 top */
  top: number;
  /** 涟漪相对父级起始点 left */
  left: number;
  /** 父级宽度 */
  parentWidth: number;
  /** 父级高度 */
  parentHeight: number;
  /** 变化动画时间 */
  transitionDuration: CSSStyleDeclaration["transitionDuration"];
  /** 涟漪颜色 */
  rippleColor: CSSStyleDeclaration["color"];
};

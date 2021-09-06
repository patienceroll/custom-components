export type TagType = "success" | "processing" | "warning" | "error";

export interface TagProps {
  color?: TagType | CSSStyleDeclaration["color"];
  /** 是否可关闭 */
  closable?: "true";
  /** 受控状态下是否显示 */
  show?: "true" | "false";
  /** 是否展示纯色背景,默认false */
  "pure-background"?: "true" | "false";
  onclose?: (
    event: CustomEvent<{ domEvent: MouseEvent; show?: boolean }>
  ) => void;
}

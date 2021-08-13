export type TagType = "success" | "processing" | "warning" | "errror";

export interface TagProps {
  color?: TagType | CSSStyleDeclaration["color"];
  closable?: "true";
  show?: "true" | "false";
  onclose: () => {};
}

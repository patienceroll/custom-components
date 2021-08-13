export type TagType = "success" | "processing" | "warning" | "errror";

export interface TagProps {
  color?: TagType | CSSStyleDeclaration["color"];
  closable?: "true";
  show?: "true" | "false";
  onclose?: (
    event: CustomEvent<{ domEvent: MouseEvent; show?: boolean }>
  ) => void;
}

export default class CpTag extends HTMLElement {
  static CpTagStyleSheet = (() => {
    const sheet = new CSSStyleSheet();
  })();
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const container = document.createElement("span");
    const iconSlot = document.createElement("slot");
    const textSlot = document.createElement("slot");
    const closeIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    closeIcon.setAttribute("width", "20");
    closeIcon.setAttribute("height", "20");
    closeIcon.setAttribute("viewBox", "0 0 1024 1024");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M636.226641 510.516239l290.305586-290.305586c21.795943-21.795943 25.582093-53.517738 8.288598-70.708904l-63.341261-63.341261c-17.191166-17.191166-48.810633-13.405016-70.708904 8.390926L510.567403 384.857 220.261817 94.551414c-21.795943-21.795943-53.517738-25.582093-70.708904-8.390926l-63.341261 63.341261c-17.191166 17.191166-13.507345 48.912961 8.390926 70.708904l290.305586 290.305586L94.704907 800.821825c-21.795943 21.795943-25.582093 53.415409-8.390926 70.708904l63.341261 63.341261c17.191166 17.191166 48.912961 13.507345 70.708904-8.288598l290.305586-290.305586 290.203258 290.305586c21.898271 21.898271 53.517738 25.582093 70.708904 8.390926l63.341261-63.341261c17.191166-17.191166 13.507345-48.912961-8.288598-70.708904L636.226641 510.516239 636.226641 510.516239z"
    );

    closeIcon.appendChild(path);

    iconSlot.name = "icon";

    container.append(iconSlot, textSlot, closeIcon);
    shadowRoot.appendChild(container);
  }
}

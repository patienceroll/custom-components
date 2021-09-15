class CpCircularProgress extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [
            CpCircularProgress.CpCircularProgressStyleSheet,
        ];
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svg.setAttribute("class", "cp-circular-progress");
        svg.setAttribute("viewBox", "8 8 44 44");
        circle.setAttribute("cx", "22");
        circle.setAttribute("cy", "22");
        circle.setAttribute("r", "22");
        circle.setAttribute("stroke-width", "3");
        svg.appendChild(circle);
        shadowRoot.appendChild(svg);
    }
}
CpCircularProgress.CpCircularProgressStyleSheet = (() => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(`:host {
      display: block;
    }`, 0);
    styleSheet.insertRule(`.cp-circular-progress {
      width: 100%;
      height: 100%;
    }`, 0);
    return styleSheet;
})();

export { CpCircularProgress as default };

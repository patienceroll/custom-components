class CpCircularProgress extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        debugger;
        svg.setAttribute("viewBox", "8 8 44 44");
        circle.setAttribute("cx", "22");
        circle.setAttribute("cy", "22");
        circle.setAttribute("r", "22");
        circle.setAttribute("stroke-width", "3");
        svg.appendChild(circle);
        shadowRoot.appendChild(svg);
    }
}

export { CpCircularProgress as default };

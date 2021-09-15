import CpCircularProgress from "./circular-progress";

if (typeof customElements.get("cp-circular-progress") === "undefined") {
  customElements.define("cp-circular-progress", CpCircularProgress);
}

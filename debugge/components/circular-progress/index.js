import CpCircularProgress from './circular-progress.js';

if (typeof customElements.get("cp-circular-progress") === "undefined") {
    customElements.define("cp-circular-progress", CpCircularProgress);
}

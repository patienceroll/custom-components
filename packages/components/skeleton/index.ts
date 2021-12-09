import CpSkeleton from "./skeleton";

if (typeof customElements.get("cp-skeleton") === "undefined") {
	defineCustomComponents("cp-skeleton", CpSkeleton);
}

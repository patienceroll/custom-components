import CpSkeleton from "./skeleton";


if (typeof customElements.get('cp-skeleton') === 'undefined') {
  customElements.define('cp-skeleton', CpSkeleton)
}
import { watch, keyframe, style } from '../../utils';


@watch<AttachedShadowRoot<CpSwiper>>({
	list(oldList, newList) {
		console.log('watch-list', oldList, newList);
	},
	type(oldVal, newVal) {
		console.log('watch-type', oldVal, newVal);
	},
	autoPlay(oldVal, newVal) {
		console.log('watch-auto-play', oldVal, newVal);
	},
})
class CpSwiper extends HTMLElement implements CustomElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const h1 = document.createElement('h1');
		h1.innerHTML = 'hello world';
		shadowRoot.append(h1);
	}

	/**开始轮播 */
	start() {}

	/** 暂停轮播 */
	pause() {}

}

export default CpSwiper;

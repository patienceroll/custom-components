import { style } from '../../utils/decorators';


@style({
	':host': {
		display: 'block',
	},
})
export default class TabContext extends HTMLElement implements CustomElement {
	constructor() {
		super();
	}
}

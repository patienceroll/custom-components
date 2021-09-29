class Stack<T> {
	stack: T[] = [];
	top?: T;

	push(item: T) {
		this.stack.push(item);
		this.top = item;
		this.finished?.();
	}

	remove(item?: T) {
		if (item) {
			this.stack = this.stack.filter((i) => i !== item);
		} else {
			item = this.stack.pop();
		}
		this.top = this.stack[this.stack.length - 1];
		this.finished?.(item);
	}

	/** 删除或增加元素的回调 */
	finished?(oldTop?: T) {}
}

export default Stack;

export interface CpInputProps extends HTMLElement {
	/** 变体,默认标准(standard) */
	variant?: 'outlined' | 'filled' | 'standard';
}

export interface CpInputEventDetail {
	focus: {
		nativeEvent: FocusEvent;
		input: HTMLInputElement;
	};
	blur: {
		nativeEvent: FocusEvent;
		input: HTMLInputElement;
	};
	change: {
		value: string;
		nativeEvent: Event;
		input: HTMLInputElement;
	};
	input: {
		value: string;
		nativeEvent: Event;
		input: HTMLInputElement;
	};
}

export interface CpInputProps extends HTMLElement {
	/** 变体,默认标准(standard) */
	variant?: 'outlined' | 'filled' | 'standard';
	'default-value'?: string;
	value?: string;
	name?:string,
	autofocus?: BooleanCharacter,
	placeholder?: string,
	/** html.input.type */
	type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
	/** @standard html标准 - https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill */
	autocomplete?:
		| 'off'
		| 'on'
		| 'name'
		| 'honorific-prefix'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-suffix'
		| 'nickname'
		| 'username'
		| 'new-password'
		| 'current-password'
		| 'one-time-code'
		| 'organization-title'
		| 'organization'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'address-level4'
		| 'address-level3'
		| 'address-level2'
		| 'address-level1'
		| 'country'
		| 'country-name'
		| 'postal-code'
		| 'cc-name'
		| 'cc-given-name'
		| 'cc-additional-name'
		| 'cc-family-name'
		| 'cc-number'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year'
		| 'cc-csc'
		| 'cc-type'
		| 'transaction-currency'
		| 'transaction-amount'
		| 'language'
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'sex'
		| 'url'
		| 'photo'
		| 'home'
		| 'work'
		| 'fax'
		| 'mobile'
		| 'pager'
		| 'tel'
		| 'tel-country-code'
		| 'tel-national'
		| 'tel-area-code'
		| 'tel-local'
		| 'tel-local-prefix'
		| 'tel-local-suffix'
		| 'tel-extension'
		| 'email'
		| 'impp';
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

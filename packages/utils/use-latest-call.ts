/**
 * ### resovle 最后一次执行结果
 * - 设计思路:  函数在触发之后设定时间段内没有再次触发即为最后一次调用
 * - 此函数只会执行最后一次调用,时间段内的调用都不会执行
 * - 默认时间段为 100ms
 */
export default function useLatestCall<T extends unknown[], returnType = void>(
	func: (...arg: T) => returnType,
	during = 100
) {
	let count = 0;
	return (...argInput: T) => {
		const remaindCount = ++count;
		return new Promise<ReturnType<typeof func> | false>((resolve) => {
			setTimeout(() => {
				if (remaindCount === count) resolve(func(...argInput));
				else resolve(false);
			}, during);
		});
	};
}

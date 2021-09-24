/**
 * ## 项目主题
 * 对象结构
 * - theme.xxx , xxx 为 css 属性
 * - theme.xxx.ddd , ddd 为 某种状态下的值
 *
 * <strong>此结构为初定</strong>
 */
const Theme = {
	color: {
		primary: '#1976d2',
		background: '#e0e0e0',
		backgroundHover: '#c0c0c0',
	},
	border: {
		radius: '4px',
	},
	transition: {
		delay: {
			fast: '150ms',
			base: '300ms',
			smooth: '450ms',
			slow: '600ms',
		},
	},
};

export default Theme;

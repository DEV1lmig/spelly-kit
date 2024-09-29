export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'base-50': 'oklch(var(--base-100) / <alpha-value>)'
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],

					primary: '#00ccff',

					'primary-content': '#000f16',

					secondary: '#ff1700',

					'secondary-content': '#160000',

					accent: '#00e4ea',

					'accent-content': '#001213',

					neutral: '#352328',

					'neutral-content': '#d3cecf',

					'base-100': '#ffffff',

					'base-200': '#dedede',

					'base-300': '#bebebe',

					'base-content': '#161616',

					info: '#00dcff',

					'info-content': '#001116',

					success: '#00c962',

					'success-content': '#000f03',

					warning: '#925f00',

					'warning-content': '#e9ded0',

					error: '#c5003a',

					'error-content': '#fad5d5'
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],

					primary: '#4572a7',

					'primary-content': '#f3f4f6',

					secondary: '#AA4643',

					'secondary-content': '#f3f4f6',

					accent: '#00e4ea',

					'accent-content': '#f3f4f6',

					neutral: '#352328',

					'neutral-content': '#d3cecf',

					'base-100': '#15171b',

					'base-200': '#1d1e26',

					'base-300': '#282a36',

					'base-content': '#f3f4f6',

					info: '#00dcff',

					'info-content': '#f3f4f6',

					success: '#00c962',

					'success-content': '#f3f4f6',

					warning: '#db843d',

					'warning-content': '#e9ded0',

					error: '#c5003a',

					'error-content': '#fad5d5'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				spelly: {
					primary: '#e28a61',

					secondary: '#ffccec',

					accent: '#d3191c',

					neutral: '#201826',

					'base-100': '#e3e6e8',

					info: '#58c2da',

					success: '#4ceb96',

					warning: '#b48608',

					error: '#e64e3d'
				},
				darkspelly: {
					primary: '#4ece85',

					secondary: '#e55a42',

					accent: '#1d6493',

					neutral: '#312235',

					'base-100': '#45364e',

					info: '#86b4da',

					success: '#43db82',

					warning: '#f9cd48',

					error: '#f63c71'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

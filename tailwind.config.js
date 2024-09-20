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
					primary: '#007bff', // A sleek blue as primary
					secondary: '#6c757d', // A subtle gray for secondary
					accent: '#28a745', // A vibrant green for accents
					neutral: '#f8f9fa', // A clean, light neutral
					'base-100': '#ffffff', // Pure white for base
					info: '#17a2b8', // A calming blue for info
					success: '#28a745', // Same as accent for consistency
					warning: '#ffc107', // A standard yellow for warning
					error: '#dc3545' // A bold red for error
				},
				darkspelly: {
					primary: '#007bff', // Maintain primary blue in dark mode
					secondary: '#343a40', // A darker gray for secondary
					accent: '#28a745', // Maintain accent green
					neutral: '#121212', // A deep, dark neutral
					'base-100': '#181818', // A dark gray for base
					info: '#17a2b8', // Maintain info blue
					success: '#28a745', // Maintain accent green
					warning: '#ffc107', // Maintain warning yellow
					error: '#dc3545' // Maintain error red
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

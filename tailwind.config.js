/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			// Extiende las keyframes
			keyframes: {
				"shadow-inset-center": {
					"0%": { boxShadow: "inset 0 0 0 0 rgba(0, 0, 0, 0)" },
					"100%": { boxShadow: "inset 0 0 14px 0px rgba(0, 0, 0, 0.5)" },
				},
			},
			// Extiende la animación
			animation: {
				"shadow-inset-center":
					"shadow-inset-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
			},
		},
	},
	plugins: [],
};

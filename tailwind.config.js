/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				regular: ["GeistRegular"],
				medium: ["GeistMedium"],
				semibold: ["GeistSemiBold"],
				bold: ["GeistBold"],
			},
			colors: {
				background: "#F8F9FA",
				primary: "#314B5E",
				secondary: "#C2C9D0",
				surface: "#E1E9EF",
				muted: "#65747F",
				circle: "#2F4656",
				button: "#294355",
				foreground: '#F8F9FA',
				border: "#DEE2E5",

				success: "#22C55E",
				warning: "#F59E0B",
				danger: "#EF4444",

				income: "#22C55E",
				expense: "#EF4444",
			},
			fontSize: {
				md: "14px"
			},
			borderRadius: {
				"4xl": "32px"
			}
		},
	},
	plugins: [],
};

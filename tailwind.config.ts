import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,vue}",
	],
	theme: {
		extend: {
			colors: {
				background: "#FFFFFF", // Replace with actual color
				foreground: "#000000", // Replace with actual color
				card: {
					DEFAULT: "#F8F9FA", // Replace with actual color
					foreground: "#212529", // Replace with actual color
				},
				popover: {
					DEFAULT: "#FFFFFF", // Replace with actual color
					foreground: "#212529", // Replace with actual color
				},
				primary: {
					DEFAULT: "#000000", // Uber's primary color
					foreground: "#FFFFFF", // White for contrast
					50: "#f5f5f5", // Lightest shade
					100: "#e0e0e0",
					200: "#b3b3b3",
					300: "#808080",
					400: "#4d4d4d",
					500: "#000000", // Base primary color
					600: "#000000",
					700: "#000000",
					800: "#000000",
					900: "#000000", // Darkest shade
				},
				secondary: {
					DEFAULT: "#e85a5a", // Coral as the secondary accent
					foreground: "#FFFFFF", // White for contrast
					50: "#fef7f7",
					100: "#fdeaea",
					200: "#fbd9d9",
					300: "#f7baba",
					400: "#f18f8f",
					500: "#e85a5a", // Base coral color
					600: "#d63c3c",
					700: "#b42d2d",
					800: "#952929",
					900: "#7c2727", // Darkest coral shade
				},
				muted: {
					DEFAULT: "#E9ECEF", // Replace with actual color
					foreground: "#6C757D", // Replace with actual color
				},
				accent: {
					DEFAULT: "#e85a5a", // Replace with actual color
					foreground: "#FFFFFF", // Replace with actual color
					600: "#520dc2",
				},
				destructive: {
					DEFAULT: "#DC3545", // Replace with actual color
					foreground: "#FFFFFF", // Replace with actual color
				},
				border: "#DEE2E6", // Replace with actual color
				input: "#F8F9FA", // Replace with actual color
				ring: "#0D6EFD", // Replace with actual color
				chart: {
					"1": "#FF6384", // Replace with actual color
					"2": "#36A2EB", // Replace with actual color
					"3": "#FFCE56", // Replace with actual color
					"4": "#4BC0C0", // Replace with actual color
					"5": "#9966FF", // Replace with actual color
				},
				sidebar: {
					DEFAULT: "#343A40", // Replace with actual color
					foreground: "#FFFFFF", // Replace with actual color
					primary: "#0D6EFD", // Replace with actual color
					"primary-foreground": "#FFFFFF", // Replace with actual color
					accent: "#6610F2", // Replace with actual color
					"accent-foreground": "#FFFFFF", // Replace with actual color
					border: "#495057", // Replace with actual color
					ring: "#0D6EFD", // Replace with actual color
				},
				coral: {
					50: "#fef7f7",
					100: "#fdeaea",
					200: "#fbd9d9",
					300: "#f7baba",
					400: "#f18f8f",
					500: "#e85a5a", // Primary coral color
					600: "#d63c3c",
					700: "#b42d2d",
					800: "#952929",
					900: "#7c2727",
					950: "#431111",
				},
				gray: {
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
					950: "#030712",
				},
			},

			fontFamily: {
				sans: ['"Uber Move"', 'Inter', 'sans-serif'], // Uber's custom font
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.5rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
				"5xl": ["3rem", { lineHeight: "1.1" }],
				"6xl": ["3.75rem", { lineHeight: "1.1" }],
				"7xl": ["4.5rem", { lineHeight: "1.1" }],
			},
			spacing: {
				"15": "3.75rem",
				"18": "4.5rem",
				"88": "22rem",
				"128": "32rem",
			},
			borderRadius: {
				lg: "12px", // Replace with actual value
				md: "10px", // Replace with actual value
				sm: "8px", // Replace with actual value
				xl: "16px", // Replace with actual value
				"2xl": "24px", // Replace with actual value
				"3xl": "32px", // Replace with actual value
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
				"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { transform: "translateY(10px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				bounceSubtle: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideUp 0.3s ease-out",
				"bounce-subtle": "bounceSubtle 2s infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
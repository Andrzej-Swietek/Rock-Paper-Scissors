import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#111",
        "secondary": "#f3f4f5",
        "error": "#F25150",
        "warning": "#FBBF24",
        "success": "#22C55E",
        "neutral": "#6A7181",
        "primaryContainer": "#1C1C1C",
        "secondaryContainer": "#CEE6FF",
        "errorContainer": "#FFC9C9",
        "warningContainer": "#FFE195",
        "successContainer": "#BBF7D0",
        "neutralContainer": "#FFFFFF",
        "onPrimaryContainer": "#F2F2F2",
        "onSecondaryContainer": "#004E9F",
        "onErrorContainer": "#AC0100",
        "onWarningContainer": "#F59E0B",
        "onSuccessContainer": "#16A34A",
        "onNeutralContainer": "#3E434C"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        18: '18',
        19: '19',
      },
      variants: {
        lineClamp: ['responsive', 'hover']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config

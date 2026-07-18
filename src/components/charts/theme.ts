/** Hex mirror of mia-ds CSS tokens for Recharts / inline styles. */

export const chartColors = {
  primary: {
    50: '#f5eeff',
    100: '#eadbff',
    200: '#d4b8ff',
    300: '#b685ff',
    400: '#9b5bff',
    500: '#8e3ff5',
    600: '#7b31d9',
    700: '#6826b8',
    800: '#551e96',
    900: '#3f176e',
    950: '#2a0f4a',
  },
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f2f4f7',
    200: '#e4e7ec',
    300: '#d0d5dd',
    400: '#98a2b3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1d2939',
    900: '#101828',
    950: '#0c111d',
  },
  success: '#12b76a',
  warning: '#f79009',
  danger: '#f04438',
  /** Alias for admin consumers that still use `error`. */
  error: '#f04438',
  info: '#2e90fa',
  accent: {
    teal: '#15b79e',
    indigo: '#444ce7',
    rose: '#f63d68',
  },
} as const

/** Ordered series palette for multi-series charts. */
export const chartPalette = [
  chartColors.primary[500],
  chartColors.accent.indigo,
  chartColors.accent.teal,
  chartColors.info,
  chartColors.warning,
  chartColors.accent.rose,
  chartColors.primary[300],
  chartColors.primary[700],
] as const

export const pedagogicalStatusColors: Record<string, string> = {
  'Turma pequena': chartColors.info,
  'Rácio adequado': chartColors.success,
  'Turma grande': chartColors.danger,
}

export const chartTheme = {
  fontFamily: "var(--font-sans, 'Poppins', ui-sans-serif, system-ui, sans-serif)",
  fontSize: 12,
  textColor: chartColors.neutral[500],
  gridStroke: chartColors.neutral[200],
  tooltipStyle: {
    borderRadius: 12,
    border: `1px solid ${chartColors.neutral[200]}`,
    backgroundColor: chartColors.neutral[0],
    boxShadow: '0 2px 8px rgba(16, 24, 40, 0.08)',
    fontSize: 12,
  } as const,
}

export const defaultChartMargin = { top: 8, right: 16, left: 0, bottom: 0 }

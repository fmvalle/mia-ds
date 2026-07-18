import React, { Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'
import { AuthGate } from './auth/AuthGate'

class GateErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null }

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error) }
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          data-mia-error="1"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483646,
            margin: 0,
            padding: 24,
            background: '#fff',
            color: '#B91C1C',
            fontFamily: 'monospace',
            fontSize: 12,
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
          }}
        >
          {this.state.error}
        </pre>
      )
    }
    return this.props.children
  }
}

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Mia Design System',
    brandUrl: './',
    brandImage: '/mia-logo.png',
    brandTarget: '_self',
    colorPrimary: '#8E3FF5',
    colorSecondary: '#8E3FF5',
    appBg: '#F4F7FB',
    appContentBg: '#FFFFFF',
    appPreviewBg: '#F4F7FB',
    appBorderColor: '#E5E7EB',
    appBorderRadius: 12,
    textColor: '#111827',
    textMutedColor: '#6B7280',
    barTextColor: '#6B7280',
    barSelectedColor: '#8E3FF5',
    barHoverColor: '#8E3FF5',
    barBg: '#FFFFFF',
    inputBg: '#FFFFFF',
    inputBorder: '#E5E7EB',
    inputTextColor: '#111827',
    inputBorderRadius: 10,
    fontBase: '"Poppins", system-ui, sans-serif',
  }),
})

function mountAuthGate() {
  const existing = document.getElementById('mia-ds-auth-root')
  if (existing) return
  const root = document.createElement('div')
  root.id = 'mia-ds-auth-root'
  document.body.appendChild(root)
  try {
    createRoot(root).render(
      <GateErrorBoundary>
        <AuthGate />
      </GateErrorBoundary>,
    )
  } catch (err) {
    root.setAttribute('data-mia-error', err instanceof Error ? err.message : String(err))
    // eslint-disable-next-line no-console
    console.error('[mia-ds] AuthGate mount failed:', err)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAuthGate)
} else {
  mountAuthGate()
}

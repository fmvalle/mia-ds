import React, { useCallback, useEffect, useState, type FormEvent } from 'react'
import { fetchAuthMe, hasDsAccess, signIn } from './api'
import { dsAuthStorage, isAuthDisabled } from './storage'

type GateState =
  | { status: 'loading' }
  | { status: 'login'; error: string | null }
  | { status: 'denied'; name?: string }
  | { status: 'ready'; name?: string }

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    zIndex: 2147483646,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background:
      'radial-gradient(1200px 600px at 10% -10%, rgba(142,63,245,0.18), transparent), linear-gradient(160deg, #F4F7FB 0%, #EEF0F8 45%, #E8E4F5 100%)',
    fontFamily: 'Poppins, system-ui, sans-serif',
    color: '#111827',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    borderRadius: 20,
    padding: '32px 28px',
    boxShadow: '0 18px 50px rgba(17, 24, 39, 0.08)',
    border: '1px solid rgba(17, 24, 39, 0.06)',
  },
  logo: {
    display: 'block',
    height: 48,
    width: 'auto',
    margin: '0 auto 20px',
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center' as const,
    letterSpacing: '-0.02em',
  },
  lead: {
    margin: '8px 0 24px',
    fontSize: 14,
    lineHeight: 1.5,
    color: '#6B7280',
    textAlign: 'center' as const,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box' as const,
    borderRadius: 12,
    border: '1px solid #E5E7EB',
    padding: '11px 14px',
    fontSize: 14,
    marginBottom: 14,
    outline: 'none',
    background: '#FAFBFC',
  },
  button: {
    width: '100%',
    marginTop: 8,
    border: 'none',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    background: '#8E3FF5',
    cursor: 'pointer',
  },
  buttonSecondary: {
    width: '100%',
    marginTop: 10,
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    padding: '11px 16px',
    fontSize: 14,
    fontWeight: 500,
    color: '#374151',
    background: '#fff',
    cursor: 'pointer',
  },
  error: {
    margin: '0 0 12px',
    padding: '10px 12px',
    borderRadius: 10,
    background: '#FEF2F2',
    color: '#B91C1C',
    fontSize: 13,
    lineHeight: 1.4,
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center' as const,
    lineHeight: 1.4,
  },
  logoutBar: {
    position: 'fixed' as const,
    right: 12,
    bottom: 12,
    zIndex: 2147483645,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 999,
    background: 'rgba(17, 24, 39, 0.88)',
    color: '#fff',
    fontFamily: 'Poppins, system-ui, sans-serif',
    fontSize: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
  },
  logoutBtn: {
    border: 'none',
    background: 'transparent',
    color: '#E9D5FF',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 12,
    padding: 0,
  },
}

export function AuthGate() {
  const [state, setState] = useState<GateState>(() =>
    isAuthDisabled() ? { status: 'ready' } : { status: 'loading' },
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const bootstrap = useCallback(async () => {
    if (isAuthDisabled()) {
      setState({ status: 'ready' })
      return
    }
    if (!dsAuthStorage.hasToken()) {
      setState({ status: 'login', error: null })
      return
    }
    try {
      const me = await fetchAuthMe()
      if (!hasDsAccess(me.roles)) {
        dsAuthStorage.clear()
        setState({ status: 'denied', name: me.person?.name ?? undefined })
        return
      }
      setState({ status: 'ready', name: me.person?.name ?? me.person?.email ?? undefined })
    } catch {
      dsAuthStorage.clear()
      setState({ status: 'login', error: null })
    }
  }, [])

  useEffect(() => {
    void bootstrap()
  }, [bootstrap])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setState({ status: 'login', error: null })
    try {
      const tokens = await signIn(email.trim(), password)
      dsAuthStorage.setSession({
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      })
      const me = await fetchAuthMe(tokens.id_token)
      if (!hasDsAccess(me.roles)) {
        dsAuthStorage.clear()
        setState({ status: 'denied', name: me.person?.name ?? undefined })
        return
      }
      setState({ status: 'ready', name: me.person?.name ?? me.person?.email ?? undefined })
    } catch (err) {
      setState({
        status: 'login',
        error: err instanceof Error ? err.message : 'Não foi possível entrar.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  function logout() {
    dsAuthStorage.clear()
    setPassword('')
    setState({ status: 'login', error: null })
  }

  if (state.status === 'ready') {
    if (isAuthDisabled()) return null
    return (
      <div style={styles.logoutBar} role="status">
        <span>{state.name ? `Olá, ${state.name}` : 'Sessão ativa'}</span>
        <button type="button" style={styles.logoutBtn} onClick={logout}>
          Sair
        </button>
      </div>
    )
  }

  if (state.status === 'loading') {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          <img src="/mia-logo.png" alt="Mia" style={styles.logo} />
          <p style={styles.lead}>Verificando sessão…</p>
        </div>
      </div>
    )
  }

  if (state.status === 'denied') {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          <img src="/mia-logo.png" alt="Mia" style={styles.logo} />
          <h1 style={styles.title}>Acesso restrito</h1>
          <p style={styles.lead}>
            O Design System é liberado apenas para perfis <strong>ADMIN</strong> e{' '}
            <strong>SCHOOL_ADMIN</strong>.
          </p>
          <button type="button" style={styles.button} onClick={logout}>
            Entrar com outra conta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <img src="/mia-logo.png" alt="Mia" style={styles.logo} />
        <h1 style={styles.title}>Mia Design System</h1>
        <p style={styles.lead}>Entre com sua conta MIA para acessar o catálogo de componentes.</p>
        {state.error ? <p style={styles.error}>{state.error}</p> : null}
        <form onSubmit={onSubmit}>
          <label htmlFor="mia-ds-email" style={styles.label}>
            E-mail
          </label>
          <input
            id="mia-ds-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="seu@email.com"
          />
          <label htmlFor="mia-ds-password" style={styles.label}>
            Senha
          </label>
          <input
            id="mia-ds-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
        <p style={styles.hint}>Perfis permitidos: ADMIN e SCHOOL_ADMIN</p>
      </div>
    </div>
  )
}

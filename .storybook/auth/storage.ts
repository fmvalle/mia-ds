const SESSION_KEY = 'mia_ds_session'

export type DsAuthSession = {
  idToken: string
  refreshToken: string
  expiresAt: number
}

export type DsAllowedRole = 'ADMIN' | 'SCHOOL_ADMIN'

export const DS_ALLOWED_ROLES: readonly DsAllowedRole[] = ['ADMIN', 'SCHOOL_ADMIN']

function readSession(): DsAuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const record = parsed as Record<string, unknown>
    const idToken = typeof record.idToken === 'string' ? record.idToken : ''
    const refreshToken = typeof record.refreshToken === 'string' ? record.refreshToken : ''
    const expiresAt = typeof record.expiresAt === 'number' ? record.expiresAt : 0
    if (!idToken) return null
    return { idToken, refreshToken, expiresAt }
  } catch {
    return null
  }
}

export const dsAuthStorage = {
  getSession(): DsAuthSession | null {
    return readSession()
  },

  getToken(): string | null {
    return readSession()?.idToken ?? null
  },

  setSession(input: {
    idToken: string
    refreshToken?: string
    expiresIn?: string | number
  }): void {
    const expiresInSec =
      typeof input.expiresIn === 'string'
        ? Number.parseInt(input.expiresIn, 10)
        : typeof input.expiresIn === 'number'
          ? input.expiresIn
          : 3600
    const expiresAt = Date.now() + (Number.isFinite(expiresInSec) ? expiresInSec : 3600) * 1000
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        idToken: input.idToken,
        refreshToken: input.refreshToken ?? '',
        expiresAt,
      } satisfies DsAuthSession),
    )
  },

  clear(): void {
    sessionStorage.removeItem(SESSION_KEY)
  },

  hasToken(): boolean {
    return Boolean(this.getToken())
  },
}

type MiaDsConfig = {
  apiBaseUrl?: string
  disableAuth?: boolean
}

/**
 * Storybook's manager bundle does NOT expose `import.meta.env` (unlike the
 * preview iframe). Config is injected at build time via managerHead into
 * `window.__MIA_DS_CONFIG__`. We still read import.meta.env defensively as a
 * fallback for the preview context.
 */
function readConfig(): MiaDsConfig {
  try {
    const win = window as unknown as { __MIA_DS_CONFIG__?: MiaDsConfig }
    if (win.__MIA_DS_CONFIG__) return win.__MIA_DS_CONFIG__
  } catch {
    // ignore
  }
  try {
    const env = (import.meta as unknown as { env?: Record<string, string> }).env
    if (env) {
      return {
        apiBaseUrl: env.STORYBOOK_API_BASE_URL,
        disableAuth: env.STORYBOOK_DISABLE_AUTH === 'true' || env.STORYBOOK_DISABLE_AUTH === '1',
      }
    }
  } catch {
    // ignore
  }
  return {}
}

export function isAuthDisabled(): boolean {
  return readConfig().disableAuth === true
}

export function getApiBaseUrl(): string {
  const raw = (readConfig().apiBaseUrl || 'http://localhost:8000/api/v1').trim()
  const withoutTrailingSlash = raw.replace(/\/$/, '')
  // Tolerate deploy envs that omit the "/api/v1" prefix (same contract as the admin).
  if (/\/api(\/|$)/.test(withoutTrailingSlash)) return withoutTrailingSlash
  return `${withoutTrailingSlash}/api/v1`
}

import {
  DS_ALLOWED_ROLES,
  dsAuthStorage,
  getApiBaseUrl,
  type DsAllowedRole,
} from './storage'

export type SignInResponse = {
  id_token: string
  refresh_token: string
  expires_in: string
  token_type?: string
}

export type AuthMeRole = {
  role: string
  school_id?: string | null
  school_name?: string | null
}

export type AuthMeResponse = {
  firebase_uid: string
  person?: { name?: string | null; email?: string | null }
  profile?: { id?: string }
  roles: AuthMeRole[]
}

async function parseError(res: Response): Promise<string> {
  try {
    const body: unknown = await res.json()
    if (body && typeof body === 'object') {
      const record = body as Record<string, unknown>
      if (typeof record.detail === 'string') return record.detail
      if (typeof record.message === 'string') return record.message
      if (typeof record.error === 'string') return record.error
    }
  } catch {
    // ignore
  }
  if (res.status === 401) return 'Credenciais inválidas.'
  if (res.status === 403) return 'Acesso negado.'
  if (res.status === 429) return 'Muitas tentativas. Tente novamente em instantes.'
  return `Falha na autenticação (${res.status}).`
}

export async function signIn(email: string, password: string): Promise<SignInResponse> {
  const res = await fetch(`${getApiBaseUrl()}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as SignInResponse
}

export async function fetchAuthMe(idToken?: string): Promise<AuthMeResponse> {
  const token = idToken ?? dsAuthStorage.getToken()
  if (!token) throw new Error('Sessão ausente.')
  const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as AuthMeResponse
}

export function extractAllowedRoles(roles: AuthMeRole[]): DsAllowedRole[] {
  const found = new Set<DsAllowedRole>()
  for (const item of roles) {
    const role = item.role?.toUpperCase() as DsAllowedRole
    if (DS_ALLOWED_ROLES.includes(role)) found.add(role)
  }
  return [...found]
}

export function hasDsAccess(roles: AuthMeRole[]): boolean {
  return extractAllowedRoles(roles).length > 0
}

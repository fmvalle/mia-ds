# Mia Design System (`mia-ds`)

Design system React do ecossistema MIA, documentado com [Storybook](https://storybook.js.org/).

Tokens e visual de componentes seguem o **Flutter SaaS DS** (`mia-app` → `lib/core/design_system/`), especificado em [`mia-spec/0_arquitetura/design-system-mia-ds.md`](../mia-spec/0_arquitetura/design-system-mia-ds.md).

## Marca

| Token | Valor |
|-------|-------|
| Primary | `#8E3FF5` |
| Surface (page) | `#F9FAFB` |
| Text | `#101828` |
| Font | **Poppins** |
| Radius padrão (md) | 12px |

## Idiomas (i18n)

Suporte nativo a **pt-BR** (padrão) e **en**.

- No Storybook: ícone do **globo** na toolbar
- Nos apps: `I18nProvider` + `useI18n()` em `src/i18n`

```tsx
import { I18nProvider, useI18n } from '@/i18n'

function SaveButton() {
  const { t } = useI18n()
  return <button>{t('common.save')}</button>
}
```

## Quick start (Makefile)

```bash
make install      # dependências
make storybook    # http://localhost:6006
# ou
make app          # playground Vite :5173
```

## Publicar na Vercel

O deploy publica o **Storybook estático** (`storybook-static`), configurado em `vercel.json`.

```bash
make deploy             # preview
make deploy-prod        # produção
```

## Estrutura

```
src/
  components/
    ui/           # Foundation (Button, Avatar, Badge…)
    forms/        # Inputs, Select, Switch…
    feedback/     # Alert, Modal, Drawer…
    data/         # Card, StatCard, Table…
    navigation/   # Sidebar, Header, FAB…
    layout/       # AppShell, Grid, Section…
  docs/           # Fundamentos (Cores, Tipografia, Espaçamento)
  patterns/       # Composições de referência
  tokens.css      # Design tokens (Tailwind @theme) — paridade Flutter; consumo externo
  index.css       # Fonts + Tailwind + tokens + base styles (Storybook / app DS)
```

## Paridade Flutter

Fonte canônica dos tokens: `mia-app/lib/core/design_system/app_theme_tokens.dart`.

Consumo no admin: `mia-school-admin` importa `@mia-ds/tokens.css` (alias Vite para este `src/`). Spec: `mia-spec/2_mia-school-admin/13-migracao-mia-ds.md`.

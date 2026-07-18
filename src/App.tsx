import { useEffect, useState, type ReactNode } from 'react'
import {
  LayoutDashboard,
  FileText,
  Rocket,
  Users,
  FolderKanban,
  ShoppingCart,
  Clock,
  PackageCheck,
} from 'lucide-react'
import { I18nProvider, useI18n, type Locale } from './i18n'
import { AppShell, Grid, Section, Stack } from './components/layout'
import { Sidebar, Header, NavSection, NavItem, FAB } from './components/navigation'
import {
  WelcomeBanner,
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ChartPlaceholder,
  List,
  ListItem,
  ProjectRow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from './components/data'
import { Avatar, Button } from './components/ui'

function LocaleSwitch({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 text-xs font-semibold">
      {(['pt-BR', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={
            locale === code
              ? 'rounded-md bg-primary-500 px-2 py-1 text-white'
              : 'rounded-md px-2 py-1 text-text-muted hover:bg-surface-muted'
          }
          onClick={() => onChange(code)}
        >
          {code === 'pt-BR' ? 'PT' : 'EN'}
        </button>
      ))}
    </div>
  )
}

function DashboardApp({
  locale,
  onLocaleChange,
}: {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}) {
  const { t } = useI18n()

  return (
    <AppShell
      sidebar={
        <Sidebar
          logo={
            <div className="flex items-center gap-2 font-extrabold text-text">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary-500 text-sm text-white">
                M
              </span>
              Mia DS
            </div>
          }
        >
          <NavSection title={t('nav.dashboards')}>
            <NavItem icon={LayoutDashboard} label={t('nav.dashboard1')} active />
            <NavItem icon={LayoutDashboard} label={t('nav.dashboard2')} />
            <NavItem icon={LayoutDashboard} label={t('nav.dashboard3')} />
          </NavSection>
          <NavSection title={t('nav.frontPages')}>
            <NavItem icon={FileText} label={t('nav.homepage')} />
            <NavItem icon={FileText} label={t('nav.aboutUs')} />
            <NavItem icon={FileText} label={t('nav.blog')} />
          </NavSection>
          <NavSection title={t('nav.landingPages')}>
            <NavItem icon={Rocket} label={t('nav.landingpage')} />
          </NavSection>
        </Sidebar>
      }
      header={
        <Header
          title={t('nav.dashboard')}
          actions={<LocaleSwitch locale={locale} onChange={onLocaleChange} />}
          avatar={<Avatar name="David Chen" status="online" size="sm" />}
        />
      }
      mainClassName="p-0"
    >
      <Stack gap={6} className="p-6">
        <WelcomeBanner
          greeting={t('dashboard.welcomeBack', { name: 'David' })}
          subtitle={t('dashboard.welcomeSubtitleAlt')}
          metrics={[
            { label: t('dashboard.budget'), value: '$98,450' },
            { label: t('dashboard.expenses'), value: '$2,440' },
          ]}
        />

        <Grid cols={1} md={2} gap={4}>
          <StatCard
            title={t('dashboard.customers')}
            value="36,358"
            change={-12}
            tone="teal"
            icon={Users}
          />
          <StatCard
            title={t('dashboard.projects')}
            value="78,298"
            change={31.8}
            tone="pink"
            icon={FolderKanban}
          />
        </Grid>

        <Grid cols={1} md={2} gap={4}>
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.revenueForecast')}</CardTitle>
              <CardDescription>{t('dashboard.overviewProfit')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder variant="area" title="" className="p-0 shadow-none" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.yourPerformance')}</CardTitle>
              <CardDescription>{t('dashboard.lastCheck')}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <List className="shadow-none">
                <ListItem
                  icon={
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <ShoppingCart className="size-5" />
                    </span>
                  }
                  title={t('dashboard.newOrders', { count: 64 })}
                  description={t('dashboard.processing')}
                />
                <ListItem
                  icon={
                    <span className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Clock className="size-5" />
                    </span>
                  }
                  title={t('dashboard.orders', { count: 4 })}
                  description={t('dashboard.onHold')}
                />
                <ListItem
                  icon={
                    <span className="flex size-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                      <PackageCheck className="size-5" />
                    </span>
                  }
                  title={t('dashboard.orders', { count: 12 })}
                  description={t('dashboard.delivered')}
                />
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Section title={t('dashboard.activeProjects')} subtitle={t('dashboard.sprintWork')}>
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <Thead>
                  <Tr>
                    <Th>{t('dashboard.assigned')}</Th>
                    <Th>{t('dashboard.assignee')}</Th>
                    <Th>{t('dashboard.progress')}</Th>
                    <Th>{t('dashboard.priority')}</Th>
                    <Th>{t('dashboard.budget')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <ProjectRow
                    title="Minecraft App"
                    assignee="Jason Roy"
                    progress={73.2}
                    priority="Medium"
                    budget="$3.5K"
                  />
                  <ProjectRow
                    title="Web App Project"
                    assignee="Mathew Flintoff"
                    progress={73.2}
                    priority="Very High"
                    budget="$24.5K"
                  />
                  <ProjectRow
                    title="Modernize Dashboard"
                    assignee="Anil Kumar"
                    progress={73.2}
                    priority="Low"
                    budget="$12.8K"
                  />
                </Tbody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        <div className="flex gap-2">
          <Button>{t('common.save')}</Button>
          <Button variant="outline">{t('common.cancel')}</Button>
        </div>
      </Stack>
      <FAB label={t('common.settings')} />
    </AppShell>
  )
}

function AppProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <I18nProvider locale={locale}>{children}</I18nProvider>
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('pt-BR')

  return (
    <AppProviders locale={locale}>
      <DashboardApp locale={locale} onLocaleChange={setLocale} />
    </AppProviders>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquare,
  School,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { Header } from '@/components/navigation/Header'
import { ChartCard } from '@/components/charts/ChartCard'
import { TimelineChart } from '@/components/charts/TimelineChart'
import { BarChart } from '@/components/charts/BarChart'
import { DataTable } from '@/components/data/Table'
import { cn } from '@/lib/utils'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Padrões/Dashboard',
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('dashboard'),
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const CONTENT_BG = '#F4F7FB'

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2', compact && 'justify-center')}>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
        M
      </div>
      {!compact ? <span className="text-lg font-bold text-text">Mia</span> : null}
    </div>
  )
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: LucideIcon
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
        <Icon className="size-5" aria-hidden />
      </div>
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-text">{value}</p>
    </div>
  )
}

function ReportCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <a
      href="#"
      className="block rounded-2xl border border-border bg-surface p-5 shadow-card transition hover:border-primary-200 hover:shadow-card-hover"
    >
      <h3 className="text-base font-semibold text-text">{title}</h3>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
      <span className="mt-3 inline-block text-sm font-medium text-primary-600">Abrir relatório</span>
    </a>
  )
}

type RailSection = {
  id: string
  label: string
  icon: LucideIcon
  modules: { id: string; label: string; active?: boolean }[]
}

const SECTIONS: RailSection[] = [
  {
    id: 'school',
    label: 'Escola',
    icon: School,
    modules: [
      { id: 'overview', label: 'Visão geral', active: true },
      { id: 'reports', label: 'Relatórios' },
      { id: 'classrooms', label: 'Turmas' },
    ],
  },
  {
    id: 'platform',
    label: 'Plataforma',
    icon: LayoutDashboard,
    modules: [
      { id: 'schools', label: 'Escolas' },
      { id: 'users', label: 'Usuários' },
    ],
  },
]

function AdminSidebar({
  panelOpen,
  onPanelOpenChange,
}: {
  panelOpen: boolean
  onPanelOpenChange: (open: boolean) => void
}) {
  const [activeSectionId, setActiveSectionId] = useState('school')
  const activeSection = SECTIONS.find((s) => s.id === activeSectionId) ?? SECTIONS[0]

  return (
    <aside className="flex h-full shrink-0 bg-white">
      <div className="flex w-[72px] flex-col items-center gap-2 border-r-0 bg-white py-3">
        <button
          type="button"
          onClick={() => onPanelOpenChange(!panelOpen)}
          className="inline-flex size-11 items-center justify-center rounded-xl text-text-muted transition hover:bg-surface-muted hover:text-text"
          aria-label={panelOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          <Menu className="size-5" />
        </button>
        {SECTIONS.map((section) => {
          const Icon = section.icon
          const selected = section.id === activeSectionId
          return (
            <button
              key={section.id}
              type="button"
              title={section.label}
              onClick={() => {
                setActiveSectionId(section.id)
                onPanelOpenChange(true)
              }}
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-xl transition',
                selected && panelOpen
                  ? 'bg-primary-500 text-white'
                  : selected
                    ? 'bg-primary-500 text-white'
                    : 'text-text-muted hover:bg-primary-50 hover:text-primary-600',
              )}
            >
              <Icon className="size-5" />
            </button>
          )
        })}
      </div>

      {panelOpen ? (
        <div className="flex w-[260px] flex-col bg-white">
          <div className="flex h-16 items-center px-5">
            <Logo />
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              {activeSection.label}
            </p>
            <nav className="space-y-1">
              {activeSection.modules.map((mod) => (
                <a
                  key={mod.id}
                  href="#"
                  className={cn(
                    'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    mod.active
                      ? 'bg-primary-500 text-white shadow-card'
                      : 'text-text-muted hover:bg-surface-muted hover:text-text',
                  )}
                >
                  {mod.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : (
        <div className="flex w-[72px] flex-col items-center pt-2">
          <Logo compact />
        </div>
      )}
    </aside>
  )
}

const timelineData = [
  { date: '2026-07-01', label: '01/07', value: 4 },
  { date: '2026-07-02', label: '02/07', value: 8 },
  { date: '2026-07-03', label: '03/07', value: 5 },
  { date: '2026-07-04', label: '04/07', value: 12 },
  { date: '2026-07-05', label: '05/07', value: 7 },
  { date: '2026-07-06', label: '06/07', value: 9 },
]

const engagementData = [
  { name: 'Ana', value: 18 },
  { name: 'Bruno', value: 12 },
  { name: 'Carla', value: 9 },
  { name: 'Diego', value: 6 },
]

const classroomRows = [
  { id: '1', name: 'Maternal I A', code: 'MAT1A', grade: 'Maternal I', students: 12, teachers: 2 },
  { id: '2', name: 'Pré II B', code: 'PRE2B', grade: 'Pré II', students: 18, teachers: 2 },
  { id: '3', name: 'Berçário', code: 'BER1', grade: 'Berçário', students: 8, teachers: 3 },
]

function DashboardView() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [tab, setTab] = useState<'reports' | 'classrooms'>('reports')

  return (
    <AppShell
      className="bg-white"
      mainClassName="flex min-h-0 flex-1 flex-col bg-white p-0"
      sidebar={
        <div className="hidden h-full lg:flex">
          <AdminSidebar panelOpen={panelOpen} onPanelOpenChange={setPanelOpen} />
        </div>
      }
      header={
        <Header
          showSearch={false}
          className="border-b-0 bg-white px-4 sm:px-6 lg:px-8"
          actions={
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-text transition hover:bg-surface-muted"
            >
              2026
              <ChevronDown className="size-4 text-text-muted" aria-hidden />
            </button>
          }
          avatar={
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
              FM
            </div>
          }
        />
      }
    >
      <div
        className="min-h-0 flex-1 overflow-auto lg:rounded-tl-[2rem]"
        style={{ backgroundColor: CONTENT_BG }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Escolas', href: '#' },
              { label: 'Escola Mia' },
            ]}
            className="mb-4"
          />

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[28px] font-semibold text-text">Escola Mia</h1>
              <p className="mt-1 text-sm text-text-muted">
                Dashboard da escola com indicadores, turmas e relatórios institucionais.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text shadow-card transition hover:bg-surface-muted"
            >
              Voltar
            </button>
          </div>

          <section className="mb-8">
            <h2 className="mb-4 text-base font-semibold text-text">Indicadores da escola</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <MetricCard label="Turmas" value={2} icon={UsersRound} />
              <MetricCard label="Alunos" value={3} icon={GraduationCap} />
              <MetricCard label="Professores" value={4} icon={Users} />
              <MetricCard label="Registros no diário" value={137} icon={BookOpen} />
              <MetricCard label="Publicações" value={12} icon={MessageSquare} />
              <MetricCard label="Processos avaliativos" value={5} icon={Megaphone} />
            </div>
          </section>

          <div className="mb-6 flex gap-2 border-b border-border">
            {(
              [
                { id: 'reports' as const, label: 'Relatórios' },
                { id: 'classrooms' as const, label: 'Turmas' },
              ]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  'border-b-2 px-4 py-2 text-sm font-medium transition',
                  tab === item.id
                    ? 'border-primary-500 text-primary-700'
                    : 'border-transparent text-text-muted hover:text-text',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'reports' ? (
            <div className="space-y-8">
              <section>
                <h2 className="mb-1 text-base font-semibold text-text">Panorama institucional</h2>
                <p className="mb-4 text-sm text-text-muted">
                  Indicadores consolidados e visão geral.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <ReportCard
                    title="Visão geral da escola"
                    description="Indicadores consolidados e panorama institucional."
                  />
                  <ReportCard
                    title="Resumo por turma"
                    description="Métricas detalhadas de cada turma vinculada ao seu perfil."
                  />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-text">Monitoramento de atividade</h2>
                <div className="grid gap-6 lg:grid-cols-3">
                  <ChartCard
                    title="Linha do tempo diária"
                    description="Registros no diário ao longo do período"
                    className="lg:col-span-2"
                  >
                    <TimelineChart data={timelineData} valueLabel="Registros" />
                  </ChartCard>
                  <ChartCard title="Engajamento" description="Ranking por aluno">
                    <BarChart data={engagementData} layout="horizontal" valueLabel="Registros" />
                  </ChartCard>
                </div>
              </section>
            </div>
          ) : (
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">Turmas do ano letivo</h2>
              <DataTable
                columns={[
                  { id: 'name', header: 'Turma', accessorKey: 'name', sortable: true },
                  { id: 'code', header: 'Código', accessorKey: 'code' },
                  { id: 'grade', header: 'Série', accessorKey: 'grade' },
                  { id: 'students', header: 'Alunos', accessorKey: 'students', sortable: true },
                  { id: 'teachers', header: 'Professores', accessorKey: 'teachers' },
                ]}
                data={classroomRows}
                getRowId={(row) => row.id}
                searchable
                searchPlaceholder="Pesquisar turmas..."
              />
            </section>
          )}
        </div>
      </div>
    </AppShell>
  )
}

export const ModernDashboard: Story = {
  name: 'Dashboard moderno',
  render: () => <DashboardView />,
}

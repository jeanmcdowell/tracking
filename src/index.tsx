import { useEffect, useMemo, useState } from 'react'
import { protectorCampaign } from './data/protectorCampaign'
import { TimelineFilters } from './components/TimelineFilters'
import { TimelinePhase } from './components/TimelinePhase'
import type { CampaignPhase, EventStatus, TimelineFilters as TimelineFiltersState } from './types/campaign'

function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

function filterEvents(phase: CampaignPhase, filters: TimelineFiltersState) {
  return phase.events.filter((event) => {
    const matchesStatus = filters.statuses.includes(event.status)
    const matchesImpact = !filters.highImpactOnly || event.impact >= 4
    const search = filters.searchTerm.trim().toLowerCase()
    const matchesSearch =
      search.length === 0 ||
      event.title.toLowerCase().includes(search) ||
      event.summary.toLowerCase().includes(search) ||
      event.owner.toLowerCase().includes(search) ||
      event.notes?.toLowerCase().includes(search)

    return matchesStatus && matchesImpact && matchesSearch
  })
}

function computeStats(phases: CampaignPhase[], filters: TimelineFiltersState) {
  const filteredPhases = phases
    .filter((phase) => filters.focusPhase === 'all' || phase.id === filters.focusPhase)
    .map((phase) => ({ ...phase, events: filterEvents(phase, filters) }))

  const totalEvents = filteredPhases.reduce((sum, phase) => sum + phase.events.length, 0)
  const atRiskEvents = filteredPhases.reduce(
    (sum, phase) => sum + phase.events.filter((event) => event.status === 'at-risk').length,
    0,
  )
  const inProgressEvents = filteredPhases.reduce(
    (sum, phase) => sum + phase.events.filter((event) => event.status === 'in-progress').length,
    0,
  )

  return { totalEvents, atRiskEvents, inProgressEvents }
}

function StatTile({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div
      style={{
        background: 'white',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{label}</span>
      <strong style={{ fontSize: '26px', color: '#0f172a' }}>{value}</strong>
      <span style={{ fontSize: '12px', color: '#475569' }}>{hint}</span>
    </div>
  )
}

export const defaultFilters: TimelineFiltersState = {
  statuses: ['planned', 'in-progress', 'at-risk', 'completed'],
  focusPhase: 'all',
  searchTerm: '',
  highImpactOnly: false,
}

export function ProtectorTimelineApp({ initialFilters }: { initialFilters?: TimelineFiltersState }) {
  const initialState = useMemo(
    () => ({
      ...defaultFilters,
      ...initialFilters,
      statuses: initialFilters?.statuses ?? defaultFilters.statuses,
    }),
    [initialFilters],
  )

  const [filters, setFilters] = useState<TimelineFiltersState>(initialState)

  useEffect(() => {
    setFilters(initialState)
  }, [initialState])

  const { totalEvents, atRiskEvents, inProgressEvents } = useMemo(
    () => computeStats(protectorCampaign, filters),
    [filters],
  )

  const visiblePhases = useMemo(() => {
    return protectorCampaign
      .filter((phase) => filters.focusPhase === 'all' || phase.id === filters.focusPhase)
      .map((phase) => ({ ...phase, events: filterEvents(phase, filters) }))
  }, [filters])

  const phaseOptions = protectorCampaign.map((phase) => ({ id: phase.id, label: phase.name }))

  const summaryCopy = filters.searchTerm.length
    ? `Showing ${formatNumber(totalEvents)} filtered milestones`
    : 'End-to-end view of the PROTECTOR campaign'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <p style={{ margin: 0, color: '#475569', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
            PROTECTOR
          </p>
          <h1 style={{ margin: '6px 0 0', fontSize: '28px', color: '#0f172a' }}>Campaign Timeline</h1>
          <p style={{ margin: '6px 0 0', color: '#475569' }}>{summaryCopy}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Mission window</div>
          <div style={{ fontWeight: 700, color: '#0f172a' }}>Jul — Nov 2024</div>
        </div>
      </header>

      <TimelineFilters
        filters={filters}
        onUpdate={setFilters}
        onReset={() => setFilters({ ...defaultFilters, statuses: [...defaultFilters.statuses] })}
        phaseOptions={phaseOptions}
      />

      <section
        aria-label="campaign stats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}
      >
        <StatTile label="Phases" value={formatNumber(visiblePhases.length)} hint="active in view" />
        <StatTile label="Milestones" value={formatNumber(totalEvents)} hint="matching filters" />
        <StatTile label="In flight" value={formatNumber(inProgressEvents)} hint="executing now" />
        <StatTile label="At risk" value={formatNumber(atRiskEvents)} hint="needs attention" />
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {visiblePhases.map((phase) => (
          <TimelinePhase key={phase.id} phase={phase} events={phase.events} />
        ))}
        {visiblePhases.length === 0 ? (
          <div
            style={{
              padding: '16px',
              background: '#f8fafc',
              border: '1px dashed #cbd5e1',
              borderRadius: '12px',
              color: '#475569',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            No phases match the current filters.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { protectorCampaign }
export type { CampaignPhase, EventStatus }

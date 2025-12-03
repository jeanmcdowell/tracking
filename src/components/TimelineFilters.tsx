import type { EventStatus, TimelineFilters } from '../types/campaign'
import { statusLabel } from './StatusBadge'

const badgeColors: Record<EventStatus, string> = {
  planned: '#dbeafe',
  'in-progress': '#fff7ed',
  'at-risk': '#fee2e2',
  completed: '#dcfce7',
}

interface TimelineFiltersProps {
  filters: TimelineFilters
  onUpdate: (next: TimelineFilters) => void
  phaseOptions: { id: string; label: string }[]
  onReset: () => void
}

export function TimelineFilters({ filters, onUpdate, onReset, phaseOptions }: TimelineFiltersProps) {
  const toggleStatus = (status: EventStatus) => {
    const isSelected = filters.statuses.includes(status)
    const statuses = isSelected
      ? filters.statuses.filter((value) => value !== status)
      : [...filters.statuses, status]
    onUpdate({ ...filters, statuses })
  }

  return (
    <section
      aria-label="timeline filters"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr',
        gap: '12px',
        padding: '16px',
        background: '#0f172a',
        color: 'white',
        borderRadius: '14px',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="timeline-search" style={{ fontSize: '14px', opacity: 0.8 }}>
          Search milestones
        </label>
        <input
          id="timeline-search"
          placeholder="Search by title, owner, or notes"
          value={filters.searchTerm}
          onChange={(event) => onUpdate({ ...filters, searchTerm: event.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(15, 23, 42, 0.6)',
            color: 'white',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '14px', opacity: 0.85 }}>Status focus</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['planned', 'in-progress', 'at-risk', 'completed'] as EventStatus[]).map((status) => {
            const selected = filters.statuses.includes(status)
            return (
              <button
                key={status}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleStatus(status)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: selected ? '1px solid white' : '1px solid rgba(255,255,255,0.25)',
                  background: selected ? 'rgba(255,255,255,0.1)' : badgeColors[status],
                  color: selected ? 'white' : '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {statusLabel(status)}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="phase-select" style={{ fontSize: '14px', opacity: 0.85 }}>
          Phase spotlight
        </label>
        <select
          id="phase-select"
          value={filters.focusPhase}
          onChange={(event) => onUpdate({ ...filters, focusPhase: event.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(15, 23, 42, 0.6)',
            color: 'white',
          }}
        >
          <option value="all">All phases</option>
          {phaseOptions.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', opacity: 0.85 }}>Impact</label>
        <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.highImpactOnly}
            onChange={(event) => onUpdate({ ...filters, highImpactOnly: event.target.checked })}
          />
          <span>Only show impact 4-5</span>
        </label>
        <button
          type="button"
          onClick={onReset}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.35)',
            background: 'transparent',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Reset filters
        </button>
      </div>
    </section>
  )
}

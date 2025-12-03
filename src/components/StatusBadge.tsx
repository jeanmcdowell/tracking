import type { EventStatus } from '../types/campaign'

const statusMeta: Record<EventStatus, { label: string; color: string; background: string }> = {
  planned: { label: 'Planned', color: '#3b82f6', background: '#e0ecff' },
  'in-progress': { label: 'In Progress', color: '#d97706', background: '#fff4e0' },
  'at-risk': { label: 'At Risk', color: '#dc2626', background: '#ffe4e6' },
  completed: { label: 'Completed', color: '#16a34a', background: '#e6f6ec' },
}

export function StatusBadge({ status }: { status: EventStatus }) {
  const meta = statusMeta[status]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '999px',
        color: meta.color,
        background: meta.background,
        fontWeight: 600,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}
    >
      <span
        aria-hidden
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '999px',
          background: meta.color,
          boxShadow: `0 0 0 4px ${meta.background}`,
        }}
      />
      {meta.label}
    </span>
  )
}

export function statusLabel(status: EventStatus): string {
  return statusMeta[status].label
}

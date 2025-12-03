import { StatusBadge } from './StatusBadge'
import type { CampaignEvent, CampaignPhase } from '../types/campaign'

interface TimelinePhaseProps {
  phase: CampaignPhase
  events: CampaignEvent[]
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: '#3b82f6' }} />
      </div>
    </div>
  )
}

function EventCard({ event, index }: { event: CampaignEvent; index: number }) {
  return (
    <article
      aria-label={`${event.title} ${event.status}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 110px',
        gap: '12px',
        padding: '12px',
        borderRadius: '12px',
        background: index % 2 === 0 ? '#f8fafc' : '#eef2ff',
        border: '1px solid #e5e7eb',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <strong style={{ fontSize: '14px' }}>{event.date}</strong>
        <StatusBadge status={event.status} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
          <h4 style={{ margin: 0, fontSize: '16px' }}>{event.title}</h4>
          <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>{event.owner}</span>
        </div>
        <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>{event.summary}</p>
        {event.dependencies && event.dependencies.length > 0 ? (
          <div style={{ fontSize: '12px', color: '#4b5563' }}>
            Depends on: <strong>{event.dependencies.join(', ')}</strong>
          </div>
        ) : null}
        {event.notes ? (
          <div style={{ fontSize: '12px', color: '#0f172a', background: '#e0f2fe', padding: '8px 10px', borderRadius: '8px' }}>
            {event.notes}
          </div>
        ) : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        <div
          style={{
            padding: '8px 10px',
            borderRadius: '10px',
            background: '#fff',
            border: '1px solid #d4d4d8',
            textAlign: 'right',
          }}
        >
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Impact</div>
          <strong style={{ fontSize: '18px', color: '#0f172a' }}>{event.impact}/5</strong>
        </div>
        <ProgressBar value={event.readiness} label="Readiness" />
      </div>
    </article>
  )
}

export function TimelinePhase({ phase, events }: TimelinePhaseProps) {
  return (
    <section
      aria-label={`${phase.name} timeline`}
      style={{
        padding: '20px',
        borderRadius: '16px',
        background: 'white',
        border: '1px solid #e5e7eb',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#0f172a',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
            }}
          >
            {phase.id.split('-')[1]}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '20px' }}>{phase.name}</h3>
            <p style={{ margin: 0, color: '#475569' }}>{phase.goal}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              {phase.focusAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '10px',
                    background: '#f3f4f6',
                    color: '#0f172a',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {phase.startDate} → {phase.endDate}
            </div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>Health {phase.health}%</div>
          </div>
          <StatusBadge status={phase.status} />
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
        {events.length === 0 ? (
          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px dashed #cbd5e1',
              color: '#475569',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            No milestones match the selected filters.
          </div>
        ) : null}
      </div>
    </section>
  )
}

export type EventStatus = 'planned' | 'in-progress' | 'at-risk' | 'completed'

export interface CampaignEvent {
  id: string
  title: string
  date: string
  summary: string
  owner: string
  status: EventStatus
  impact: number
  readiness: number
  dependencies?: string[]
  notes?: string
}

export interface CampaignPhase {
  id: string
  name: string
  goal: string
  startDate: string
  endDate: string
  status: EventStatus
  health: number
  focusAreas: string[]
  events: CampaignEvent[]
}

export interface TimelineFilters {
  statuses: EventStatus[]
  focusPhase: 'all' | string
  searchTerm: string
  highImpactOnly: boolean
}

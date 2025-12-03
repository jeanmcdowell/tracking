import { act } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { defaultFilters, ProtectorTimelineApp } from './index'

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

describe('ProtectorTimelineApp', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    document.body.innerHTML = ''
  })

  async function renderApp(customFilters?: typeof defaultFilters) {
    await act(async () => {
      root.render(<ProtectorTimelineApp initialFilters={customFilters} />)
      await Promise.resolve()
    })
  }

  it('renders the PROTECTOR campaign overview with default stats', async () => {
    await renderApp()

    expect(container.textContent).toContain('PROTECTOR')
    expect(container.textContent).toContain('Campaign Timeline')
    expect(container.textContent).toContain('Milestones')

    const phaseSections = container.querySelectorAll('section[aria-label$="timeline"]')
    expect(phaseSections.length).toBeGreaterThanOrEqual(4)
  })

  it('allows filtering by status and spotlighting a single phase', async () => {
    await renderApp({
      ...defaultFilters,
      statuses: ['in-progress', 'completed'],
      focusPhase: 'phase-1',
    })

    const visiblePhases = Array.from(container.querySelectorAll('section[aria-label$="timeline"]')).map(
      (section) => section.getAttribute('aria-label'),
    )

    expect(container.textContent).not.toContain('Playbook Lab Validation')
    expect(visiblePhases).toEqual(['Phase 1 — Harden & Shield timeline'])
  })

  it('supports searching milestones and focusing on high-impact work', async () => {
    await renderApp({ ...defaultFilters, searchTerm: 'fusion telemetry' })

    const eventTitles = Array.from(container.querySelectorAll('article h4')).map((element) => element.textContent)
    expect(eventTitles).toEqual(['Fusion Telemetry Pipeline'])

    await renderApp({ ...defaultFilters, highImpactOnly: true })
    const highImpactTitles = Array.from(container.querySelectorAll('article h4')).map((element) => element.textContent)
    expect(highImpactTitles).not.toContain('Communications Drill')
  })

  it('can reset back to the initial filter set', async () => {
    await renderApp({
      ...defaultFilters,
      statuses: ['completed'],
      searchTerm: 'pipeline',
      highImpactOnly: true,
    })

    const resetButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Reset filters',
    ) as HTMLButtonElement | undefined

    const searchField = container.querySelector('#timeline-search') as HTMLInputElement
    expect(searchField.value).toBe('pipeline')

    const statusButtons = Array.from(container.querySelectorAll('button[aria-pressed]')) as HTMLButtonElement[]
    const pressedStatuses = statusButtons.filter((button) => button.getAttribute('aria-pressed') === 'true')
    expect(pressedStatuses.length).toBe(1)

    act(() => {
      const button = resetButton ?? statusButtons[0]
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(searchField.value).toBe('')
    const resetPressed = Array.from(
      container.querySelectorAll('button[aria-pressed="true"]'),
    ) as HTMLButtonElement[]
    expect(resetPressed.length).toBeGreaterThan(1)
    const highImpactCheckbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(highImpactCheckbox.checked).toBe(false)
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import LearnMoreSection from '../sections/LearnMoreSection'
import type { Translations } from '../types'

const t = { learnMore: 'Aprende más' } as Translations

const neocitiesPayload = {
  result: 'success',
  info: { sitename: 'formulafacilutn', views: 7004, hits: 25997 }
}

function mockFetchOk(data: unknown) {
  return vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) })
}

function mockFetchFail() {
  return vi.fn().mockRejectedValue(new Error('Network error'))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('LearnMoreSection – views API', () => {
  it('shows "..." for both counters while loading', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<LearnMoreSection translations={t} lang="es" />)
    expect(screen.getAllByText('+...')).toHaveLength(2)
  })

  it('calls /api/neocities-info as primary endpoint', async () => {
    const fetchMock = mockFetchOk(neocitiesPayload)
    vi.stubGlobal('fetch', fetchMock)
    render(<LearnMoreSection translations={t} lang="es" />)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/neocities-info'))
  })

  it('removes loading indicators after a successful fetch', async () => {
    vi.stubGlobal('fetch', mockFetchOk(neocitiesPayload))
    render(<LearnMoreSection translations={t} lang="es" />)
    await act(async () => {})
    expect(screen.queryAllByText('+...')).toHaveLength(0)
  })

  it('falls back to /neocities-fallback.json when API throws', async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(neocitiesPayload) })
    vi.stubGlobal('fetch', fetchMock)
    render(<LearnMoreSection translations={t} lang="es" />)
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/neocities-fallback.json')
    )
  })

  it('falls back when API returns a non-ok status', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(neocitiesPayload) })
    vi.stubGlobal('fetch', fetchMock)
    render(<LearnMoreSection translations={t} lang="es" />)
    await waitFor(() =>
      expect(fetchMock).toHaveBeenNthCalledWith(2, '/neocities-fallback.json')
    )
  })

  it('keeps "..." when both API and fallback fail', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockRejectedValueOnce(new Error('API fail'))
      .mockRejectedValueOnce(new Error('Fallback fail'))
    )
    render(<LearnMoreSection translations={t} lang="es" />)
    await new Promise(r => setTimeout(r, 50))
    expect(screen.getAllByText('+...')).toHaveLength(2)
  })

  it('shows Spanish labels "visitas" and "usos"', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<LearnMoreSection translations={t} lang="es" />)
    expect(screen.getByText('visitas')).toBeInTheDocument()
    expect(screen.getByText('usos')).toBeInTheDocument()
  })

  it('shows English labels "visits" and "uses"', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<LearnMoreSection translations={t} lang="en" />)
    expect(screen.getByText('visits')).toBeInTheDocument()
    expect(screen.getByText('uses')).toBeInTheDocument()
  })
})

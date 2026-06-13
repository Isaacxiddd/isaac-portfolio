import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAnimatedCounter from '../hooks/useAnimatedCounter'

describe('useAnimatedCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 0 when target is 0', () => {
    const { result } = renderHook(() => useAnimatedCounter(0))
    expect(result.current).toBe(0)
  })

  it('starts at 0 for a positive target', () => {
    const { result } = renderHook(() => useAnimatedCounter(1000))
    expect(result.current).toBe(0)
  })

  it('reaches the target value after animation completes', async () => {
    const { result } = renderHook(() => useAnimatedCounter(1000))
    await act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current).toBe(1000)
  })

  it('is mid-animation before duration elapses', async () => {
    const { result } = renderHook(() => useAnimatedCounter(1000, 1000))
    await act(() => { vi.advanceTimersByTime(400) })
    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThan(1000)
  })

  it('stays at 0 for the entire duration when target is 0', async () => {
    const { result } = renderHook(() => useAnimatedCounter(0))
    await act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current).toBe(0)
  })

  it('re-animates to a new target when target changes', async () => {
    const { result, rerender } = renderHook(
      ({ target }) => useAnimatedCounter(target),
      { initialProps: { target: 100 } }
    )
    await act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current).toBe(100)

    rerender({ target: 500 })
    await act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current).toBe(500)
  })
})

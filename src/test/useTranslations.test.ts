import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTranslations from '../hooks/useTranslations'
import TranslationManager from '../lib/TranslationManager'

beforeEach(() => {
  localStorage.clear()
  TranslationManager.reset()
})

describe('useTranslations', () => {
  it('defaults to Spanish', () => {
    const { result } = renderHook(() => useTranslations())
    expect(result.current.lang).toBe('es')
  })

  it('returns Spanish translations by default', () => {
    const { result } = renderHook(() => useTranslations())
    expect(result.current.translations.aboutTitle).toBe('Quién soy')
  })

  it('toggleLanguage switches to English', () => {
    const { result } = renderHook(() => useTranslations())
    act(() => { result.current.toggleLanguage() })
    expect(result.current.lang).toBe('en')
    expect(result.current.translations.aboutTitle).toBe('About me')
  })

  it('toggleLanguage toggles back to Spanish', () => {
    const { result } = renderHook(() => useTranslations())
    act(() => { result.current.toggleLanguage() })
    act(() => { result.current.toggleLanguage() })
    expect(result.current.lang).toBe('es')
  })

  it('persists language in localStorage', () => {
    const { result } = renderHook(() => useTranslations())
    act(() => { result.current.toggleLanguage() })
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('reads saved language from localStorage', () => {
    localStorage.setItem('lang', 'en')
    const { result } = renderHook(() => useTranslations())
    expect(result.current.lang).toBe('en')
    expect(result.current.translations.aboutTitle).toBe('About me')
  })
})

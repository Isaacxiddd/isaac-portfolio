import { describe, it, expect, beforeAll } from 'vitest'
import { ProjectRepository } from '../repositories/ProjectRepository'

describe('ProjectRepository', () => {
  let repo: ProjectRepository

  beforeAll(() => {
    repo = new ProjectRepository()
  })

  it('getAllProjects returns 4 projects', () => {
    const projects = repo.getAllProjects()
    expect(projects).toHaveLength(4)
  })

  it('getAllProjects returns unique instances each call', () => {
    const a = repo.getAllProjects()
    const b = repo.getAllProjects()
    expect(a).not.toBe(b)
  })

  it('getProjectByName finds Formula Fácil by Spanish name', () => {
    const p = repo.getProjectByName('Formula Fácil UTN')
    expect(p).toBeDefined()
    expect(p!.getName('es')).toBe('Formula Fácil UTN')
  })

  it('getProjectByName finds project by English name', () => {
    const p = repo.getProjectByName('CV ↔ GitHub Analyzer')
    expect(p).toBeDefined()
    expect(p!.getName('en')).toBe('CV ↔ GitHub Analyzer')
  })

  it('getProjectByName returns undefined for unknown name', () => {
    const p = repo.getProjectByName('Non-Existent Project')
    expect(p).toBeUndefined()
  })

  it('each project has bilingual name', () => {
    const projects = repo.getAllProjects()
    for (const p of projects) {
      expect(typeof p.getName('es')).toBe('string')
      expect(typeof p.getName('en')).toBe('string')
      expect(p.getName('es').length).toBeGreaterThan(0)
      expect(p.getName('en').length).toBeGreaterThan(0)
    }
  })

  it('each project has a description in both languages', () => {
    const projects = repo.getAllProjects()
    for (const p of projects) {
      expect(p.getDescription('es').length).toBeGreaterThan(0)
      expect(p.getDescription('en').length).toBeGreaterThan(0)
    }
  })

  it('each project has a url', () => {
    const projects = repo.getAllProjects()
    for (const p of projects) {
      expect(p.url).toBeTruthy()
    }
  })
})

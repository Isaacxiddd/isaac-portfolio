import { describe, it, expect } from 'vitest'
import Project from '../models/Project'

const baseProject = new Project(
  { es: 'Proyecto Test', en: 'Test Project' },
  'https://example.com',
  { es: 'Descripción ES', en: 'Description EN' },
  { es: 'Descripción larga ES', en: 'Long description EN' },
  'React • TypeScript • Node',
  '/img.png',
  ['/img1.png'],
  { es: ['Feature 1 ES'], en: ['Feature 1 EN'] },
  { es: ['Challenge 1 ES'], en: ['Challenge 1 EN'] },
  'Frontend',
  'from-blue-500 to-teal-500',
  '🚀',
  'https://github.com/test/test',
  ['/gallery1.png', '/gallery2.png'],
)

describe('Project', () => {
  it('getName returns Spanish name when lang=es', () => {
    expect(baseProject.getName('es')).toBe('Proyecto Test')
  })

  it('getName returns English name when lang=en', () => {
    expect(baseProject.getName('en')).toBe('Test Project')
  })

  it('getDescription returns Spanish description when lang=es', () => {
    expect(baseProject.getDescription('es')).toBe('Descripción ES')
  })

  it('getDescription returns English description when lang=en', () => {
    expect(baseProject.getDescription('en')).toBe('Description EN')
  })

  it('getLongDescription returns correct language variant', () => {
    expect(baseProject.getLongDescription('es')).toContain('larga')
    expect(baseProject.getLongDescription('en')).toContain('Long')
  })

  it('getFeatures returns correct language array', () => {
    expect(baseProject.getFeatures('es')).toEqual(['Feature 1 ES'])
    expect(baseProject.getFeatures('en')).toEqual(['Feature 1 EN'])
  })

  it('getChallenges returns correct language array', () => {
    expect(baseProject.getChallenges('es')).toEqual(['Challenge 1 ES'])
    expect(baseProject.getChallenges('en')).toEqual(['Challenge 1 EN'])
  })

  it('getTechStack splits tech string by bullet', () => {
    expect(baseProject.getTechStack()).toEqual(['React', 'TypeScript', 'Node'])
  })

  it('constructor assigns all properties correctly', () => {
    expect(baseProject.url).toBe('https://example.com')
    expect(baseProject.mainImage).toBe('/img.png')
    expect(baseProject.category).toBe('Frontend')
    expect(baseProject.githubUrl).toBe('https://github.com/test/test')
    expect(baseProject.galleryImages).toHaveLength(2)
    expect(baseProject.icon).toBe('🚀')
  })
})

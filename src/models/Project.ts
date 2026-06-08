import { Lang } from "../types";

export default class Project {
  constructor(
    public readonly name: string,
    public readonly url: string,
    public readonly description: { es: string; en: string },
    public readonly longDescription: { es: string; en: string },
    public readonly tech: string,
    public readonly mainImage: string = "/screenshots/default.png",
    public readonly images: string[] = [],
    public readonly features: { es: string[]; en: string[] } = { es: [], en: [] },
    public readonly challenges: { es: string[]; en: string[] } = { es: [], en: [] },
    public readonly category: string = "Frontend",
    public readonly gradient: string = "from-blue-600 to-teal-600",
    public readonly icon: string = "🎮",
    public readonly githubUrl?: string
  ) {}

  getDescription(lang: Lang): string {
    return this.description[lang];
  }

  getLongDescription(lang: Lang): string {
    return this.longDescription[lang];
  }

  getFeatures(lang: Lang): string[] {
    return this.features[lang];
  }

  getChallenges(lang: Lang): string[] {
    return this.challenges[lang];
  }

  getTechStack(): string[] {
    return this.tech.split(' • ');
  }
}

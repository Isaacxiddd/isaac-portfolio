export type Lang = 'es' | 'en';
export type Theme = 'dark' | 'ps3';

export interface Translations {
  menu: readonly string[];
  aboutTitle: string;
  projectsTitle: string;
  techTitle: string;
  contact: string;
  learnMore: string;
  downloadCV: string;
  dowloadcv2: string;
  copyEmail: string;
  sendEmail: string;
  openProject: string;
  mastered: string;
  learning: string;
  tools: string;
  bio: string;
  emailCopied: string;
  copyManual: string;
  developer: string;
  nanana: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  formPlaceholderName: string;
  formPlaceholderEmail: string;
  formPlaceholderMessage: string;
}

export interface TechDetail {
  name: string;
  logo: string;
  description: { es: string; en: string };
  learningSource: { es: string; en: string };
  skills: { es: string[]; en: string[] };
  certificate?: string;
  challenge?: { es: string; en: string };
}

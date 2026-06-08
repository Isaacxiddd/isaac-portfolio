import { Lang, Translations } from "../types";

class TranslationManager {
  private static instance: TranslationManager;
  private currentLang: Lang = 'es';
  
  private translations = {
    es: {
      menu: ["Quién soy", "Proyectos", "Tecnologías", "Contacto", "Saber más"],
      aboutTitle: "Quién soy",
      projectsTitle: "Proyectos",
      techTitle: "Tecnologías",
      contact: "Contacto",
      learnMore: "Saber más",
      downloadCV: "Descargar CV",
      dowloadcv2: "Descargá mi CV actualizado para conocer más sobre mi experiencia.",
      copyEmail: "Copiar email",
      sendEmail: "Enviar email",
      openProject: "Abrir",
      mastered: "Manejo",
      learning: "Aprendiendo",
      tools: "Herramientas",
      bio: "Soy Isaac José García Márquez, un desarrollador apasionado por la tecnología y la programación. Me especializo en desarrollo web y análisis de datos, siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.",
      emailCopied: "Email copiado",
      copyManual: "Copia manual",
      developer: "Desarrollador Backend y Automatización de Sistemas",
      nanana: "¡Ver mis Proyectos!",
      formName: "Nombre",
      formEmail: "Email",
      formMessage: "Mensaje",
      formSend: "Enviar mensaje",
      formSending: "Enviando...",
      formSuccess: "¡Mensaje enviado! Te respondo pronto.",
      formError: "Error al enviar. Intentá de nuevo.",
      formPlaceholderName: "Tu nombre",
      formPlaceholderEmail: "tu@email.com",
      formPlaceholderMessage: "Contame en qué puedo ayudarte...",
    },
    en: {
      menu: ["About me", "Projects", "Technologies", "Contact", "Learn more"],
      aboutTitle: "About me",
      projectsTitle: "Projects",
      techTitle: "Technologies",
      contact: "Contact",
      learnMore: "Learn more",
      downloadCV: "Download CV",
      dowloadcv2: "Download my updated CV to learn more about my experience.",
      copyEmail: "Copy email",
      sendEmail: "Send email",
      openProject: "Open",
      mastered: "Mastered",
      learning: "Learning",
      tools: "Tools",
      bio: "I'm Isaac José García Márquez, a developer passionate about technology and programming. I specialize in web development and data analysis, always looking to learn new technologies and improve my skills.",
      emailCopied: "Email copied",
      copyManual: "Copy manually",
      developer: "Backend Developer & Systems Automation",
      nanana: "¡Check out my Projects!",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSend: "Send message",
      formSending: "Sending...",
      formSuccess: "Message sent! I'll get back to you soon.",
      formError: "Error sending. Please try again.",
      formPlaceholderName: "Your name",
      formPlaceholderEmail: "you@email.com",
      formPlaceholderMessage: "Tell me how I can help you...",
    },
  } as const;

  static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager();
    }
    return TranslationManager.instance;
  }

  getCurrentLang(): Lang {
    return this.currentLang;
  }

  toggleLanguage(): Lang {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    return this.currentLang;
  }

  getTranslations(): Translations {
    return this.translations[this.currentLang];
  }
}

export default TranslationManager;

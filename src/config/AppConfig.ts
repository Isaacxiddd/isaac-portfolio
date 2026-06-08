class AppConfig {
  static readonly EMAIL = "isaacjosegarciamarquez@gmail.com";
  static readonly CV_PATH = "/CV_Isaac_Garcia_ES.pdf";
  static readonly CV_PATH_EN = "/CV_Isaac_Garcia_EN.pdf";
  static readonly WEB3FORMS_KEY = "4c48c221-ed24-4287-8176-7ba45ff628bc";
  static readonly MENU_KEYS = ["about", "projects", "tech", "contact", "learn"] as const;
  static readonly GITHUB_URL = "https://github.com/isaacxiddd";
  static readonly LINKEDIN_URL = "https://www.linkedin.com/in/isaacjosegarcia";

  static openEmail(): void {
    window.open(`mailto:${AppConfig.EMAIL}`, "_blank");
  }

  static openGitHub(): void {
    window.open(AppConfig.GITHUB_URL, "_blank");
  }

  static openLinkedIn(): void {
    window.open(AppConfig.LINKEDIN_URL, "_blank");
  }
}

export default AppConfig;

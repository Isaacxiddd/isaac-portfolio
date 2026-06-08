import AppConfig from "../config/AppConfig";

class NavigationManager {
  private activeIndex: number = 0;
  private readonly maxIndex: number;

  constructor(maxIndex: number = AppConfig.MENU_KEYS.length) {
    this.maxIndex = maxIndex;
  }

  getCurrentIndex(): number {
    return this.activeIndex;
  }

  setIndex(index: number): number {
    if (index >= 0 && index < this.maxIndex) {
      this.activeIndex = index;
    }
    return this.activeIndex;
  }

  next(): number {
    this.activeIndex = (this.activeIndex + 1) % this.maxIndex;
    return this.activeIndex;
  }

  previous(): number {
    this.activeIndex = (this.activeIndex - 1 + this.maxIndex) % this.maxIndex;
    return this.activeIndex;
  }

  handleKeyboardNavigation(key: string): boolean {
    switch (key) {
      case "ArrowDown":
      case "ArrowRight":
        this.next();
        return true;
      case "ArrowUp":
      case "ArrowLeft":
        this.previous();
        return true;
      default:
        return false;
    }
  }
}

export default NavigationManager;

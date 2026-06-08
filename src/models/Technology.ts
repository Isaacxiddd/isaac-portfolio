import { TechDetail } from "../types";

export default class Technology {
  constructor(
    public readonly name: string,
    public readonly logo: string,
    public readonly status: 'mastered' | 'learning' | 'tool',
    public readonly hasDetail: boolean = false,
    public readonly detail?: TechDetail,
    public readonly tooltip?: { es: string; en: string }
  ) {}

  isDetailed(): boolean {
    return this.hasDetail && !!this.detail;
  }

  getDetail(): TechDetail | undefined {
    return this.detail;
  }
}

import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { gameSettings } from "../gameSettings";

export class GameObject {
  constructor(options: GameObjectOptions = {}) {
    this.name = options.name ?? "GameObject";
    this.enabled = options.enabled ?? true;
  }

  protected enabled: boolean;
  protected name: string;
  protected context: CanvasRenderingContext2D | null = gameSettings.context;

  public init(): void {}
  // @ts-ignore
  public update(deltaTime: number): void {}

  public isClass(className: string): boolean {
    return this.name === className;
  }

  public has(name: string): boolean {
    return name in this;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { gameSettings } from "../gameSettings";

export class GameObject {
  constructor(options: GameObjectOptions = {}) {
    this.name = options.name ?? "GameObject";
  }

  protected name: string;
  protected context: CanvasRenderingContext2D | null = gameSettings.context;

  public init(): void {}
  public update(): void {}

  public isClass(className: string): boolean {
    return this.name === className;
  }

  public has(name: string): boolean {
    return name in this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

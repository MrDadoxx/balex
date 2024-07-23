import { Sprite } from "./Sprite";
import { StaticBodyOptions } from "../interfaces/StaticBodyOptions";
import { GameObject } from "./GameObject";
import { Transform } from "./Transform";
import { Collider } from "./Collider";

export class StaticBody extends GameObject {
  constructor(options: StaticBodyOptions = {}) {
    super();
    this.name = options.name ?? "StaticBody";
    this.enabled = options.enabled ?? true;
    this.transform = options.transform ?? new Transform();
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.transform.scale.x;
    this.canvas.height = this.transform.scale.y;
    this.context = this.canvas.getContext("2d")!;
    document.body.appendChild(this.canvas);
    this.updateCanvasPosition();
    this.sprites = [];
    this.colliders = [];
  }

  protected sprites: Sprite[];
  protected colliders: Collider[];
  protected context: CanvasRenderingContext2D;
  protected transform: Transform;
  protected canvas: HTMLCanvasElement;

  public update = () => {
    this.updateCanvasPosition();

    this.sprites.forEach((sprite) => {
      sprite.draw();
      sprite.update();
    });
  };

  private updateCanvasPosition(): void {
    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${this.transform.position.x}px`;
    this.canvas.style.top = `${this.transform.position.y}px`;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public getSprites(): Sprite[] {
    return this.sprites;
  }

  public getColliders(): Collider[] {
    return this.colliders;
  }

  public addSprite(sprites: Sprite[]): void {
    this.sprites.push(...sprites);
  }
}

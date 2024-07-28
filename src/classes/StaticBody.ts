import { Sprite } from "./Sprite";
import { StaticBodyOptions } from "../interfaces/StaticBodyOptions";
import { Body } from "./Body";
import { Transform } from "./Transform";
import { Collider } from "./Collider";
import { gameSettings } from "../gameSettings";

export class StaticBody extends Body {
  constructor(options: StaticBodyOptions = {}) {
    super();
    this.name = options.name ?? "StaticBody";
    this.defaultCollider = new Collider({
      parent: this,
      transform: options.defaultColliderTransform,
    });
    this.defaultCollider.setEnabled(options.useDefaultCollider ?? true);
    this.enabled = options.enabled ?? true;
    this.transform = options.transform ?? new Transform();
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.context = this.canvas.getContext("2d")!;
    document.body.appendChild(this.canvas);
    this.sprites = [];
    this.colliders = [this.defaultCollider];
  }

  protected defaultCollider: Collider;
  protected sprites: Sprite[];
  protected colliders: Collider[];
  protected context: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;

  public update = () => {
    this.clearCanvas();
    this.sprites.forEach((sprite) => {
      sprite.draw();
      sprite.update();
    });

    this.colliders.forEach((collider) => {
      collider.update();

      if (gameSettings.debugColliders) {
        collider.draw();
      }

      // QUE VUELVAN LAS COLISIONES CARLAHINO
    });
  };

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

  public addCollider(colliders: Collider[]): void {
    this.colliders.push(...colliders);
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, 1920, 1080);
  }
}

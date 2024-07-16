import { StaticBodyOptions } from "../interfaces/StaticBodyOptions";
import { GameObject } from "./GameObject";
import { Transform } from "./Transform";
import { Collider } from "./Collider";
import { Sprite } from "./Sprite";
import { gameSettings } from "../gameSettings";

export class StaticBody extends GameObject {
  constructor(options: StaticBodyOptions) {
    super();
    this.enabled = options.enabled ?? true;
    this.name = options.name ?? "StaticBody";

    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas); // Añadir canvas al DOM
    this.context = this.canvas.getContext("2d")!;

    this.sprite = new Sprite(options.spriteImagePath ?? "", this, {
      visible: options.spriteVisible ?? true,
    });
    this.defaultCollider = new Collider(this);
    this.transform = options.transform ?? new Transform();
    const { width, height } = this.calculateCanvasSize(
      options.transform ?? this.transform
    );
    this.canvas.width = width;
    this.canvas.height = height;
    this.defaultCollider
      .getTransform()
      .setTransform(options.defaultColliderTransform ?? new Transform());
    this.colliders = [this.defaultCollider];
  }

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected sprite: Sprite;
  protected defaultCollider: Collider;
  protected transform: Transform;
  protected colliders: Collider[];

  private calculateCanvasSize(transform: Transform): {
    width: number;
    height: number;
  } {
    return {
      width: transform.scale.x * 100,
      height: transform.scale.y * 100,
    };
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getSprite(): Sprite {
    return this.sprite;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public getColliders(): Collider[] {
    return this.colliders;
  }

  public update(deltaTime: number): void {
    //this.clearCanvas();
    this.sprite.draw(this.transform);
    this.colliders.forEach((collider) => {
      collider.update(deltaTime);
      if (gameSettings.debugColliders) collider.draw(this.context);
    });
  }

  protected clearCanvas(): void {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

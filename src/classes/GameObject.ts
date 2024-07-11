import { Transform } from "./Transform";
import { Sprite } from "./Sprite";
import { Collider } from "./Collider";
import { GameObjectOptions } from "../interfaces/GameObjectOptions";

export class GameObject {
  private sprite: Sprite;
  protected transform: Transform = new Transform();
  protected collider: Collider;
  protected colliders: Collider[];
  protected name: string = "GameObject";
  protected context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    options: GameObjectOptions = {}
  ) {
    this.context = context;
    this.sprite = new Sprite(options.imagePath || "", context);
    this.collider = new Collider(() => this.transform, this);
    this.colliders = [this.collider];

    if (options.name) {
      this.name = options.name;
    }

    const useDefaultCollision = options.useDefaultCollision ?? true;
    this.collider.setEnabled(useDefaultCollision);
  }

  public draw(): void {
    this.sprite.draw(this.transform);
  }

  public update(): void {}

  public getColliders(): Collider[] {
    return this.colliders;
  }

  public addCollider(collider: Collider): void {
    this.colliders.push(collider);
  }

  public removeCollider(collider: Collider): void {
    const index = this.colliders.indexOf(collider);
    if (index !== -1) {
      this.colliders.splice(index, 1);
    } else {
      console.error("Collider not found in the game.");
    }
  }

  public isClass(className: string): boolean {
    return this.name === className;
  }

  public has(name: string): boolean {
    return name in this;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public getSprite(): Sprite {
    return this.sprite;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

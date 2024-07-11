import { Transform } from "./Transform";
import { gameSettings } from "../gameSettings";
import { GameObject } from "./GameObject";

export class Collider {
  constructor(getParentTransform: () => Transform, parent: GameObject) {
    this.originalTransform = new Transform();
    this.updatedTransform = new Transform();
    this.getParentTransform = getParentTransform;
    this.parent = parent;
  }

  private enabled: boolean = true;
  private originalTransform: Transform;
  private updatedTransform: Transform;
  private getParentTransform: () => Transform;
  private parent: GameObject;
  private colliding: boolean = false;

  public setTransform(transform: Transform): void {
    this.originalTransform = transform;
  }

  public getTransform(): Transform {
    return this.originalTransform;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public getParent(): GameObject {
    return this.parent;
  }

  public update(): void {
    this.updateTransform();
  }

  public getBounds(): { x: number; y: number; width: number; height: number } {
    const transform = this.updatedTransform;
    const position = transform.getPosition();
    const scale = transform.getScale();
    return {
      x: position.x,
      y: position.y,
      width: scale.x * 100,
      height: scale.y * 100,
    };
  }

  public isColliding(): boolean {
    return this.colliding;
  }

  public setColliding(colliding: boolean): void {
    this.colliding = colliding;
  }

  public isCollidingWith(other: Collider): boolean {
    const a = this.getBounds();
    const b = other.getBounds();
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    const bounds = this.getBounds();
    context.strokeStyle = gameSettings.debugColor;
    context.lineWidth = 2;
    context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  private updateTransform(): void {
    this.updatedTransform.setPosition({
      x:
        this.originalTransform.getPositionX() +
        this.getParentTransform().getPositionX(),
      y:
        this.originalTransform.getPositionY() +
        this.getParentTransform().getPositionY(),
    });

    this.updatedTransform.setRotation(
      this.originalTransform.getRotation() +
        this.getParentTransform().getRotation()
    );

    this.updatedTransform.setScale({
      x:
        this.originalTransform.getScaleX() +
        this.getParentTransform().getScaleX(),
      y:
        this.originalTransform.getScaleY() +
        this.getParentTransform().getScaleY(),
    });
  }
}

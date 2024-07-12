import { Transform } from "./Transform";
import { gameSettings } from "../gameSettings";
import { GameObject } from "./GameObject";
import { StaticBody } from "./StaticBody";
import { ColliderOptions } from "../interfaces/ColliderOptions";

export class Collider extends GameObject {
  constructor(parent: StaticBody, options: ColliderOptions = {}) {
    super();

    this._updatedTransform = new Transform();
    this._parent = parent;

    this.name = options.name ?? "Collider";
    this._enabled = options.enabled ?? true;
    this._originalTransform = options.initialTransform ?? new Transform();
  }

  private _enabled: boolean;
  private _originalTransform: Transform;
  private _updatedTransform: Transform;
  private _parent: StaticBody;
  private _colliding: boolean = false;

  public setTransform(transform: Transform): void {
    this._originalTransform = transform;
  }

  public getTransform(): Transform {
    return this._originalTransform;
  }

  public setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  public isEnabled(): boolean {
    return this._enabled;
  }

  public getParent(): StaticBody {
    return this._parent;
  }

  // @ts-ignore
  public update(deltaTime: number): void {
    this.updateTransform();
  }

  public getBounds(): { x: number; y: number; width: number; height: number } {
    const transform = this._updatedTransform;
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
    return this._colliding;
  }

  public setColliding(colliding: boolean): void {
    this._colliding = colliding;
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
    this._updatedTransform.setPosition({
      x:
        this._originalTransform.getPositionX() +
        this._parent.getTransform().getPositionX(),
      y:
        this._originalTransform.getPositionY() +
        this._parent.getTransform().getPositionY(),
    });

    this._updatedTransform.setRotation(
      this._originalTransform.getRotation() +
        this._parent.getTransform().getRotation()
    );

    this._updatedTransform.setScale({
      x:
        this._originalTransform.getScaleX() +
        this._parent.getTransform().getScaleX(),
      y:
        this._originalTransform.getScaleY() +
        this._parent.getTransform().getScaleY(),
    });
  }
}

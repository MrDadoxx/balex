import { Transform } from "./Transform";
import { gameSettings } from "../gameSettings";
import { StaticBody } from "./StaticBody";
import { ColliderOptions } from "../interfaces/ColliderOptions";
import { Body } from "./Body";

export class Collider extends Body {
  constructor(options: ColliderOptions) {
    super();
    this.enabled = options.enabled ?? true;
    this._updatedTransform = new Transform();
    this._parent = options.parent;
    this.name = options.name ?? "Collider";
    this.transform = options.initialTransform ?? new Transform();
  }

  protected enabled: boolean;
  protected transform: Transform;
  private _updatedTransform: Transform;
  private _parent: StaticBody;
  private _colliding: boolean = false;

  public setTransform(transform: Transform): void {
    this.transform = transform;
  }

  public getTransform(): Transform {
    return this._updatedTransform;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public getParent(): StaticBody {
    return this._parent;
  }

  // @ts-ignore
  public update(): void {
    const updatedTransform = this.getUpdatedTransform(this._parent);
    this._updatedTransform = updatedTransform;
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

  public draw(): void {
    const bounds = this.getBounds();
    const context: CanvasRenderingContext2D = this._parent.getContext();
    context.strokeStyle = gameSettings.debugColor;
    context.lineWidth = 2;
    context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }
}

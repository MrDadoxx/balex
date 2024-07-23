import { Vector2 } from "../types/Vector2";
import { GameObject } from "./GameObject";
import { TransformOptions } from "../interfaces/TransformOptions";

export class Transform extends GameObject {
  constructor(options: TransformOptions = {}) {
    super();
    this.enabled = options.enabled ?? true;
    this.position = options.position ?? { x: 0, y: 0 };
    this.scale = options.scale ?? { x: 1, y: 1 };
    this.rotation = options.rotation ?? 0;
    this.name = options.name ?? "Transform";
  }

  public position: Vector2;
  public rotation: number;
  public scale: Vector2;

  public setTransform(transform: Transform): void {
    this.position = transform.getPosition();
    this.rotation = transform.getRotation();
    this.scale = transform.getScale();
  }

  public translate(translation: Vector2): void {
    this.position.x += translation.x;
    this.position.y += translation.y;
  }

  public rotate(degrees: number): void {
    this.rotation += degrees;
  }

  public scaleBy(scaling: Vector2): void {
    this.scale.x *= scaling.x;
    this.scale.y *= scaling.y;
  }

  public setPosition(position: Vector2): void {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  public setPositionX(x: number): void {
    this.position.x = x;
  }

  public setPositionY(y: number): void {
    this.position.y = y;
  }

  public setRotation(degrees: number): void {
    this.rotation = degrees;
  }

  public setScale(scale: Vector2): void {
    this.scale.x = scale.x;
    this.scale.y = scale.y;
  }

  public setScaleX(x: number): void {
    this.scale.x = x;
  }

  public setScaleY(y: number): void {
    this.scale.y = y;
  }

  public getPositionX(): number {
    return this.position.x;
  }

  public getPositionY(): number {
    return this.position.y;
  }

  public getScaleX(): number {
    return this.scale.x;
  }

  public getScaleY(): number {
    return this.scale.y;
  }

  public getPosition(): Vector2 {
    return this.position;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public getScale(): Vector2 {
    return this.scale;
  }
}

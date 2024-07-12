import { Vector2 } from "../interfaces/Vector2";
import { Controller } from "./Controller";
import { Collider } from "./Collider";
import { CharacterBodyOptions } from "../interfaces/CharacterBodyOptions";
import { StaticBody } from "./StaticBody";

export class CharacterBody extends StaticBody {
  constructor(options: CharacterBodyOptions = {}) {
    super(options);
    this._speed = options.speed ?? 1;
    this._jumpForce = options.jumpForce ?? 40;
    this._floorCollider = new Collider(this);
    this._controller = new Controller(this);
    this.colliders = [this.defaultCollider, this._floorCollider];

    this.name = options.name ?? "CharacterBody";
    this._velocity = options.velocity ?? { x: 0, y: 0 };
    this._controller.enableController(options.controllerType ?? null);
    this.defaultCollider.setEnabled(options.useDefaultCollider ?? true);
    this.defaultCollider.setEnabled(options.useDefaultCollider ?? true);
    this._floorCollider.setEnabled(options.useDefaultCollider ?? true);

    this._floorCollider.getTransform().setPosition({ x: 7, y: 300 });
    this._floorCollider.getTransform().setScale({ x: 1, y: -0.9 });
  }

  private _speed: number;
  private _jumpForce: number;
  private _velocity: Vector2;
  private _controller: Controller;
  private _floorCollider: Collider;

  public draw() {
    this.sprite?.draw(this.transform);
  }

  public getJumpForce(): number {
    return this._jumpForce;
  }

  public setJumpForce(jumpForce: number): void {
    this._jumpForce = jumpForce;
  }

  public getFloorCollider(): Collider {
    return this._floorCollider;
  }

  public getSpeed(): number {
    return this._speed;
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public getVelocity(): Vector2 {
    return this._velocity;
  }

  public getVelocityX(): number {
    return this._velocity.x;
  }

  public getVelocityY(): number {
    return this._velocity.y;
  }

  public setVelocity(velocity: Vector2): void {
    this._velocity = velocity;
  }

  public setVelocityX(velocityX: number): void {
    this._velocity.x = velocityX;
  }

  public setVelocityY(velocityY: number): void {
    this._velocity.y = velocityY;
  }

  public getController() {
    return this._controller;
  }

  public isOnFloor(): boolean {
    return this._floorCollider.isColliding();
  }
}

import { CharacterBodyOptions } from "../interfaces/CharacterBodyOptions";
import { Vector2 } from "../types/Vector2";
import { Controller } from "./Controller";
import { StaticBody } from "./StaticBody";

export class CharacterBody extends StaticBody {
  constructor(options: CharacterBodyOptions = {}) {
    super(options);
    this.name = options.name ?? "CharacterBody";
    this._controller = new Controller(this);
    this._controller.enableController(options.controllerType ?? null);
    this._speed = options.speed ?? 1;
    this._jumpForce = options.jumpForce ?? 2;
    this._velocity = options.velocity ?? { x: 0, y: 0 };
  }

  private _controller: Controller;
  private _speed: number;
  private _jumpForce: number;
  private _velocity: Vector2;

  public getController(): Controller {
    return this._controller;
  }

  public getSpeed(): number {
    return this._speed;
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public getJumpForce(): number {
    return this._jumpForce;
  }

  public setJumpForce(jumpForce: number): void {
    this._jumpForce = jumpForce;
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
}

import { Vector2 } from "../interfaces/Vector2";
import { GameObject } from "./GameObject";
import { Controller } from "./Controller";
import { Collider } from "./Collider";
import { CharacterBodyOptions } from "../interfaces/CharacterBodyOptions";

export class CharacterBody extends GameObject {
  private speed: number;
  private jumpForce: number;
  private velocity: Vector2 = { x: 0, y: 0 };
  private controller: Controller;
  private floorCollider: Collider;
  protected name: string = "CharacterBody";

  constructor(
    context: CanvasRenderingContext2D,
    options: CharacterBodyOptions = {}
  ) {
    super(context, options);
    this.speed = options.speed ?? 1;
    this.jumpForce = options.jumpForce ?? 40;
    this.floorCollider = new Collider(() => this.transform, this);
    this.colliders = [this.collider, this.floorCollider];
    this.controller = new Controller(this);

    if (options.controllerType) {
      this.controller.enableController(options.controllerType);
    }

    this.collider.setEnabled(options.useDefaultCollision ?? true);
    this.floorCollider.setEnabled(options.useDefaultCollision ?? true)
    this.floorCollider.getTransform().setPosition({ x: 7, y: 300 });
    this.floorCollider.getTransform().setScale({ x: 1, y: -0.9 });
  }

  public getJumpForce(): number {
    return this.jumpForce;
  }

  public setJumpForce(jumpForce: number): void {
    this.jumpForce = jumpForce;
  }

  public getFloorCollider(): Collider {
    return this.floorCollider;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public getVelocity(): Vector2 {
    return this.velocity;
  }

  public getVelocityX(): number {
    return this.velocity.x;
  }

  public getVelocityY(): number {
    return this.velocity.y;
  }

  public setVelocity(velocity: Vector2): void {
    this.velocity = velocity;
  }

  public setVelocityX(velocityX: number): void {
    this.velocity.x = velocityX;
  }

  public setVelocityY(velocityY: number): void {
    this.velocity.y = velocityY;
  }

  public getController() {
    return this.controller;
  }

  public isOnFloor(): boolean {
    return this.floorCollider.isColliding();
  }
}

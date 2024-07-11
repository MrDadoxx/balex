import { CharacterBody } from "./CharacterBody";
import { Input, KeyCodes } from "./Input";
import { gameSettings } from "../gameSettings";
import { ControllerType } from "../types/ControllerType";

export class Controller {
  private input: Input = new Input();
  private controller: ControllerType = null;
  private parent: CharacterBody;
  private jumping: boolean = false;

  constructor(parent: CharacterBody) {
    this.parent = parent;
  }

  public moveRight() {
    this.parent.getTransform().translate({ x: this.parent.getSpeed(), y: 0 });
  }

  public moveLeft() {
    this.parent.getTransform().translate({ x: -this.parent.getSpeed(), y: 0 });
  }

  public moveUp() {
    this.parent.getTransform().translate({ x: 0, y: -this.parent.getSpeed() });
  }

  public moveDown() {
    this.parent.getTransform().translate({ x: 0, y: this.parent.getSpeed() });
  }

  public jump() {
    this.parent.setVelocityY(-this.parent.getJumpForce());
    this.jumping = true;
  }

  public isJumping(): boolean {
    return this.jumping;
  }

  public getActiveController() {
    return this.controller;
  }

  public disableActiveController() {
    this.controller = null;
  }

  public enableController(controllerName: ControllerType) {
    this.controller = controllerName;

    if (controllerName === "fourWay") {
      this.parent.getFloorCollider().setEnabled(false);
    } else if (controllerName === "biWay") {
      this.parent.getFloorCollider().setEnabled(true);
    }
  }

  private handleBiWay() {
    if (this.input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight();
    if (this.input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft();
    if (this.input.isKeyDown(KeyCodes.ArrowUp) && this.parent.isOnFloor()) this.jump();

    if (!this.parent.isOnFloor()) {
      this.parent.setVelocityY(this.parent.getVelocityY() + gameSettings.gravity);
    } else if (!this.isJumping()) {
      this.parent.setVelocityY(0);
    }

    if (this.parent.isOnFloor()) {
      this.jumping = false;
    }

    const currentPosition = this.parent.getTransform().getPosition();
    this.parent.getTransform().setPosition({
      x: currentPosition.x + this.parent.getVelocityX(),
      y: currentPosition.y + this.parent.getVelocityY(),
    });
  }

  private handleFourWay() {
    if (this.input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight();
    if (this.input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft();
    if (this.input.isKeyDown(KeyCodes.ArrowUp)) this.moveUp();
    if (this.input.isKeyDown(KeyCodes.ArrowDown)) this.moveDown();
  }

  public update() {
    if (this.controller === "fourWay") this.handleFourWay();
    else if (this.controller === "biWay") this.handleBiWay();
  }
}

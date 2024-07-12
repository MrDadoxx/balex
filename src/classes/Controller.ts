import { CharacterBody } from "./CharacterBody";
import { Input, KeyCodes } from "./Input";
import { gameSettings } from "../gameSettings";
import { ControllerType } from "../types/ControllerType";
import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { GameObject } from "./GameObject";

export class Controller extends GameObject {
  constructor(_parent: CharacterBody, options: GameObjectOptions = {}) {
    super();
    this._parent = _parent;

    this.name = options.name ?? "Controller";
  }

  private _input: Input = new Input();
  private _controller: ControllerType = null;
  private _parent: CharacterBody;
  private _jumping: boolean = false;

  public moveRight() {
    this._parent.getTransform().translate({ x: this._parent.getSpeed(), y: 0 });
  }

  public moveLeft() {
    this._parent
      .getTransform()
      .translate({ x: -this._parent.getSpeed(), y: 0 });
  }

  public moveUp() {
    this._parent
      .getTransform()
      .translate({ x: 0, y: -this._parent.getSpeed() });
  }

  public moveDown() {
    this._parent.getTransform().translate({ x: 0, y: this._parent.getSpeed() });
  }

  public jump() {
    this._parent.setVelocityY(-this._parent.getJumpForce());
    this._jumping = true;
  }

  public is_jumping(): boolean {
    return this._jumping;
  }

  public getActiveController() {
    return this._controller;
  }

  public disableActiveController() {
    this._controller = null;
  }

  public enableController(controllerName: ControllerType) {
    this._controller = controllerName;

    if (controllerName === "fourWay") {
      this._parent.getFloorCollider().setEnabled(false);
    } else if (controllerName === "biWay") {
      this._parent.getFloorCollider().setEnabled(true);
    }
  }

  private handleBiWay() {
    if (this._input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight();
    if (this._input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft();
    if (this._input.isKeyDown(KeyCodes.ArrowUp) && this._parent.isOnFloor())
      this.jump();

    if (!this._parent.isOnFloor()) {
      this._parent.setVelocityY(
        this._parent.getVelocityY() + gameSettings.gravity
      );
    } else if (!this.is_jumping()) {
      this._parent.setVelocityY(0);
    }

    if (this._parent.isOnFloor()) {
      this._jumping = false;
    }

    const currentPosition = this._parent.getTransform().getPosition();
    this._parent.getTransform().setPosition({
      x: currentPosition.x + this._parent.getVelocityX(),
      y: currentPosition.y + this._parent.getVelocityY(),
    });
  }

  private handleFourWay() {
    if (this._input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight();
    if (this._input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft();
    if (this._input.isKeyDown(KeyCodes.ArrowUp)) this.moveUp();
    if (this._input.isKeyDown(KeyCodes.ArrowDown)) this.moveDown();
  }

  public update() {
    if (this._controller === "fourWay") this.handleFourWay();
    else if (this._controller === "biWay") this.handleBiWay();
  }
}

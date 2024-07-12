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

  public moveRight(deltaTime: number) {
    this._parent
      .getTransform()
      .translate({ x: this._parent.getSpeed() * deltaTime, y: 0 });
  }

  public moveLeft(deltaTime: number) {
    this._parent
      .getTransform()
      .translate({ x: -this._parent.getSpeed() * deltaTime, y: 0 });
  }

  public moveUp(deltaTime: number) {
    this._parent
      .getTransform()
      .translate({ x: 0, y: -this._parent.getSpeed() * deltaTime });
  }

  public moveDown(deltaTime: number) {
    this._parent
      .getTransform()
      .translate({ x: 0, y: this._parent.getSpeed() * deltaTime });
  }

  public jump(deltaTime: number) {
    this._parent.setVelocityY(-this._parent.getJumpForce() * deltaTime);
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

  private handleBiWay(deltaTime: number) {
    if (this._input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight(deltaTime);
    if (this._input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft(deltaTime);
    if (this._input.isKeyDown(KeyCodes.ArrowUp) && this._parent.isOnFloor())
      this.jump(deltaTime);

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

  private handleFourWay(deltaTime: number) {
    if (this._input.isKeyDown(KeyCodes.ArrowRight)) this.moveRight(deltaTime);
    if (this._input.isKeyDown(KeyCodes.ArrowLeft)) this.moveLeft(deltaTime);
    if (this._input.isKeyDown(KeyCodes.ArrowUp)) this.moveUp(deltaTime);
    if (this._input.isKeyDown(KeyCodes.ArrowDown)) this.moveDown(deltaTime);
  }

  public update(deltaTime: number) {
    if (this._controller === "fourWay") this.handleFourWay(deltaTime);
    else if (this._controller === "biWay") this.handleBiWay(deltaTime);
  }
}

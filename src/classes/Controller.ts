import { CharacterBody } from "./CharacterBody";
import { Input } from "./Input";
import { KeyCodes } from "../enums/KeyCodes";
import { gameSettings } from "../gameSettings";
import { ControllerType } from "../types/ControllerType";
import { GameObject } from "./GameObject";
import { ControllerOptions } from "../interfaces/ControllerOptions";
import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { Action } from "./Action";

export class Controller extends GameObject {
  constructor(parent: CharacterBody, options: GameObjectOptions = {}) {
    super();
    this.enabled = options.enabled ?? true;
    this._parent = parent;
    this.name = options.name ?? "Controller";
  }

  private _input: Input = new Input();
  private _controller: ControllerType = null;
  private _parent: CharacterBody;
  private _jumping: boolean = false;
  private _options: ControllerOptions = {
    moveRightAction: new Action({
      actionName: "moveRight",
      keys: [KeyCodes.ArrowRight, KeyCodes.KeyD],
    }),

    moveLeftAction: new Action({
      actionName: "moveLeft",
      keys: [KeyCodes.ArrowLeft, KeyCodes.KeyA],
    }),

    moveUpAction: new Action({
      actionName: "moveLeft",
      keys: [KeyCodes.ArrowUp, KeyCodes.KeyW],
    }),

    moveDownAction: new Action({
      actionName: "moveLeft",
      keys: [KeyCodes.ArrowDown, KeyCodes.KeyS],
    }),

    jumpAction: new Action({
      actionName: "jump",
      keys: [KeyCodes.ArrowUp, KeyCodes.KeyW, KeyCodes.Space],
    }),
  };

  private _moveRightAction: Action = this._options.moveRightAction;
  private _moveLeftAction: Action = this._options.moveLeftAction;
  private _moveUpAction: Action = this._options.moveUpAction;
  private _moveDownAction: Action = this._options.moveDownAction;
  private _jumpAction: Action = this._options.jumpAction;

  public setOptions(options: ControllerOptions) {
    this._moveRightAction = options.moveRightAction ?? this._moveRightAction;
    this._moveLeftAction = options.moveLeftAction ?? this._moveLeftAction;
    this._moveDownAction = options.moveDownAction ?? this._moveDownAction;
    this._moveUpAction = options.moveUpAction ?? this._moveUpAction;
    this._jumpAction = options.jumpAction ?? this._jumpAction;

    this._input = new Input();
    this._input.addAction(this._moveRightAction);
    this._input.addAction(this._moveLeftAction);
    this._input.addAction(this._moveDownAction);
    this._input.addAction(this._moveUpAction);
    this._input.addAction(this._jumpAction);
    console.log("Controller options set", this.getOptions());
    console.log(this._input.getActions());
  }

  public getOptions(): ControllerOptions {
    return this._options;
  }

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
    if (this._input.isActionDown(this._moveRightAction)) {
      this.moveRight(deltaTime);
    }
    if (this._input.isActionDown(this._moveLeftAction)) {
      this.moveLeft(deltaTime);
    }
    if (
      this._input.isActionDown(this._jumpAction) &&
      this._parent.isOnFloor()
    ) {
      this.jump(deltaTime);
    }

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
    if (this._input.isActionDown(this._moveRightAction)) {
      this.moveRight(deltaTime);
    }
    if (this._input.isActionDown(this._moveLeftAction)) {
      this.moveLeft(deltaTime);
    }
    if (this._input.isActionDown(this._moveUpAction)) {
      this.moveUp(deltaTime);
    }
    if (this._input.isActionDown(this._moveDownAction)) {
      this.moveDown(deltaTime);
    }
  }

  public update(deltaTime: number) {
    if (this._controller === "fourWay") this.handleFourWay(deltaTime);
    else if (this._controller === "biWay") this.handleBiWay(deltaTime);
  }
}

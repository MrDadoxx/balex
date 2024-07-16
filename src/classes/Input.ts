import { GameObject } from "./GameObject";
import { Action } from "./Action";
import { InputOptions } from "../interfaces/InputOptions";
import { KeyCodes } from "../enums/KeyCodes";

export class Input extends GameObject {
  constructor(options: InputOptions = {}) {
    super();
    document.addEventListener("keydown", (event) => this._onKeyDown(event));
    document.addEventListener("keyup", (event) => this._onKeyUp(event));
    this.enabled = options.enabled ?? true;
    this.name = options.name ?? "Input";
    this._actions = new Set(options.actions ?? []);
  }

  private _actions: Set<Action>;
  private _keysDown: Set<KeyCodes> = new Set();
  public onKeyDown: (keyCode: KeyCodes) => void = () => {};
  public onActionDown: (action: Action) => void = () => {};
  public onActionUp: (action: Action) => void = () => {};

  public isKeyDown(keyCode: KeyCodes): boolean {
    return this._keysDown.has(keyCode);
  }

  private _onKeyDown(event: KeyboardEvent): void {
    const keyCode = KeyCodes[event.code as keyof typeof KeyCodes];
    if (keyCode !== undefined) {
      this._keysDown.add(keyCode);
      this._actions.forEach((action) => {
        action.getKeys().forEach((key) => {
          if (this._keysDown.has(key)) {
            this.onActionDown(action);
          }
        });
      });
    }
    event.preventDefault();
    this.onKeyDown(keyCode);
  }

  private _onKeyUp(event: KeyboardEvent): void {
    const keyCode = KeyCodes[event.code as keyof typeof KeyCodes];
    if (keyCode !== undefined) {
      this._keysDown.delete(keyCode);
      this._actions.forEach((action) => {
        let allKeysReleased = true;
        action.getKeys().forEach((key) => {
          if (this._keysDown.has(key)) {
            allKeysReleased = false;
          }
        });
        if (allKeysReleased) {
          this.onActionUp(action);
        }
      });
    }
    event.preventDefault();
  }

  public isActionDown(action: Action): boolean {
    for (const key of action.getKeys()) {
      if (this._keysDown.has(key)) {
        return true;
      }
    }
    return false;
  }

  public addAction(action: Action): void {
    this._actions.add(action);
  }

  public removeAction(action: Action): void {
    if (this._actions.has(action)) {
      this._actions.delete(action);
    } else {
      console.error("Action not found.");
    }
  }

  public getActions(): Set<Action> {
    return this._actions;
  }
}

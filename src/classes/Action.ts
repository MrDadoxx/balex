import { GameObject } from "./GameObject";
import { ActionOptions } from "../interfaces/ActionOptions";
import { KeyCodes } from "../enums/KeyCodes";

export class Action extends GameObject {
  constructor(options: ActionOptions) {
    super();
    this.enabled = options.enabled ?? true;
    this.name = options.name ?? "Action";
    this._actionName = options.actionName;
    this._keys = options.keys;
  }

  private _actionName: string;
  private _keys: KeyCodes[];

  public getKeys(): KeyCodes[] {
    return this._keys;
  }

  public setKeys(keys: KeyCodes[]): void {
    this._keys = keys;
  }

  public getActionName(): string {
    return this._actionName;
  }

  public setActionName(name: string): void {
    this._actionName = name;
  }
}

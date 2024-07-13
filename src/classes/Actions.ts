import { ActionsOptions } from "../interfaces/ActionsOptions";
import { GameObject } from "./GameObject";
import { Action } from "../types/Action";

export class Actions extends GameObject {
  constructor(options: ActionsOptions = {}) {
    super();
    this.name = options.name ?? "Action";
    this._actions = options.actions ?? [];
  }

  private _actions: Action[];
}

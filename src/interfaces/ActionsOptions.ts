import { Action } from "../types/Action";
import { GameObjectOptions } from "./GameObjectOptions";

export interface ActionsOptions extends GameObjectOptions {
  actions?: Action[];
}

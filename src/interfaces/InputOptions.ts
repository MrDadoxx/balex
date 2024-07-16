import { GameObjectOptions } from "./GameObjectOptions";
import { Action } from "../types/Action";

export interface InputOptions extends GameObjectOptions {
  actions?: Action[];
}

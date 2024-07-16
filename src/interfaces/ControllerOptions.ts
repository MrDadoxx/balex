import { Action } from "../classes/Action";
import { GameObjectOptions } from "./GameObjectOptions";

export interface ControllerOptions extends GameObjectOptions {
  moveRightAction: Action;
  moveLeftAction: Action;
  moveUpAction: Action;
  moveDownAction: Action;
  jumpAction: Action;
}

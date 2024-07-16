import { GameObjectOptions } from "./GameObjectOptions";
import { KeyCodes } from "../enums/KeyCodes";

export interface ActionOptions extends GameObjectOptions {
  actionName: string;
  keys: KeyCodes[];
}

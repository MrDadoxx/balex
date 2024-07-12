import { Scene } from "../classes/Scene";
import { GameObjectOptions } from "./GameObjectOptions";

export interface GameOptions extends GameObjectOptions {
  scenes?: Scene[];
  enableCollidersDebug?: boolean;
}

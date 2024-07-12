import { GameObject } from "../classes/GameObject";
import { GameObjectOptions } from "./GameObjectOptions";

export interface SceneOptions extends GameObjectOptions {
  objects?: GameObject[];
}

import { GameObjectOptions } from "./GameObjectOptions";
import { Vector2 } from "./Vector2";

export interface TransformOptions extends GameObjectOptions {
  position?: Vector2;
  rotation?: number;
  scale?: Vector2;
}

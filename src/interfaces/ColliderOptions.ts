import { Transform } from "../classes/Transform";
import { GameObjectOptions } from "./GameObjectOptions";

export interface ColliderOptions extends GameObjectOptions {
  initialTransform?: Transform;
}

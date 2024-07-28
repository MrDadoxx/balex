import { StaticBody } from "../classes/StaticBody";
import { Transform } from "../classes/Transform";
import { GameObjectOptions } from "./GameObjectOptions";

export interface ColliderOptions extends GameObjectOptions {
  parent: StaticBody;
  transform?: Transform;
}

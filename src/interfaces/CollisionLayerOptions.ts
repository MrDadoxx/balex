import { GameObjectOptions } from "./GameObjectOptions";
import { Collider } from "../classes/Collider";

export interface CollisionLayerOptions extends GameObjectOptions {
  colliders?: Collider[];
}

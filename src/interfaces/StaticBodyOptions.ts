import { Transform } from "../classes/Transform";
import { GameObjectOptions } from "./GameObjectOptions";

export interface StaticBodyOptions extends GameObjectOptions {
  useDefaultCollider?: boolean;
  defaultColliderTransform?: Transform;
  transform?: Transform;
  useSprite?: boolean;
  spriteImagePath?: string;
  spriteVisible?: boolean;
}

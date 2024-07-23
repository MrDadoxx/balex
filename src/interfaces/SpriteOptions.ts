import { StaticBody } from "../classes/StaticBody";
import { GameObjectOptions } from "./GameObjectOptions";

export interface SpriteOptions extends GameObjectOptions {
  parent: StaticBody;
  visible?: boolean;
  imagePath: string;
}

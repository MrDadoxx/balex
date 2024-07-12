import { GameObjectOptions } from "./GameObjectOptions";

export interface StaticBodyOptions extends GameObjectOptions {
  useDefaultSprite?: boolean;
  spriteImagePath?: string;
}

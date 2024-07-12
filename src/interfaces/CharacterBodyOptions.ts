import { ControllerType } from "../types/ControllerType";
import { StaticBodyOptions } from "./StaticBodyOptions";
import { Vector2 } from "./Vector2";

export interface CharacterBodyOptions extends StaticBodyOptions {
  useDefaultCollider?: boolean;
  speed?: number;
  jumpForce?: number;
  velocity?: Vector2;
  controllerType?: ControllerType;
}

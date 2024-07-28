import { ControllerType } from "../types/ControllerType";
import { StaticBodyOptions } from "./StaticBodyOptions";
import { Vector2 } from "../types/Vector2";

export interface CharacterBodyOptions extends StaticBodyOptions {
  speed?: number;
  jumpForce?: number;
  velocity?: Vector2;
  controllerType?: ControllerType;
  useFloorCollider?: boolean;
}

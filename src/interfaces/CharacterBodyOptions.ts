import { ControllerType } from '../types/ControllerType';
import { GameObjectOptions } from './GameObjectOptions';

export interface CharacterBodyOptions extends GameObjectOptions {
  speed?: number;
  jumpForce?: number;
  controllerType?: ControllerType;
}

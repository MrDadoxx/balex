import { GameObjectOptions } from "./GameObjectOptions";

export interface TimerOptions extends GameObjectOptions {
  autostart?: boolean;
  time?: number;
  loop?: boolean;
}

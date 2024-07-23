import { HexaColor } from "../types/HexaColor";

export interface GameSettings {
  gameName: string;
  gameIcon: string;
  debugColor: HexaColor;
  gravity: number;
  debugColliders: boolean;
}

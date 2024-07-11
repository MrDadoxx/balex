import { HexaColor } from "./types/HexaColor";

interface gameSettings {
  gameName: string;
  debugColor: HexaColor;
  gravity: number;
  context: CanvasRenderingContext2D | null;
}

export const gameSettings: gameSettings = {
  gameName: "Exodus Game",
  debugColor: "#f00",
  gravity: 2,
  context: null,
};

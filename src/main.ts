import "./style.css";
import { Game } from "./classes/Game";
import { Scene } from "./classes/Scene";
import { Transform } from "./classes/Transform";
import { StaticBody } from "./classes/StaticBody";
import { Sprite } from "./classes/Sprite";

const gameName = new Game();
var background: StaticBody;
var sprite1: Sprite;
var scene1: Scene;

gameName.init = () => {
  background = new StaticBody({
    transform: new Transform({
      scale: { x: 200, y: 200 },
      position: { x: 0, y: 0 },
    }),
  });

  sprite1 = new Sprite({
    parent: background,
    imagePath: "src/assets/sprites/cheche.png",
  });
  scene1 = new Scene({ objects: [background] });
  background.addSprite([sprite1]);
  gameName.addScene([scene1]);
};

gameName.update = () => {
  background.getTransform().translate({ x: 0.1, y: 0.1})
};

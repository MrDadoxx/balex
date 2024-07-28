import "./style.css";
import { Game } from "./classes/Game";
import { Scene } from "./classes/Scene";
import { Transform } from "./classes/Transform";
import { StaticBody } from "./classes/StaticBody";
import { Sprite } from "./classes/Sprite";
import { CharacterBody } from "./classes/CharacterBody";

const gameName = new Game();
var player: CharacterBody;
var sprite1: Sprite;
var scene1: Scene;

gameName.init = () => {
  player = new CharacterBody({
    transform: new Transform({
      scale: { x: 200, y: 200 },
      position: { x: 0, y: 0 },
    }),
  });

  sprite1 = new Sprite({
    parent: player,
    imagePath: "src/assets/sprites/cheche.png",
  });
  scene1 = new Scene({ objects: [player] });
  player.addSprite([sprite1]);
  gameName.addScene([scene1]);
};

gameName.update = () => {
  player.getTransform().translate({ x: 1, y: 1 });

  // console.log(background.getSprites()[0].getTransform().getPosition());
  // console.log(background.getCanvas().style)
};

import "./style.css";
import { Game } from "./classes/Game";
import { Scene } from "./classes/Scene";
import { CharacterBody } from "./classes/CharacterBody";
import { CollisionLayer } from "./classes/CollisionLayer";
import { GameObject } from "./classes/GameObject";
import { Transform } from "./classes/Transform";
import { gameSettings } from "./gameSettings";

const $canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = $canvas.getContext("2d");
gameSettings.context = context;

if (context) {
  const game = new Game();
  const scene = new Scene();
  const background = new GameObject({
    imagePath: "src/assets/sprites/landscape.jpg",
  });

  const player = new CharacterBody({
    imagePath: "src/assets/sprites/cheche.png",
    speed: 20,
    jumpForce: 40,
    controllerType: "biWay",
  });

  const floor = new GameObject({
    imagePath: "src/assets/sprites/grass.jpg",
  });

  const collisionLayer = new CollisionLayer([
    floor.getColliders()[0],
    player.getColliders()[0],
    player.getColliders()[1],
  ]);

  game.enableCollidersDebug();
  game.addScene([scene]);
  scene.addObject([background, player, floor, collisionLayer]);

  floor.getTransform().setScale({ x: 6, y: 0.4 });
  floor.getTransform().setPosition({ x: 0, y: 700 });
  floor
    .getColliders()[0]
    .setTransform(
      new Transform({ position: { x: 0, y: 80 }, scale: { x: 14, y: 0 } })
    );

  player
    .getColliders()[0]
    .setTransform(new Transform({ scale: { x: 1.15, y: 2.05 } }));

  background.getTransform().setScale({ x: 0.4, y: 0.4 });
  background.getTransform().setPosition({ x: -2000, y: -1220 });
}

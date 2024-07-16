import "./style.css";
import { Game } from "./classes/Game";
import { Scene } from "./classes/Scene";
import { CharacterBody } from "./classes/CharacterBody";
import { CollisionLayer } from "./classes/CollisionLayer";
import { Transform } from "./classes/Transform";
import { gameSettings } from "./gameSettings";
import { StaticBody } from "./classes/StaticBody";

const $canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = $canvas.getContext("2d");
gameSettings.context = context;

if (context) {
  // const floor = new StaticBody({
  //   spriteImagePath: "src/assets/sprites/grass.jpg",
  //   defaultColliderTransform: new Transform({
  //     position: { x: 0, y: 80 },
  //     scale: { x: 14, y: 0 },
  //   }),
  //   transform: new Transform({
  //     scale: { x: 6, y: 1 },
  //     position: { x: 0, y: 700 },
  //   }),
  // });

  // const player = new CharacterBody({
  //   spriteImagePath: "src/assets/sprites/cheche.png",
  //   speed: 900,
  //   jumpForce: 3000,
  //   controllerType: "biWay",
  //   defaultColliderTransform: new Transform({ scale: { x: 1.15, y: 2.05 } }),
  // });

  // const collisionLayer = new CollisionLayer({
  //   colliders: [
  //     floor.getColliders()[0],
  //     player.getColliders()[0],
  //     player.getColliders()[1],
  //   ],
  // });

  const background = new StaticBody({
    spriteImagePath: "src/assets/sprites/landscape.jpg",
    useDefaultCollider: true,
    transform: new Transform({
      scale: { x: 0.4, y: 0.4 },
      position: { x: -2000, y: -1220 },
    }),
  });

  const scene = new Scene({
    objects: [background],
  });

  const game = new Game({ scenes: [scene], enableCollidersDebug: true });
}

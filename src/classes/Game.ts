import { gameSettings } from "../gameSettings";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";

export class Game extends GameObject {
  constructor() {
    super();
    this.startUpdateLoop();
    document.title = gameSettings.gameName;

    document.addEventListener("DOMContentLoaded", () => {
      this._scenes.forEach((scene) => {
        scene.getObjects().forEach((object) => {
          object.init();
        });
      });
    });
  }

  private _scenes: Scene[] = [];
  private _debugColliders: boolean = false;
  protected context: CanvasRenderingContext2D | null = gameSettings.context;
  protected name: string = "Game";

  private startUpdateLoop(): void {
    if (this.context) {
      const animate = () => {
        this.update();
        // @ts-ignore
        this.context.clearRect(
          0,
          0,
          // @ts-ignore
          this.context.canvas.width,
          // @ts-ignore
          this.context.canvas.height
        );

        this._scenes.forEach((scene) => {
          scene.getObjects().forEach((object) => {
            object.update();

            if (object.has("draw") && !object.isClass("StaticBody")) {
              // @ts-ignore
              object.draw();
            }

            if (object.has("getController")) {
              // @ts-ignore
              object.getController().update();
            }

            if (object.has("getColliders")) {
              // @ts-ignore
              object.getColliders().forEach((collider) => {
                if (this._debugColliders) {
                  collider.draw(this.context);
                }

                collider.update();
              });
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();
    } else {
      console.error("You must declare a context in gameSettings.context");
    }
  }

  public update() {}

  public addScene(scenes: Scene[]): void {
    scenes.forEach((scene) => {
      this._scenes.push(scene);
    });
  }

  public getScenes(): Scene[] {
    return this._scenes;
  }

  public removeScene(scene: Scene): void {
    const index = this._scenes.indexOf(scene);
    if (index !== -1) {
      this._scenes.splice(index, 1);
    } else {
      console.error("Scene not found in the game.");
    }
  }

  public enableCollidersDebug() {
    this._debugColliders = true;
  }

  public disableCollidersDebug() {
    this._debugColliders = false;
  }
}

import { gameSettings } from "../gameSettings";
import { GameOptions } from "../interfaces/GameOptions";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";

export class Game extends GameObject {
  constructor(options: GameOptions = {}) {
    super();
    this.startUpdateLoop();
    this.name = options.name ?? "Game";
    this._scenes = options.scenes ?? [];
    this._debugColliders = options.enableCollidersDebug ?? false;

    document.addEventListener("DOMContentLoaded", () => {
      this.init();
      this._scenes.forEach((scene) => {
        scene.getObjects().forEach((object) => {
          object.init();
        });
      });
    });
  }

  private _scenes: Scene[];
  private _debugColliders: boolean;
  protected context: CanvasRenderingContext2D | null = gameSettings.context;
  protected name: string;
  private _lastFrameTime: number = 0;
  public deltaTime: number = 0;

  private startUpdateLoop(): void {
    if (this.context) {
      const animate = (time: number) => {
        this.deltaTime = (time - this._lastFrameTime) / 1000;
        this._lastFrameTime = time;
        this.update(this.deltaTime);
        this.context!.clearRect(
          0,
          0,
          this.context!.canvas.width,
          this.context!.canvas.height
        );

        this._scenes.forEach((scene) => {
          scene.getObjects().forEach((object) => {
            object.update(this.deltaTime);

            if (object.has("draw") && !object.isClass("StaticBody")) {
              // @ts-ignore
              object.draw();
            }

            if (object.has("getController")) {
              // @ts-ignore
              object.getController().update(this.deltaTime);
            }

            if (object.has("getColliders")) {
              // @ts-ignore
              object.getColliders().forEach((collider) => {
                if (this._debugColliders) {
                  collider.draw(this.context!);
                }

                collider.update(this.deltaTime);
              });
            }
          });
        });

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    } else {
      console.error("You must declare a context in gameSettings.context");
    }
  }

  public init() {
    document.title = gameSettings.gameName;

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = gameSettings.gameIcon;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  // @ts-ignore
  public update(deltaTime: number) {}

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

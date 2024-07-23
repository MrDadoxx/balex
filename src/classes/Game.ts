import { gameSettings } from "../gameSettings";
import { GameOptions } from "../interfaces/GameOptions";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";

export class Game extends GameObject {
  private _scenes: Scene[];
  private _lastFrameTime: number = 0;
  public deltaTime: number = 0;

  constructor(options: GameOptions = {}) {
    super(options);
    this._scenes = options.scenes ?? [];

    document.addEventListener("DOMContentLoaded", () => {
      this._init();
      this.initializeScenes();
      this.startUpdateLoop();
    });
  }

  private startUpdateLoop(): void {
    const animate = (time: number) => {
      this.deltaTime = (time - this._lastFrameTime) / 1000;
      this._lastFrameTime = time;
      this.update(this.deltaTime);

      this._scenes.forEach((scene) => {
        scene.getObjects().forEach((object) => {
          if (!object.isEnabled()) return;
          object.update(this.deltaTime);
        });
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private initializeScenes(): void {
    this._scenes.forEach((scene) => {
      scene.getObjects().forEach((object) => {
        object.init();
      });
    });
  }

  private _init() {
    document.title = gameSettings.gameName;

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = gameSettings.gameIcon;
    document.getElementsByTagName("head")[0].appendChild(link);
    this.init();
  }

  public init() {}
  // @ts-ignore
  public update(deltaTime: number): void {}

  public addScene(scenes: Scene[]): void {
    this._scenes.push(...scenes);
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
}

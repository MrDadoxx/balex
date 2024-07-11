import { gameSettings } from "../gameSettings";
import { Scene } from "./Scene";

export class Game {
  constructor() {
    this.startUpdateLoop();
    this.update();
    document.title = gameSettings.gameName;
  }

  private scenes: Scene[] = [];
  protected context: CanvasRenderingContext2D | null = gameSettings.context;
  private debugColliders: boolean = false;

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

        this.scenes.forEach((scene) => {
          scene.getObjects().forEach((object) => {
            if (object.has("update")) object.update();
            // @ts-ignore
            if (object.has("draw")) object.draw();
            // @ts-ignore
            if (object.has("getController")) object.getController().update();
            object.getColliders().forEach((collider) => {
              if (this.debugColliders) {
                // @ts-ignore
                collider.draw(this.context);
              }

              collider.update();
            });
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
      this.scenes.push(scene);
    });
  }

  public getScenes(): Scene[] {
    return this.scenes;
  }

  public removeScene(scene: Scene): void {
    const index = this.scenes.indexOf(scene);
    if (index !== -1) {
      this.scenes.splice(index, 1);
    } else {
      console.error("Scene not found in the game.");
    }
  }

  public enableCollidersDebug() {
    this.debugColliders = true;
  }

  public disableCollidersDebug() {
    this.debugColliders = false;
  }
}

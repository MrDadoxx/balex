import { Scene } from "./Scene";

export class Game {
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.startUpdateLoop();
    this.update();
  }

  private scenes: Scene[] = [];
  protected context: CanvasRenderingContext2D;
  private debugColliders: boolean = false;

  private startUpdateLoop(): void {
    const animate = () => {
      this.update();
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
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
              collider.draw(this.context);
            }

            collider.update();
          });
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
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

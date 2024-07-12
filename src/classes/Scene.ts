import { GameObject } from "./GameObject";
import { SceneOptions } from "../interfaces/SceneOptions";

export class Scene extends GameObject {
  constructor(options: SceneOptions = {}) {
    super();

    this.name = options.name ?? "Scene";
    this._objects = options.objects ?? [];
  }

  private _objects: GameObject[];

  public addObject(gameObjects: GameObject[]): void {
    gameObjects.forEach((gameObject) => {
      this._objects.push(gameObject);
    });
  }

  public getObjects(): GameObject[] {
    return this._objects;
  }

  public removeObject(object: GameObject): void {
    const index = this._objects.indexOf(object);
    if (index !== -1) {
      this._objects.splice(index, 1);
    } else {
      console.error("Scene not found in the game.");
    }
  }
}

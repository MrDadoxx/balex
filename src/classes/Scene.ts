import { Object } from "../types/Object";

export class Scene {
  private objects: Object[] = [];

  public addObject(gameObjects: Object[]): void {
    gameObjects.forEach((gameObject) => {
      this.objects.push(gameObject);
    });
  }

  public getObjects(): Object[] {
    return this.objects;
  }

  public removeObject(object: Object): void {
    const index = this.objects.indexOf(object);
    if (index !== -1) {
      this.objects.splice(index, 1);
    } else {
      console.error("Scene not found in the game.");
    }
  }
}

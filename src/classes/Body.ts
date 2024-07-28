import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { Collider } from "./Collider";
import { GameObject } from "./GameObject";
import { Sprite } from "./Sprite";
import { StaticBody } from "./StaticBody";
import { Transform } from "./Transform";

export class Body extends GameObject {
  constructor(options: GameObjectOptions = {}) {
    super();
    this.name = options.name ?? "Body";
    this.transform = new Transform();
  }

  protected transform: Transform;

  public getTransform(): Transform {
    return this.transform;
  }

  public getUpdatedTransform(parent: StaticBody) {
    const positionX =
      parent.getTransform().getPositionX() + this.transform.getPositionX();

    const positionY =
      parent.getTransform().getPositionY() + this.transform.getPositionY();

    const rotation =
      parent.getTransform().getRotation() + this.transform.getRotation();

    const scaleX =
      parent.getTransform().getScaleX() * this.transform.getScaleX();

    const scaleY =
      parent.getTransform().getScaleY() * this.transform.getScaleY();

    const updatedTransform = new Transform({
      position: { x: positionX, y: positionY },
      rotation: rotation,
      scale: { x: scaleX, y: scaleY },
    });

    return updatedTransform;
  }
}

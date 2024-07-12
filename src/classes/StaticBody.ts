import { StaticBodyOptions } from "../interfaces/StaticBodyOptions";
import { GameObject } from "./GameObject";
import { Transform } from "./Transform";
import { Collider } from "./Collider";
import { Sprite } from "./Sprite";

export class StaticBody extends GameObject {
  constructor(options: StaticBodyOptions) {
    super();
    this.name = options.name ?? "StaticBody";
    this.sprite = new Sprite(options.spriteImagePath ?? "");
  }

  protected sprite: Sprite | null = null;
  protected defaultCollider: Collider = new Collider(this);
  protected transform: Transform = new Transform();
  protected colliders: Collider[] = [this.defaultCollider];

  public init(): void {
    this.draw();
  }

  public draw(): void {
    this.sprite?.draw(this.transform);
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public getColliders(): Collider[] {
    return this.colliders;
  }
}

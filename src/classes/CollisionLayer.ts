import { Collider } from "./Collider";
import { CollisionLayerOptions } from "../interfaces/CollisionLayerOptions";
import { GameObject } from "./GameObject";

export class CollisionLayer extends GameObject {
  constructor(options: CollisionLayerOptions = {}) {
    super();
    this.enabled = options.enabled ?? true;
    this._colliders = options.colliders ?? [];
    this.name = options.name ?? "CollisionLayer";
  }

  private _colliders: Collider[];

  public addCollider(colliders: Collider[]): void {
    colliders.forEach((collider) => {
      this._colliders.push(collider);
    });
  }

  public getColliders(): Collider[] {
    return this._colliders;
  }

  public update(): void {
    const length = this._colliders.length;
    for (let a = 0; a < length; a++) {
      for (let b = 0; b < length; b++) {
        if (a === b) continue;
        const colliderA = this._colliders[a];
        const colliderB = this._colliders[b];

        if (
          !colliderA.isEnabled() ||
          !colliderB.isEnabled() ||
          colliderA.getParent() === colliderB.getParent()
        )
          continue;

        if (colliderA.isCollidingWith(colliderB)) {
          colliderA.setColliding(true);
          colliderB.setColliding(true);
        } else {
          colliderA.setColliding(false);
          colliderB.setColliding(false);
        }
      }
    }
  }
}

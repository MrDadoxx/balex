import { Collider } from "./Collider";

export class CollisionLayer {
  constructor(private colliders: Collider[] = []) {}

  public addCollider(colliders: Collider[]): void {
    colliders.forEach((collider) => {
      this.colliders.push(collider);
    });
  }

  public getColliders(): Collider[] {
    return this.colliders;
  }

  public has(name: string): boolean {
    return name in this;
  }

  public update(): void {
    const length = this.colliders.length;
    for (let a = 0; a < length; a++) {
      for (let b = 0; b < length; b++) {
        if (a === b) continue;
        const colliderA = this.colliders[a];
        const colliderB = this.colliders[b];

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

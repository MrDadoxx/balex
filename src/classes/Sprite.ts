import { gameSettings } from "../gameSettings";
import { Transform } from "./Transform";

export class Sprite {
  constructor(imagePath: string) {
    this.image = new Image();
    this.image.src = imagePath;
  }

  private image: HTMLImageElement;
  private context: CanvasRenderingContext2D | null = gameSettings.context;

  public getImagePath(): string {
    return this.image.src;
  }

  public draw(transform: Transform): void {
    const { x, y } = transform.position;
    const { x: scaleX, y: scaleY } = transform.scale;
    const rotation = transform.rotation;

    if (this.context) {
      this.context.save();
      this.context.translate(
        x + this.image.width / 2,
        y + this.image.height / 2
      );
      this.context.rotate(rotation * (Math.PI / 180));
      this.context.scale(scaleX, scaleY);
      this.context.drawImage(
        this.image,
        -this.image.width / 2,
        -this.image.height / 2
      );
      this.context.restore();
    }
  }
}

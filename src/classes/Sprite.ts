import { gameSettings } from "../gameSettings";
import { SpriteOptions } from "../interfaces/SpriteOptions";
import { GameObject } from "./GameObject";
import { Transform } from "./Transform";

export class Sprite extends GameObject {
  constructor(imagePath: string, options: SpriteOptions = {}) {
    super();
    this._image = new Image();
    this._image.src = imagePath;
    this.name = options.name ?? "Sprite";
    this._visible = options.visible ?? true;
  }

  protected context: CanvasRenderingContext2D | null = gameSettings.context;
  private _visible: boolean;
  private _image: HTMLImageElement;

  public isVisible(): boolean {
    return this._visible;
  }

  public setVisible(visible: boolean): void {
    this._visible = visible;
  }

  public getImagePath(): string {
    return this._image.src;
  }

  public draw(transform: Transform): void {
    const { x, y } = transform.position;
    const { x: scaleX, y: scaleY } = transform.scale;
    const rotation = transform.rotation;

    if (this.context) {
      this.context.save();
      this.context.translate(
        x + this._image.width / 2,
        y + this._image.height / 2
      );
      this.context.rotate(rotation * (Math.PI / 180));
      this.context.scale(scaleX, scaleY);
      this.context.drawImage(
        this._image,
        -this._image.width / 2,
        -this._image.height / 2
      );
      this.context.restore();
    }
  }
}

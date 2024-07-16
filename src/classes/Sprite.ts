import { SpriteOptions } from "../interfaces/SpriteOptions";
import { GameObject } from "./GameObject";
import { StaticBody } from "./StaticBody";
import { Transform } from "./Transform";

export class Sprite extends GameObject {
  private _image: HTMLImageElement;
  private _visible: boolean;
  private _parent: StaticBody;

  constructor(
    imagePath: string,
    parent: StaticBody,
    options: SpriteOptions = {}
  ) {
    super(options);
    this._image = new Image();
    this._image.src = imagePath;
    this._visible = options.visible ?? true;
    this._parent = parent;
  }

  public isVisible(): boolean {
    return this._visible;
  }

  public setVisible(visible: boolean): void {
    this._visible = visible;
  }

  public draw(transform: Transform): void {
    if (!this.isVisible()) return;
    const context = this._parent.getContext()
    if (!context) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(transform.position.x, transform.position.y);
    context.rotate((transform.rotation * Math.PI) / 180);
    context.scale(transform.scale.x, transform.scale.y);
    context.drawImage(this._image, 0, 0);
    context.restore();
  }

  public getParent(): StaticBody {
    return this._parent;
  }
}

import { SpriteOptions } from "../interfaces/SpriteOptions";
import { Body } from "./Body";
import { StaticBody } from "./StaticBody";
import { Transform } from "./Transform";

export class Sprite extends Body {
  constructor(options: SpriteOptions) {
    super();
    this.name = options.name ?? "Sprite";
    this._visible = options.visible ?? true;
    this._parent = options.parent;
    this._imagePath = options.imagePath ?? "";
    this._image = new Image();
    this._image.src = this._imagePath;
    this.transform = new Transform();
    this._updatedTransform = new Transform();

    this._image.onload = () => {
      this.draw();
    };
  }

  private _visible: boolean;
  private _parent: StaticBody;
  private _imagePath: string;
  private _image: HTMLImageElement;
  protected transform: Transform;
  private _updatedTransform: Transform;

  public update = () => {
    const updatedTransform = this.getUpdatedTransform(this._parent);
    this._updatedTransform = updatedTransform;
  };

  public getTransform(): Transform {
    return this._updatedTransform;
  }

  public isVisible(): boolean {
    return this._visible;
  }

  public setVisible(visible: boolean): void {
    this._visible = visible;
  }

  public getParent(): StaticBody {
    return this._parent;
  }

  public draw(): void {
    if (!this._visible || !this._image.complete) return;
    const context = this._parent.getContext();
    context.drawImage(
      this._image,
      this._updatedTransform.getPositionX(),
      this._updatedTransform.getPositionY(),
      this._updatedTransform.getScaleX(),
      this._updatedTransform.getScaleY()
    );
  }
}

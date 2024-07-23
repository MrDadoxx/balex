import { SpriteOptions } from "../interfaces/SpriteOptions";
import { GameObject } from "./GameObject";
import { StaticBody } from "./StaticBody";
import { Transform } from "./Transform";

export class Sprite extends GameObject {
  constructor(options: SpriteOptions) {
    super();
    this.name = options.name ?? "Sprite";
    this._visible = options.visible ?? true;
    this._parent = options.parent;
    this._imagePath = options.imagePath ?? "";
    this._image = new Image();
    this._image.src = this._imagePath;

    this._originalTransform = new Transform();
    this._updatedTransform = new Transform();

    this._image.onload = () => {
      this.draw();
    };
  }

  private _visible: boolean;
  private _parent: StaticBody;
  private _imagePath: string;
  private _image: HTMLImageElement;
  private _originalTransform: Transform;
  private _updatedTransform: Transform;

  public update = () => {
    this._updatedTransform.setPositionX(
      this._originalTransform.position.x +
        this._parent.getTransform().getPositionX()
    );

    this._updatedTransform.setPositionY(
      this._originalTransform.position.y +
        this._parent.getTransform().getPositionY()
    );

    this._updatedTransform.setScaleX(
      this._originalTransform.scale.x * this._parent.getTransform().getScaleX()
    );

    this._updatedTransform.setScaleY(
      this._originalTransform.scale.y * this._parent.getTransform().getScaleY()
    );

    this._updatedTransform.setRotation(
      this._originalTransform.rotation +
        this._parent.getTransform().getRotation()
    );
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
    this._clearReact();
    const context = this._parent.getContext();

    context.drawImage(
      this._image,
      this._updatedTransform.getPositionX(),
      this._updatedTransform.getPositionY(),
      this._updatedTransform.getScaleX(),
      this._updatedTransform.getScaleY()
    );

  }

  private _clearReact(): void {
    this._parent
      .getContext()
      .clearRect(
        0,
        0,
        this._parent.getTransform().getScaleX(),
        this._parent.getTransform().getScaleY()
      );
  }
}

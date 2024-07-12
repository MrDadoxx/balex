import { GameObjectOptions } from "../interfaces/GameObjectOptions";
import { GameObject } from "./GameObject";

export class Input extends GameObject {
  constructor(options: GameObjectOptions = {}) {
    super();
    document.addEventListener("keydown", (event) => this._onKeyDown(event));
    document.addEventListener("keyup", (event) => this._onKeyUp(event));

    this.name = options.name ?? "Input";
  }

  private _keysDown: Set<KeyCodes> = new Set();
  public onKeyDown: (keyCode: KeyCodes) => void = () => {};

  public isKeyDown(keyCode: KeyCodes): boolean {
    return this._keysDown.has(keyCode);
  }

  private _onKeyDown(event: KeyboardEvent): void {
    const keyCode = KeyCodes[event.code as keyof typeof KeyCodes];
    if (keyCode !== undefined) {
      this._keysDown.add(keyCode);
    }
    event.preventDefault();

    this.onKeyDown(keyCode);
  }

  private _onKeyUp(event: KeyboardEvent): void {
    const keyCode = KeyCodes[event.code as keyof typeof KeyCodes];
    if (keyCode !== undefined) {
      this._keysDown.delete(keyCode);
    }
    event.preventDefault();
  }
}

export enum KeyCodes {
  Backspace,
  Tab,
  Enter,
  ShiftLeft,
  ShiftRight,
  ControlLeft,
  ControlRight,
  AltLeft,
  AltRight,
  Pause,
  CapsLock,
  Escape,
  Space,
  PageUp,
  PageDown,
  End,
  Home,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  PrintScreen,
  Insert,
  Delete,
  Digit0,
  Digit1,
  Digit2,
  Digit3,
  Digit4,
  Digit5,
  Digit6,
  Digit7,
  Digit8,
  Digit9,
  KeyA,
  KeyB,
  KeyC,
  KeyD,
  KeyE,
  KeyF,
  KeyG,
  KeyH,
  KeyI,
  KeyJ,
  KeyK,
  KeyL,
  KeyM,
  KeyN,
  KeyO,
  KeyP,
  KeyQ,
  KeyR,
  KeyS,
  KeyT,
  KeyU,
  KeyV,
  KeyW,
  KeyX,
  KeyY,
  KeyZ,
  MetaLeft,
  MetaRight,
  ContextMenu,
  Numpad0,
  Numpad1,
  Numpad2,
  Numpad3,
  Numpad4,
  Numpad5,
  Numpad6,
  Numpad7,
  Numpad8,
  Numpad9,
  NumpadMultiply,
  NumpadAdd,
  NumpadSubtract,
  NumpadDecimal,
  NumpadDivide,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
  NumLock,
  ScrollLock,
  AudioVolumeMute,
  AudioVolumeDown,
  AudioVolumeUp,
  LaunchMediaPlayer,
  LaunchApplication1,
  LaunchApplication2,
  Semicolon,
  Equal,
  Comma,
  Minus,
  Period,
  Slash,
  Backquote,
  BracketLeft,
  Backslash,
  BracketRight,
  Quote,
}

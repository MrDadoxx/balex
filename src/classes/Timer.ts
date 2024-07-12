import { TimerOptions } from "../interfaces/TimerOptions";
import { GameObject } from "./GameObject";

export class Timer extends GameObject {
  constructor(options: TimerOptions = {}) {
    super();
    this.name = options.name ?? "Timer";
    this._autostart = options.autostart ?? false;
    this._time = options.time ?? 1;
    this._loop = options.loop ?? false;
  }

  private _autostart: boolean;
  private _time: number;
  private _loop: boolean;

  public init(): void {
    if (this._autostart) {
      this.start();
    }
  }

  public start(time: number = this._time): void {
    setTimeout(() => {
      this._onTimerEnds();
    }, time * 1000);
  }

  public isAutostarted(): boolean {
    return this._autostart;
  }

  private _onTimerEnds(): void {
    this.onTimerEnds();
    if (this._loop) {
      this.start();
    }
  }

  public onTimerEnds(): void {}

  public setAutostart(autostart: boolean): void {
    this._autostart = autostart;
  }

  public getTime(): number {
    return this._time;
  }

  public setTime(time: number): void {
    this._time = time;
  }
}

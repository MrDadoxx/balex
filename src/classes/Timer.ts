import { TimerOptions } from "../interfaces/TimerOptions";
import { GameObject } from "./GameObject";

export class Timer extends GameObject {
  constructor(options: TimerOptions = {}) {
    super();
    this.enabled = options.enabled ?? true;
    this.name = options.name ?? "Timer";
    this._autostart = options.autostart ?? false;
    this._time = options.time ?? 1;
    this._loop = options.loop ?? false;
  }

  private _stopped: boolean = true;
  private _autostart: boolean;
  private _time: number;
  private _loop: boolean;
  private _timeoutId: number | null = null;

  public init(): void {
    if (this._autostart) {
      this.start();
    }
  }

  public start(time: number = this._time): void {
    this._stopped = false;
    this._timeoutId = window.setTimeout(() => {
      this._onTimerEnds();
    }, time * 1000);
  }

  public stop(): void {
    this._stopped = true;
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  public isStopped(): boolean {
    return this._stopped;
  }

  public isAutostarted(): boolean {
    return this._autostart;
  }

  private _onTimerEnds(): void {
    if (!this._stopped) {
      this.onTimerEnds();

      if (this._loop) {
        if (!this._stopped) {
          this.start();
        }
      } else {
        this._stopped = true;
      }
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

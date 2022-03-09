import { SoundEffect } from "./const";

export default class AudioManager {
  private _urlClipMap: Record<SoundEffect, cc.AudioClip> | {} = {};

  preloadEffect(url: SoundEffect) {
    cc.resources.load<cc.AudioClip>(url, cc.AudioClip, (err, clip) => {
      if (err) {
        throw err;
      } else {
        this._urlClipMap[url] = clip;
      }
    })
  }

  playEffect(url: SoundEffect) {
    if (this._urlClipMap[url]) {
      cc.audioEngine.playEffect(this._urlClipMap[url], false);
      return;
    }
    cc.resources.load<cc.AudioClip>(url, cc.AudioClip, (err, clip) => {
      if (err) {
        throw err;
      } else {
        this._urlClipMap[url] = clip;
        cc.audioEngine.playEffect(clip, false);
      }
    })
  }
}

export const audioManager = new AudioManager();
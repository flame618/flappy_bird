import { SoundEffect } from "./const";

export function loadDirResource<T extends cc.Asset>(
  dir: string,
  type: typeof cc.Asset
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    cc.resources.loadDir<T>(dir, type, null, (err, frames) => {
      if (err) {
        reject(err);
      }
      resolve(frames);
    })
  })
}

export function getQuery(): Record<string, string> {
  const paramsStr = document.location.search.substring(1);
  const pairs = paramsStr.split('&');
  const params = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const [key, value] = pair.split('=');
    params[key] = value;
  }
  return params;
}

const _urlClipMap: Record<SoundEffect, cc.AudioClip> | {} = {};

export function playEffect(url: SoundEffect) {
  if (_urlClipMap[url]) {
    cc.audioEngine.playEffect(_urlClipMap[url], false);
    return;
  }
  cc.resources.load<cc.AudioClip>(url, cc.AudioClip, (err, clip) => {
    if (err) {
      throw err;
    } else {
      _urlClipMap[url] = clip;
      cc.audioEngine.playEffect(clip, false);
    }
  })
}
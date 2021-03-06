import { getQuery } from "./util";

/** 背景宽度 */
export const BGWidth = 288;

/** 背景高度 */
export const BGHeight = 512;

/** 地面高度 */
export const landHeight = 112;

/** 地面宽度 */
export const landWidth = 672;

/** 管道宽度 */
export const pipeWidth = 52;

/** 小鸟宽度 */
export const birdWidth = 34;

/** 管道距离上下边界的最小距离，太小了会导致生成管道中间口差距过大 */
export const pipeBuffer = 50;

/** (背景)移动速度 */
export const moveSpeed = 128;

/** 地面一个移动周期内的移动距离 */
export const landMoveDistance = landWidth - BGWidth;

export enum GameState {
  /** 游戏前 */
  Before = 0,
  /** 游戏准备中 */
	Ready = 1,
  /** 游戏中 */
	Playing = 2,
  /** 游戏结束 */
	End = 3
}

export enum GameMode {
	/** 常规版 */
	Normal = 'normal',
	/** 沙雕版 */
	Easy = 'easy'
}

export enum SoundEffect {
	Die = 'audio/die',
	Hit = 'audio/hit',
	Point = 'audio/point',
	Swooshing = 'audio/swooshing',
	Wing = 'audio/wing'
}

export const gameMode = getQuery()?.mode as GameMode ?? GameMode.Normal;


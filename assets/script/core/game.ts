import Bird from "./bird";
import { GameMode, GameState, gameMode, SoundEffect } from "../const";
import bus from "../event/bus";
import EventType from "../event/event-type";
import Land from "./land";
import Pipe from "./pipe";
import Score from "./score";
import { audioManager } from "../audio-manager";
import UI from "./ui";

const {ccclass, property} = cc._decorator;

const soundEffects = [
	SoundEffect.Die,
	SoundEffect.Hit,
	SoundEffect.Point,
	SoundEffect.Swooshing,
	SoundEffect.Wing
]

@ccclass
export default class Game extends cc.Component {

	/** 背景节点 */
	@property(cc.Node)
	background: cc.Node = null;

	/** ready文字节点 */
	@property(cc.Node)
	readyNode: cc.Node = null;

	/** 游戏状态 */
	gameState: GameState = GameState.Before;

	private _pm = cc.director.getPhysicsManager();

	/** pipe组件 */
	pipeComp: Pipe = null;

	/** bird组件 */
	birdComp: Bird = null;

	/** score组件 */
	scoreComp: Score = null;

	/** land组件 */
	landComp: Land = null;

	/** ui组件 */
	uiComp: UI = null;

	onLoad() {
		// 开启物理引擎
		this._pm.enabled = true;
		this._pm.gravity = cc.v2(0, 0);
		// this._pm.debugDrawFlags =
		// cc.PhysicsManager.DrawBits.e_jointBit
		// | cc.PhysicsManager.DrawBits.e_shapeBit;
		// 预加载所有音效
		soundEffects.forEach(effect => audioManager.preloadEffect(effect));
	}

	start () {
		this.pipeComp = this.getComponent(Pipe);
		this.birdComp = this.getComponent(Bird);
		this.scoreComp = this.getComponent(Score);
		this.landComp = this.getComponent(Land);
		this.uiComp = this.getComponent(UI);
		this._addListeners();
	}

	/** 进入ready状态 */
	getReady() {
		this.gameState = GameState.Ready;
		this.birdComp.getReady();
		this.landComp.begin();
		this.readyNode.active = true;
		audioManager.playEffect(SoundEffect.Swooshing);
	}

	/** 开始游戏 */
	startGame() {
		this.gameState = GameState.Playing;
		this.readyNode.active = false;
		this.birdComp.begin();
		this.scoreComp.begin();
		this.pipeComp.begin();
	}

	/** 重置游戏，游戏结束后重新开始时执行 */
	resetGame() {
		this.pipeComp.reset();
		this.birdComp.reset();
		this.scoreComp.reset();
		this.landComp.reset();
	}

	/** 结束游戏 */
	endGame() {
		this.gameState = GameState.End;
		cc.Tween.stopAll();
		this.pipeComp.end();
		this.uiComp.showFinishedUI();
		this.scoreComp.end();
		this.scheduleOnce(() => {
			audioManager.playEffect(SoundEffect.Die);
		}, 0.2);
	}

	onDestroy() {
		this._removeAllListeners();
	}

	private _addListeners() {
		this.background.on(cc.Node.EventType.TOUCH_START, this._onBGClick, this);
		this.uiComp.playNode.on(cc.Node.EventType.TOUCH_START, this._onPlayNodeClick, this);
		bus.on(EventType.BirdCollide, this._onBirdCollide, this);
		bus.on(EventType.BirdLeaveBG, this._onBirdLeaveBG, this);
		bus.on(EventType.BirdFlyOverPipe, this.scoreComp.addScore, this.scoreComp);
	}

	private _removeAllListeners() {
		this.background.off(cc.Node.EventType.TOUCH_START, this._onBGClick, this);
		this.uiComp.playNode.off(cc.Node.EventType.TOUCH_START, this._onPlayNodeClick, this);
		bus.off(EventType.BirdCollide, this._onBirdCollide, this);
		bus.off(EventType.BirdLeaveBG, this._onBirdLeaveBG, this);
		bus.off(EventType.BirdFlyOverPipe, this.scoreComp.addScore, this.scoreComp);
	}

	private _onBirdCollide() {
		if (this.gameState === GameState.Playing) {
			if (gameMode === GameMode.Normal) {
				this.endGame();
			}
			audioManager.playEffect(SoundEffect.Hit);
			// 小鸟被碰撞后，需要停止正在执行的动画，只展现碰撞效果
			this.birdComp.stopTween();
		}
	}

	private _onBirdLeaveBG() {
		if (this.gameState === GameState.Playing) {
			this.endGame();
		}
	}

	private _onBGClick() {
		if (this.gameState === GameState.Before) {
			this.uiComp.hideInitUI();
			this._pm.gravity = cc.v2(0, -1000);
			this.getReady();
		} else if (this.gameState === GameState.Ready) {
			this.startGame();
			this.birdComp.jump();
		} else if (this.gameState === GameState.Playing) {
			this.birdComp.jump();
		}
	}

	private _onPlayNodeClick() {
		this.uiComp.hideFinishedUI();
		this.resetGame();
		this.getReady();
	}
}

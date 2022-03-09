import Bird from "./bird";
import { GameMode, GameState, SoundEffect } from "../const";
import bus from "../events/bus";
import EventType from "../events/event-enum";
import Land from "./land";
import Pipe from "./pipe";
import Score from "./score";
import { getQuery } from "../util";
import { audioManager } from "../audio-manager";

const {ccclass, property} = cc._decorator;

const mode = getQuery()?.mode as GameMode ?? GameMode.Normal;

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

	/** before状态展示容器节点 */
	@property(cc.Node)
	beforeContainer: cc.Node = null;

	/** ready文字节点 */
	@property(cc.Node)
	readyNode: cc.Node = null;

	@property(cc.Node)
	pipeUp: cc.Node = null;

	@property(cc.Node)
	finishedContainer: cc.Node = null;

	@property(cc.Node)
	playNode: cc.Node = null;

	@property(cc.Node)
	maskNode: cc.Node = null;

	gameState: GameState = GameState.Before;

	private _pm = cc.director.getPhysicsManager();

	pipeComp: Pipe = null;

	birdComp: Bird = null;

	scoreComp: Score = null;

	landComp: Land = null;

	onLoad() {
		// 开启物理引擎
		this._pm.enabled = true;
		this._pm.gravity = cc.v2(0, 0);
		// 预加载所有音效
		soundEffects.forEach(effect => audioManager.preloadEffect(effect));
	}

	start () {
		this.pipeComp = this.getComponent(Pipe);
		this.birdComp = this.getComponent(Bird);
		this.scoreComp = this.getComponent(Score);
		this.landComp = this.getComponent(Land);
		this.addListeners();
	}

	addListeners() {
		this.background.on(cc.Node.EventType.TOUCH_START, this._onBGClick, this);
		this.playNode.on(cc.Node.EventType.TOUCH_START, this._onPlayNodeClick, this);
		bus.on(EventType.BirdCollide, this.onBirdCollide, this);
		bus.on(EventType.BirdLeaveBG, this.onBirdLeaveBG, this);
		bus.on(EventType.BirdFlyOverPipe, this.scoreComp.addScore, this.scoreComp);
	}

	removeAllListeners() {
		this.background.off(cc.Node.EventType.TOUCH_START, this._onBGClick, this);
		this.playNode.off(cc.Node.EventType.TOUCH_START, this._onPlayNodeClick, this);
		bus.off(EventType.BirdCollide, this.onBirdCollide, this);
		bus.off(EventType.BirdLeaveBG, this.onBirdLeaveBG, this);
		bus.off(EventType.BirdFlyOverPipe, this.scoreComp.addScore, this.scoreComp);
	}

	private _onBGClick() {
		if (this.gameState === GameState.Before) {
			this.beforeContainer.active = false;
			this._pm.gravity = cc.v2(0, -800);
			this.getReady();
		} else if (this.gameState === GameState.Ready) {
			this.startGame();
			this.birdComp.jump();
		} else if (this.gameState === GameState.Playing) {
			this.birdComp.jump();
		}
	}

	private _onPlayNodeClick() {
		this.finishedContainer.y = 400;
		this.resetGame();
		this.getReady();
	}

	getReady() {
		this.gameState = GameState.Ready;
		this.birdComp.getReady();
		this.landComp.begin();
		this.readyNode.active = true;
		audioManager.playEffect(SoundEffect.Swooshing);
	}

	startGame() {
		this.gameState = GameState.Playing;
		this.readyNode.active = false;
		// this.finishedContainer.active = false;
		this.birdComp.begin();
		this.scoreComp.begin();
		this.pipeComp.begin();
	}

	resetGame() {
		this.pipeComp.reset();
		this.birdComp.reset();
		this.scoreComp.reset();
		this.landComp.reset();
	}

	onBirdCollide() {
		if (this.gameState === GameState.Playing) {
			if (mode === GameMode.Normal) {
				this.endGame();
			}
			audioManager.playEffect(SoundEffect.Hit);
		}
	}

	onBirdLeaveBG() {
		if (this.gameState === GameState.Playing && mode === GameMode.Idiot) {
			this.endGame();
		}
	}

	setMask(show: boolean) {
		this.maskNode.active = show;
	}

	endGame() {
		this.gameState = GameState.End;
		cc.Tween.stopAll();
		this.pipeComp.end();
		const animComp = this.finishedContainer.getComponent(cc.Animation);
		// 播放动画前先给场景加上遮罩，防止用户点击导致意外bug
		this.setMask(true);
		animComp.play();
		animComp.on('finished', () => {
			// 动画播放完成去除场景遮罩
			this.setMask(false);
		})
		// this.finishedContainer.active = true;
		this.scoreComp.end();
		// this.birdComp.setActive(false);
		this.scheduleOnce(() => {
			audioManager.playEffect(SoundEffect.Die);
		}, 0.2);
	}

	onDestroy() {
		this.removeAllListeners();
	}
}

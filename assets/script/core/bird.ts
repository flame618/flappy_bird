import { audioManager } from "../audio-manager";
import { BGHeight, BGWidth, GameState, SoundEffect } from "../const";
import bus from "../event/bus";
import EventType from "../event/event-type";
import Game from "./game";
import Pipe from "./pipe";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bird extends cc.Component {

  @property(cc.Node)
  birdNode: cc.Node = null;

  rigidComp: cc.RigidBody = null;

  gameComp: Game = null;

  pipeComp: Pipe = null;

  initPosition: cc.Vec2 = null;

  private _jumpRotateTween: cc.Tween<cc.Node> = null;

  private _dropRotateTween: cc.Tween<cc.Node> = null;

  start() {
    this.rigidComp = this.birdNode.getComponent(cc.RigidBody);
    this.gameComp = this.getComponent(Game);
    this.pipeComp = this.getComponent(Pipe);
    this.initPosition = this.birdNode.getPosition();
  }

  /** 跳跃 */
  jump () {
    // 设置小鸟的线性速度
    this.rigidComp.linearVelocity = cc.v2(0, 300);
    // 停止上一次动画
    this.stopTween();
    // 设置小鸟跳跃时的旋转动画，因为它要恢复头朝上的姿势
    this._jumpRotateTween = cc.tween(this.birdNode).to(0.1, {angle: 30}).start();
    // 设置小鸟角速度为0，不能因为之前的碰撞而在空中不停转动
    this.rigidComp.angularVelocity = 0;
    // 播放跳跃音效
    audioManager.playEffect(SoundEffect.Wing);
    // 跳跃0.6秒后，开始调整为下落姿势，头朝下
    this._dropRotateTween = cc.tween(this.birdNode).delay(0.6).to(0.3, {angle: -90}).start();
  }

  /** 进入ready状态 */
  getReady() {
    const animComp = this.birdNode.getComponent(cc.Animation);
    animComp.play('bird_float');
    this.rigidComp.gravityScale = 0;
  }

  /** 开始游戏 */
  begin() {
    const animComp = this.birdNode.getComponent(cc.Animation);
    animComp.play('bird_fly');
    this.rigidComp.gravityScale = 1;
  }

  setActive(active: boolean) {
    this.rigidComp.active = active;
    this.rigidComp.gravityScale = Number(active);
    this.rigidComp.linearVelocity = cc.v2(0, 0);
  }

  /** 重置 */
  reset() {
    this.birdNode.setPosition(this.initPosition);
    this.setActive(true);
    this.rigidComp.angularVelocity = 0;
    this.birdNode.angle = 0;
    this.stopTween();
  }

  /** 结束动画 */
  stopTween() {
    this._jumpRotateTween?.stop();
    this._dropRotateTween?.stop();
  }

  update() {
    if (this.gameComp.gameState === GameState.Playing) {
      if (this.birdNode.x < -(BGWidth + 2) / 2 || this.birdNode.y > BGHeight / 2 + 100) {
        // 小鸟飞出背景边界, 飞出左边界秒死，飞出上边界有100px的缓冲
        bus.emit(EventType.BirdLeaveBG);
      }
    }
  }
}

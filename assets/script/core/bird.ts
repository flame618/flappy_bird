import { audioManager } from "../audio-manager";
import { BGWidth, GameState, SoundEffect } from "../const";
import bus from "../event/bus";
import EventType from "../event/event-type";
import Game from "./game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bird extends cc.Component {

  @property(cc.Node)
  birdNode: cc.Node = null;

  rigidComp: cc.RigidBody = null;

  gameComp: Game = null;

  initPosition: cc.Vec2 = null;

  private _jumpRotateTween: cc.Tween<cc.Node> = null;

  private _dropRotateTween: cc.Tween<cc.Node> = null;

  start() {
    this.rigidComp = this.birdNode.getComponent(cc.RigidBody);
    this.gameComp = this.getComponent(Game);
    this.initPosition = this.birdNode.getPosition();
  }

  jump () {
    this.rigidComp.linearVelocity = cc.v2(0, 300);
    this.stopTween();
    this._jumpRotateTween = cc.tween(this.birdNode).to(0.1, {angle: 30}).start();
    this.rigidComp.angularVelocity = 0;
    audioManager.playEffect(SoundEffect.Wing);
    this._dropRotateTween = cc.tween(this.birdNode).delay(0.6).to(0.3, {angle: -90}).start();
  }

  getReady() {
    const animComp = this.birdNode.getComponent(cc.Animation);
    animComp.play('bird_float');
    this.rigidComp.gravityScale = 0;
  }

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

  reset() {
    this.birdNode.setPosition(this.initPosition);
    this.setActive(true);
    this.rigidComp.angularVelocity = 0;
    this.birdNode.angle = 0;
    this.stopTween();
  }

  stopTween() {
    this._jumpRotateTween?.stop();
    this._dropRotateTween?.stop();
  }

  update() {
    if (this.gameComp.gameState === GameState.Playing && this.birdNode.x < -(BGWidth + 2) / 2) {
      // 小鸟完全超出背景左边界
      bus.emit(EventType.BirdLeaveBG);
    }
  }
}

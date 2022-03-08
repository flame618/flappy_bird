import { BGWidth, birdWidth, GameState } from "../const";
import bus from "../events/bus";
import EventType from "../events/event-enum";
import Game from "./game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bird extends cc.Component {

  @property(cc.Node)
  birdNode: cc.Node = null;

  rigidComp: cc.RigidBody = null;

  gameComp: Game = null;

  initPosition: cc.Vec2 = null;

  start() {
    this.rigidComp = this.birdNode.getComponent(cc.RigidBody);
    this.gameComp = this.getComponent(Game);
    this.initPosition = this.birdNode.getPosition();
  }

  jump () {
    this.rigidComp.linearVelocity = cc.v2(0, 300);
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
  }

  update() {
    if (this.gameComp.gameState === GameState.Playing && this.birdNode.x < -(BGWidth + 2) / 2) {
      // 小鸟完全超出背景左边界
      bus.emit(EventType.BirdLeaveBG);
    }
  }
}

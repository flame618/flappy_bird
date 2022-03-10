import { landMoveDistance, moveSpeed } from "../const";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Land extends cc.Component {

  @property(cc.Node)
  landNode: cc.Node = null;

  private _moveLandTween: cc.Tween<cc.Node> = null;

  private _initPosition: cc.Vec2 = null;

  start () {
    this._initPosition = this.landNode.getPosition();
  }

  /** 开始游戏 */
  begin() {
    const moveLandAnim = cc.tween().by(landMoveDistance / moveSpeed, {x: -landMoveDistance});
    const resetLand = cc.tween().to(0, {x: 192});
    this._moveLandTween = cc.tween(this.landNode).sequence(moveLandAnim, resetLand).repeatForever().start();
  }

  /** 结束游戏 */
  end() {
    this._moveLandTween.stop();
  }

  /** 重置游戏 */
  reset() {
    this.landNode.setPosition(this._initPosition);
  }
}

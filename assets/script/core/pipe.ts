import { BGHeight, BGWidth, landHeight, moveSpeed, pipeBuffer, pipeWidth } from "../const";
import bus from "../event/bus";
import EventType from "../event/event-type";
import { getRandNumber } from "../util";

const {ccclass, property} = cc._decorator;

export enum PipeType {
  Up = 0,
  Down = 1,
}

@ccclass
export default class Pipe extends cc.Component {
  name: 'Pipe'

  @property(cc.Prefab)
  pipe: cc.Prefab = null;

  @property(cc.Node)
  pipeContainer: cc.Node = null;

  pool: cc.NodePool = null;

  start() {
    this.initNodePool();
  }

  initNodePool() {
    this.pool = new cc.NodePool();
    const initCount = 8;
    for (let i = 0; i < initCount; i++) {
      // 初始化对象池
      this.pool.put(cc.instantiate(this.pipe))
    }
  }

  /** 开始游戏 */
  begin() {
    this.schedule(this.handlePipe, 1.5, cc.macro.REPEAT_FOREVER);
  }

  /** 结束游戏 */
  end() {
    this.unscheduleAllCallbacks();
  }

  /**
   * 生成一个新管道
   * @param pipeType 管道类型
   * @returns 
   */
  generateNewPipe(pipeType: PipeType) {
    // 从对象池获取一个节点实例
    console.warn('poolSize', this.pool.size())
    const pipe = this.pool.get();
    if (pipeType === PipeType.Down) {
      pipe.scaleY = -1;
    } else {
      pipe.scaleY = 1;
    }
    return pipe;
  }

  /** 控制管道生成和移动 */
  handlePipe() {
    /** 随机生成管道间隙 */
    const gap = getRandNumber(90, 120);
    /** 上管道的最大y坐标 */
    const maxUpY = BGHeight / 2 - pipeBuffer;
    /** 下管道的最小y坐标 */
    const minDownY = (-BGHeight / 2) + landHeight + pipeBuffer;
    /** 上管道的最小y坐标 */
    const minUpY = minDownY + gap;
    /** 随机生成上管道y坐标 */
    const upY = getRandNumber(minUpY, maxUpY);
    /** 随机生成下管道y坐标 */
    const downY = upY - gap;
    const newUpPipe = this.generateNewPipe(PipeType.Up);
    const newDownPipe = this.generateNewPipe(PipeType.Down);
    this.putPipe(newUpPipe, upY);
    this.putPipe(newDownPipe, downY);
    // 管道移动到屏幕中心需要的距离
    const toCenterDistance = BGWidth / 2 + pipeWidth;
    // 管道移动到屏幕中心需要的时间(小鸟飞过一个管道的时间)
    const toCenterTime = toCenterDistance / moveSpeed;
    this.scheduleOnce(() => {
      bus.emit(EventType.BirdFlyOverPipe);
    }, toCenterTime)
  }

  /** 放置管道到场景中并添加相应缓动动画 */
  putPipe(pipe: cc.Node, posY: number) {
    // 初始位置放置到屏幕右边缘
    pipe.setPosition(170, posY);
    this.pipeContainer.addChild(pipe);
    const pipeMoveDistance = BGWidth + pipeWidth;
    const moveLandAnim = cc.tween().by(pipeMoveDistance / moveSpeed, {x: -pipeMoveDistance});
    const resetLand = cc.tween().call(() => {
      // node实例回收
      this.pool.put(pipe);
    });
    cc.tween(pipe).then(moveLandAnim).then(resetLand).start();
  }

  /** 重置游戏 */
  reset() {
    this.pipeContainer.removeAllChildren();
    this.initNodePool();
  }

  /** 销毁回调 */
  onDestroy() {
    this.end();
    this.pool.clear();
    this.unscheduleAllCallbacks();
  }
}

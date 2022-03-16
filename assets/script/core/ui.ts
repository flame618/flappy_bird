const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {

  /** before状态展示的容器节点 */
	@property(cc.Node)
	beforeContainer: cc.Node = null;

  /** finished状态展示的容器节点 */
  @property(cc.Node)
	finishedContainer: cc.Node = null;

  /** 遮罩节点，可以防止触发点击事件 */
  @property(cc.Node)
	maskNode: cc.Node = null;

  /** 开始游戏按钮 */
	@property(cc.Node)
	playNode: cc.Node = null;

  /** 完成节点动画组件 */
  private _finishedAnimComp: cc.Animation = null;

  start () {
    this._finishedAnimComp = this.finishedContainer.getComponent(cc.Animation);
  }

  /** 展示游戏开始前的UI */
  showInitUI() {
    this.beforeContainer.active = true;
  }

  /** 隐藏游戏开始前的UI */
  hideInitUI() {
    this.beforeContainer.active = false;
  }

  /** 展示游戏结束的UI */
  showFinishedUI() {
		// 播放动画前先给场景加上遮罩，防止用户点击导致意外bug
		this.setMask(true);
		this._finishedAnimComp.play();
		this._finishedAnimComp.on('finished', () => {
			// 动画播放完成去除场景遮罩
			this.setMask(false);
		})
  }

  /** 隐藏游戏结束的UI */
  hideFinishedUI() {
    this.finishedContainer.y = 400;
  }

  /** 设置屏蔽整个页面事件的mask */
  setMask(show: boolean) {
		this.maskNode.active = show;
	}

}

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

  showInitUI() {
    this.beforeContainer.active = true;
  }

  hideInitUI() {
    this.beforeContainer.active = false;
  }

  showFinishedUI() {
		// 播放动画前先给场景加上遮罩，防止用户点击导致意外bug
		this.setMask(true);
		this._finishedAnimComp.play();
		this._finishedAnimComp.on('finished', () => {
			// 动画播放完成去除场景遮罩
			this.setMask(false);
		})
  }

  hideFinishedUI() {
    this.finishedContainer.y = 400;
  }

  setMask(show: boolean) {
		this.maskNode.active = show;
	}

}

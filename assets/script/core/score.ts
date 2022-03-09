import { SoundEffect } from "../const";
import { loadDirResource, playEffect } from "../util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Score extends cc.Component {

  @property(cc.Node)
  scoreNode: cc.Node = null;

  @property(cc.Node)
  bestScoreNode: cc.Node = null;

  @property(cc.Node)
  finishScoreNode: cc.Node = null;

  @property(cc.Node)
  medalNode: cc.Node = null;

  private _scoreNumberFrames: cc.SpriteFrame[] = null;

  private _medalFrames: cc.SpriteFrame[] = null;

  /** 当前获得的分数 */
  private _score = 0;

  /** 最高分数 */
  private bestScore = 0;

  set score(value) {
    this._score = value;
    this.renderScore(this.scoreNode, value);
  }

  get score() {
    return this._score;
  }

  async start () {
    // 预加载所有分数数字对应的图片
    this._scoreNumberFrames = await loadDirResource<cc.SpriteFrame>('image/score_number', cc.SpriteFrame);
    this._scoreNumberFrames.sort((a, b) => {
      const aToNumber = Number(a.name.split('_')[1]);
      const bToNumber = Number(b.name.split('_')[1]);
      return aToNumber - bToNumber; 
    })
    this.renderScore(this.scoreNode, this.score);
    this._medalFrames = await loadDirResource<cc.SpriteFrame>('image/score_medal', cc.SpriteFrame);
    this._medalFrames.sort((a, b) => {
      const aToNumber = Number(a.name.split('_')[1]);
      const bToNumber = Number(b.name.split('_')[1]);
      return aToNumber - bToNumber; 
    })
  }

  begin() {
    this.scoreNode.active = true;
  }

  /** 分数加1 */
  addScore() {
    this.score++
    playEffect(SoundEffect.Point);
  }

  /** 获取当前分数 */
  getScore() {
    return this.score;
  }

  _getSplitScoreNumbers(score) {
    if (score === 0) return [0];
    const numbers: number[] = [];
    let _score = score;
    while(_score) {
      const v = _score % 10;
      _score = Math.floor(_score / 10);
      numbers.push(v);
    }
    return numbers.reverse();
  }

  renderScore(container: cc.Node, score: number) {
    const numbers = this._getSplitScoreNumbers(score);
    const sub = numbers.length - container.childrenCount;
    for (let i = 0; i < Math.abs(sub); i++) {
      if (sub > 0) {
        // 渲染数字的节点比需要的少，增加sub个
        const node = new cc.Node('score_number');
        node.addComponent(cc.Sprite);
        container.addChild(node);
      } else if (sub < 0) {
        // 渲染数字的节点比需要的多，减少sub个
        container.removeChild(container.children[0]);
      }
    }
    numbers.forEach((number, index) => {
      const curNumberNode = container.children[index];
      const spriteComp = curNumberNode.getComponent(cc.Sprite);
      spriteComp.spriteFrame = this._scoreNumberFrames[number];
    })
  }

  renderMedal() {
    const spriteComp = this.medalNode.getComponent(cc.Sprite);
    spriteComp.spriteFrame = this._medalFrames[this._getMedalLevel()];
  }

  renderScorePanelContent() {
    this.renderScore(this.finishScoreNode, this.score);
    this.renderScore(this.bestScoreNode, this.bestScore);
    this.renderMedal();
  }

  end() {
    this.bestScore = Math.max(this.bestScore, this.score);
    this.renderScorePanelContent();
    this.scoreNode.active = false;
  }

  reset() {
    this.score = 0;
  }
  
  /**
   * 获取🏆等级
   */
  _getMedalLevel() {
    if (this.score < 10) {
      return 0;
    } else if (this.score < 50) {
      return 1;
    } else if (this.score < 200) {
      return 2;
    } else if (this.score < 800) {
      return 3;
    }
  }
}

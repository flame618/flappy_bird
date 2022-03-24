window.__require=function e(t,o,n){function i(c,a){if(!o[c]){if(!t[c]){var s=c.split("/");if(s=s[s.length-1],!t[s]){var p="function"==typeof __require&&__require;if(!a&&p)return p(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+c+"'")}c=s}var u=o[c]={exports:{}};t[c][0].call(u.exports,function(e){return i(t[c][1][e]||e)},u,u.exports,e,t,o,n)}return o[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<n.length;c++)i(n[c]);return i}({"audio-manager":[function(e,t,o){"use strict";cc._RF.push(t,"2bcf5SDw9tJrrM4XclQpO/t","audio-manager"),Object.defineProperty(o,"__esModule",{value:!0}),o.audioManager=void 0;var n=function(){function e(){this._urlClipMap={}}return e.prototype.preloadEffect=function(e){var t=this;cc.resources.load(e,cc.AudioClip,function(o,n){if(o)throw o;t._urlClipMap[e]=n})},e.prototype.playEffect=function(e){var t=this;this._urlClipMap[e]?cc.audioEngine.playEffect(this._urlClipMap[e],!1):cc.resources.load(e,cc.AudioClip,function(o,n){if(o)throw o;t._urlClipMap[e]=n,cc.audioEngine.playEffect(n,!1)})},e}();o.default=n,o.audioManager=new n,cc._RF.pop()},{}],bird:[function(e,t,o){"use strict";cc._RF.push(t,"3f842+QbhVCn5gGgYzC0Nsg","bird");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=e("../audio-manager"),a=e("../const"),s=e("../event/bus"),p=e("../event/event-type"),u=e("./game"),d=e("./pipe"),l=cc._decorator,f=l.ccclass,h=l.property,y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.birdNode=null,t.rigidComp=null,t.gameComp=null,t.pipeComp=null,t.initPosition=null,t._jumpRotateTween=null,t._dropRotateTween=null,t}return i(t,e),t.prototype.start=function(){this.rigidComp=this.birdNode.getComponent(cc.RigidBody),this.gameComp=this.getComponent(u.default),this.pipeComp=this.getComponent(d.default),this.initPosition=this.birdNode.getPosition()},t.prototype.jump=function(){this.rigidComp.linearVelocity=cc.v2(0,300),this.stopTween(),this._jumpRotateTween=cc.tween(this.birdNode).to(.1,{angle:30}).start(),this.rigidComp.angularVelocity=0,c.audioManager.playEffect(a.SoundEffect.Wing),this._dropRotateTween=cc.tween(this.birdNode).delay(.6).to(.3,{angle:-90}).start()},t.prototype.getReady=function(){this.birdNode.getComponent(cc.Animation).play("bird_float"),this.rigidComp.gravityScale=0},t.prototype.begin=function(){this.birdNode.getComponent(cc.Animation).play("bird_fly"),this.rigidComp.gravityScale=1},t.prototype.setActive=function(e){this.rigidComp.active=e,this.rigidComp.gravityScale=Number(e),this.rigidComp.linearVelocity=cc.v2(0,0)},t.prototype.reset=function(){this.birdNode.setPosition(this.initPosition),this.setActive(!0),this.rigidComp.angularVelocity=0,this.birdNode.angle=0,this.stopTween()},t.prototype.stopTween=function(){var e,t;null===(e=this._jumpRotateTween)||void 0===e||e.stop(),null===(t=this._dropRotateTween)||void 0===t||t.stop()},t.prototype.update=function(){this.gameComp.gameState===a.GameState.Playing&&(this.birdNode.x<-(a.BGWidth+2)/2||this.birdNode.y>a.BGHeight/2+100)&&s.default.emit(p.default.BirdLeaveBG)},r([h(cc.Node)],t.prototype,"birdNode",void 0),r([f],t)}(cc.Component);o.default=y,cc._RF.pop()},{"../audio-manager":"audio-manager","../const":"const","../event/bus":"bus","../event/event-type":"event-type","./game":"game","./pipe":"pipe"}],bus:[function(e,t,o){"use strict";cc._RF.push(t,"cf1e4lJPUpB0ZRjQPOuLaeM","bus"),Object.defineProperty(o,"__esModule",{value:!0}),o.default=new cc.EventTarget,cc._RF.pop()},{}],collide:[function(e,t,o){"use strict";cc._RF.push(t,"7e312nkMu9Hm66OjbNizkPO","collide");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=e("./event/bus"),a=e("./event/event-type"),s=cc._decorator.ccclass,p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.prototype.onBeginContact=function(){c.default.emit(a.default.BirdCollide)},r([s],t)}(cc.Component);o.default=p,cc._RF.pop()},{"./event/bus":"bus","./event/event-type":"event-type"}],const:[function(e,t,o){"use strict";var n,i;cc._RF.push(t,"097e3dSOuhE6JIUX4GkNplX","const"),Object.defineProperty(o,"__esModule",{value:!0}),o.gameMode=o.SoundEffect=o.GameMode=o.GameState=o.landMoveDistance=o.moveSpeed=o.pipeBuffer=o.birdWidth=o.pipeWidth=o.landWidth=o.landHeight=o.BGHeight=o.BGWidth=void 0;var r,c=e("./util");o.BGWidth=288,o.BGHeight=512,o.landHeight=112,o.landWidth=672,o.pipeWidth=52,o.birdWidth=34,o.pipeBuffer=50,o.moveSpeed=128,o.landMoveDistance=o.landWidth-o.BGWidth,function(e){e[e.Before=0]="Before",e[e.Ready=1]="Ready",e[e.Playing=2]="Playing",e[e.End=3]="End"}(o.GameState||(o.GameState={})),function(e){e.Normal="normal",e.Easy="easy"}(r=o.GameMode||(o.GameMode={})),function(e){e.Die="audio/die",e.Hit="audio/hit",e.Point="audio/point",e.Swooshing="audio/swooshing",e.Wing="audio/wing"}(o.SoundEffect||(o.SoundEffect={})),o.gameMode=null!==(i=null===(n=c.getQuery())||void 0===n?void 0:n.mode)&&void 0!==i?i:r.Normal,cc._RF.pop()},{"./util":"util"}],"event-type":[function(e,t,o){"use strict";var n;cc._RF.push(t,"2ece2P1QKRDiIGCPBMsSh0q","event-type"),Object.defineProperty(o,"__esModule",{value:!0}),function(e){e.BirdCollide="bird_collide",e.BirdLeaveBG="bird_leave_bg",e.BirdFlyOverPipe="bird_fly_over_pipe"}(n||(n={})),o.default=n,cc._RF.pop()},{}],game:[function(e,t,o){"use strict";cc._RF.push(t,"9bdd2b1T4lFiqdd5AuWlLzs","game");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=e("./bird"),a=e("../const"),s=e("../event/bus"),p=e("../event/event-type"),u=e("./land"),d=e("./pipe"),l=e("./score"),f=e("../audio-manager"),h=e("./ui"),y=cc._decorator,_=y.ccclass,m=y.property,v=[a.SoundEffect.Die,a.SoundEffect.Hit,a.SoundEffect.Point,a.SoundEffect.Swooshing,a.SoundEffect.Wing],g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.background=null,t.readyNode=null,t.gameState=a.GameState.Before,t.gameMode=a.gameMode,t._pm=cc.director.getPhysicsManager(),t.pipeComp=null,t.birdComp=null,t.scoreComp=null,t.landComp=null,t.uiComp=null,t}return i(t,e),t.prototype.onLoad=function(){this._pm.enabled=!0,this._pm.gravity=cc.v2(0,0),v.forEach(function(e){return f.audioManager.preloadEffect(e)})},t.prototype.start=function(){this.pipeComp=this.getComponent(d.default),this.birdComp=this.getComponent(c.default),this.scoreComp=this.getComponent(l.default),this.landComp=this.getComponent(u.default),this.uiComp=this.getComponent(h.default),this._addListeners()},t.prototype.getReady=function(){this.gameState=a.GameState.Ready,this.birdComp.getReady(),this.landComp.begin(),this.readyNode.active=!0,f.audioManager.playEffect(a.SoundEffect.Swooshing)},t.prototype.startGame=function(){this.gameState=a.GameState.Playing,this.readyNode.active=!1,this.birdComp.begin(),this.scoreComp.begin(),this.pipeComp.begin()},t.prototype.resetGame=function(){this.pipeComp.reset(),this.birdComp.reset(),this.scoreComp.reset(),this.landComp.reset()},t.prototype.restartGame=function(){this.uiComp.hideFinishedUI(),this.resetGame(),this.getReady()},t.prototype.endGame=function(){this.gameState=a.GameState.End,cc.Tween.stopAll(),this.pipeComp.end(),this.uiComp.showFinishedUI(),this.scoreComp.end(),this.scheduleOnce(function(){f.audioManager.playEffect(a.SoundEffect.Die)},.2)},t.prototype.onDestroy=function(){this._removeAllListeners()},t.prototype._addListeners=function(){this.background.on(cc.Node.EventType.TOUCH_START,this._onBGClick,this),this.uiComp.playNode.on(cc.Node.EventType.TOUCH_START,this._onPlayNodeClick,this),s.default.on(p.default.BirdCollide,this._onBirdCollide,this),s.default.on(p.default.BirdLeaveBG,this._onBirdLeaveBG,this),s.default.on(p.default.BirdFlyOverPipe,this.scoreComp.addScore,this.scoreComp)},t.prototype._removeAllListeners=function(){this.background.off(cc.Node.EventType.TOUCH_START,this._onBGClick,this),this.uiComp.playNode.off(cc.Node.EventType.TOUCH_START,this._onPlayNodeClick,this),s.default.off(p.default.BirdCollide,this._onBirdCollide,this),s.default.off(p.default.BirdLeaveBG,this._onBirdLeaveBG,this),s.default.off(p.default.BirdFlyOverPipe,this.scoreComp.addScore,this.scoreComp)},t.prototype._onBirdCollide=function(){this.gameState===a.GameState.Playing&&(this.gameMode===a.GameMode.Normal&&this.endGame(),f.audioManager.playEffect(a.SoundEffect.Hit),this.birdComp.stopTween())},t.prototype._onBirdLeaveBG=function(){this.gameState===a.GameState.Playing&&this.endGame()},t.prototype._onBGClick=function(){this.gameState===a.GameState.Before?(this.uiComp.hideInitUI(),this._pm.gravity=cc.v2(0,-1e3),this.getReady()):this.gameState===a.GameState.Ready?(this.startGame(),this.birdComp.jump()):this.gameState===a.GameState.Playing&&this.birdComp.jump()},t.prototype._onPlayNodeClick=function(){this.gameMode=a.gameMode,this.restartGame()},r([m(cc.Node)],t.prototype,"background",void 0),r([m(cc.Node)],t.prototype,"readyNode",void 0),r([_],t)}(cc.Component);o.default=g,cc._RF.pop()},{"../audio-manager":"audio-manager","../const":"const","../event/bus":"bus","../event/event-type":"event-type","./bird":"bird","./land":"land","./pipe":"pipe","./score":"score","./ui":"ui"}],land:[function(e,t,o){"use strict";cc._RF.push(t,"a8763fFBcdMhKooRIN5aYjm","land");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=e("../const"),a=cc._decorator,s=a.ccclass,p=a.property,u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.landNode=null,t._moveLandTween=null,t._initPosition=null,t}return i(t,e),t.prototype.start=function(){this._initPosition=this.landNode.getPosition()},t.prototype.begin=function(){var e=cc.tween().by(c.landMoveDistance/c.moveSpeed,{x:-c.landMoveDistance}),t=cc.tween().to(0,{x:192});this._moveLandTween=cc.tween(this.landNode).sequence(e,t).repeatForever().start()},t.prototype.end=function(){this._moveLandTween.stop()},t.prototype.reset=function(){this.landNode.setPosition(this._initPosition)},r([p(cc.Node)],t.prototype,"landNode",void 0),r([s],t)}(cc.Component);o.default=u,cc._RF.pop()},{"../const":"const"}],pipe:[function(e,t,o){"use strict";cc._RF.push(t,"68856VEtRVLm7WXatVI/ygX","pipe");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.PipeType=void 0;var c,a=e("../const"),s=e("../event/bus"),p=e("../event/event-type"),u=e("../util"),d=cc._decorator,l=d.ccclass,f=d.property;(function(e){e[e.Up=0]="Up",e[e.Down=1]="Down"})(c=o.PipeType||(o.PipeType={}));var h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.pipe=null,t.pipeContainer=null,t.pool=null,t}return i(t,e),t.prototype.start=function(){this.initNodePool()},t.prototype.initNodePool=function(){this.pool=new cc.NodePool;for(var e=0;e<8;e++)this.pool.put(cc.instantiate(this.pipe))},t.prototype.begin=function(){this.schedule(this.handlePipe,1.5,cc.macro.REPEAT_FOREVER)},t.prototype.end=function(){this.unscheduleAllCallbacks()},t.prototype.generateNewPipe=function(e){console.warn("poolSize",this.pool.size());var t=this.pool.get();return e===c.Down?t.scaleY=-1:t.scaleY=1,t},t.prototype.handlePipe=function(){var e=u.getRandNumber(90,120),t=a.BGHeight/2-a.pipeBuffer,o=-a.BGHeight/2+a.landHeight+a.pipeBuffer+e,n=u.getRandNumber(o,t),i=n-e,r=this.generateNewPipe(c.Up),d=this.generateNewPipe(c.Down);this.putPipe(r,n),this.putPipe(d,i);var l=(a.BGWidth/2+a.pipeWidth)/a.moveSpeed;this.scheduleOnce(function(){s.default.emit(p.default.BirdFlyOverPipe)},l)},t.prototype.putPipe=function(e,t){var o=this;e.setPosition(170,t),this.pipeContainer.addChild(e);var n=a.BGWidth+a.pipeWidth,i=cc.tween().by(n/a.moveSpeed,{x:-n}),r=cc.tween().call(function(){o.pool.put(e)});cc.tween(e).then(i).then(r).start()},t.prototype.reset=function(){this.pipeContainer.removeAllChildren(),this.initNodePool()},t.prototype.onDestroy=function(){this.end(),this.pool.clear(),this.unscheduleAllCallbacks()},r([f(cc.Prefab)],t.prototype,"pipe",void 0),r([f(cc.Node)],t.prototype,"pipeContainer",void 0),r([l],t)}(cc.Component);o.default=h,cc._RF.pop()},{"../const":"const","../event/bus":"bus","../event/event-type":"event-type","../util":"util"}],score:[function(e,t,o){"use strict";cc._RF.push(t,"f7af1e+2MVHGLBNsTCOXaGp","score");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c},c=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(i,r){function c(e){try{s(n.next(e))}catch(t){r(t)}}function a(e){try{s(n.throw(e))}catch(t){r(t)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o(function(e){e(t)})).then(c,a)}s((n=n.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){var o,n,i,r,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(e){return function(t){return s([e,t])}}function s(r){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,n&&(i=2&r[0]?n.return:r[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,r[1])).done)return i;switch(n=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,n=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(!(i=(i=c.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){c.label=r[1];break}if(6===r[0]&&c.label<i[1]){c.label=i[1],i=r;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(r);break}i[2]&&c.ops.pop(),c.trys.pop();continue}r=t.call(e,c)}catch(a){r=[6,a],n=0}finally{o=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}};Object.defineProperty(o,"__esModule",{value:!0});var s=e("../audio-manager"),p=e("../const"),u=e("../util"),d=e("./game"),l=cc._decorator,f=l.ccclass,h=l.property,y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.scoreNode=null,t.bestScoreNode=null,t.finishScoreNode=null,t.medalNode=null,t._scoreNumberFrames=null,t._medalFrames=null,t._score=0,t._bestScore=0,t._touchMedalCount=0,t}return i(t,e),Object.defineProperty(t.prototype,"score",{get:function(){return this._score},set:function(e){this._score=e,this.renderScore(this.scoreNode,e)},enumerable:!1,configurable:!0}),t.prototype.start=function(){return c(this,void 0,void 0,function(){var e,t;return a(this,function(o){switch(o.label){case 0:return e=this,[4,u.loadDirResource("image/score_number",cc.SpriteFrame)];case 1:return e._scoreNumberFrames=o.sent(),this._scoreNumberFrames.sort(function(e,t){return Number(e.name.split("_")[1])-Number(t.name.split("_")[1])}),this.renderScore(this.scoreNode,this.score),t=this,[4,u.loadDirResource("image/score_medal",cc.SpriteFrame)];case 2:return t._medalFrames=o.sent(),this._medalFrames.sort(function(e,t){return Number(e.name.split("_")[1])-Number(t.name.split("_")[1])}),this.medalNode.on(cc.Node.EventType.TOUCH_START,this._onTouchMedal,this),[2]}})})},t.prototype.begin=function(){this.scoreNode.active=!0},t.prototype.addScore=function(){this.score++,s.audioManager.playEffect(p.SoundEffect.Point)},t.prototype.renderScore=function(e,t){for(var o=this,n=this._getSplitScoreNumbers(t),i=n.length-e.childrenCount,r=0;r<Math.abs(i);r++)if(i>0){var c=new cc.Node("score_number");c.addComponent(cc.Sprite),e.addChild(c)}else i<0&&e.removeChild(e.children[0]);n.forEach(function(t,n){e.children[n].getComponent(cc.Sprite).spriteFrame=o._scoreNumberFrames[t]})},t.prototype.renderMedal=function(){this.medalNode.getComponent(cc.Sprite).spriteFrame=this._medalFrames[this._getMedalLevel()]},t.prototype.renderScorePanelContent=function(){this.renderScore(this.finishScoreNode,this.score),this.renderScore(this.bestScoreNode,this._bestScore),this.renderMedal()},t.prototype.end=function(){this._bestScore=Math.max(this._bestScore,this.score),this.renderScorePanelContent(),this.scoreNode.active=!1},t.prototype.reset=function(){this.score=0},t.prototype._onTouchMedal=function(){var e=this;if(this._touchMedalCount++,1===this._touchMedalCount)this.scheduleOnce(function(){e._touchMedalCount=0},1);else if(3===this._touchMedalCount){var t=this.getComponent(d.default);t.gameMode=p.GameMode.Easy,t.restartGame()}},t.prototype._getMedalLevel=function(){return this.score<10?0:this.score<50?1:this.score<200?2:this.score<800?3:void 0},t.prototype._getSplitScoreNumbers=function(e){if(0===e)return[0];for(var t=[],o=e;o;){var n=o%10;o=Math.floor(o/10),t.push(n)}return t.reverse()},r([h(cc.Node)],t.prototype,"scoreNode",void 0),r([h(cc.Node)],t.prototype,"bestScoreNode",void 0),r([h(cc.Node)],t.prototype,"finishScoreNode",void 0),r([h(cc.Node)],t.prototype,"medalNode",void 0),r([f],t)}(cc.Component);o.default=y,cc._RF.pop()},{"../audio-manager":"audio-manager","../const":"const","../util":"util","./game":"game"}],ui:[function(e,t,o){"use strict";cc._RF.push(t,"e8ad9kqBx5OR6nB55Sdwwip","ui");var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),r=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,c=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(c=(r<3?i(c):r>3?i(t,o,c):i(t,o))||c);return r>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,a=c.ccclass,s=c.property,p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.beforeContainer=null,t.finishedContainer=null,t.maskNode=null,t.playNode=null,t._finishedAnimComp=null,t}return i(t,e),t.prototype.start=function(){this._finishedAnimComp=this.finishedContainer.getComponent(cc.Animation)},t.prototype.showInitUI=function(){this.beforeContainer.active=!0},t.prototype.hideInitUI=function(){this.beforeContainer.active=!1},t.prototype.showFinishedUI=function(){var e=this;this.setMask(!0),this._finishedAnimComp.play(),this._finishedAnimComp.on("finished",function(){e.setMask(!1)})},t.prototype.hideFinishedUI=function(){this.finishedContainer.y=400},t.prototype.setMask=function(e){this.maskNode.active=e},r([s(cc.Node)],t.prototype,"beforeContainer",void 0),r([s(cc.Node)],t.prototype,"finishedContainer",void 0),r([s(cc.Node)],t.prototype,"maskNode",void 0),r([s(cc.Node)],t.prototype,"playNode",void 0),r([a],t)}(cc.Component);o.default=p,cc._RF.pop()},{}],"use_v2.1-2.2.1_cc.Toggle_event":[function(e,t){"use strict";cc._RF.push(t,"4d7d3MGF0JC/J0HAz4E6gQP","use_v2.1-2.2.1_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_isChecked=!0),cc._RF.pop()},{}],util:[function(e,t,o){"use strict";cc._RF.push(t,"37f7acn0SRKhr5qgr+u+v16","util"),Object.defineProperty(o,"__esModule",{value:!0}),o.getRandNumber=o.getQuery=o.loadDirResource=void 0,o.loadDirResource=function(e,t){return new Promise(function(o,n){cc.resources.loadDir(e,t,null,function(e,t){e&&n(e),o(t)})})},o.getQuery=function(){for(var e=document.location.search.substring(1).split("&"),t={},o=0;o<e.length;o++){var n=e[o].split("="),i=n[0],r=n[1];t[i]=r}return t},o.getRandNumber=function(e,t){return e+Math.random()*(t-e)},cc._RF.pop()},{}]},{},["use_v2.1-2.2.1_cc.Toggle_event","audio-manager","collide","const","bird","game","land","pipe","score","ui","bus","event-type","util"]);
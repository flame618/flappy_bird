import bus from "./event/bus";
import EventType from "./event/event-type";

const { ccclass } = cc._decorator;

@ccclass
export default class Collide extends cc.Component {
  onBeginContact(contact, self, other) {
    bus.emit(EventType.BirdCollide);
  }
}

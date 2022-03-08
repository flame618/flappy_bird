import bus from "./events/bus";
import EventType from "./events/event-enum";

const { ccclass } = cc._decorator;

@ccclass
export default class Collide extends cc.Component {
  onBeginContact(contact, self, other) {
    bus.emit(EventType.BirdCollide);
  }
}

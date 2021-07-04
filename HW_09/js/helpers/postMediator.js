export default class PostMediator {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    this.subscribers[event] = this.subscribers[event] || [];
    this.subscribers[event].push(callback);
  }
  unsubscribe(event, callback) {
    var subscribrIndex;
    if (!event) {
      this.subscribers = {};
    } else if (event && !callback) {
      this.subscribers[event] = [];
    } else {
      subscribrIndex = this.subscribers[event].indexOf(callback);
      if (subscribrIndex > -1) {
        this.subscribers[event].splice(subscribrIndex, 1);
      }
    }
  }
  publish(event, ...data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(function (callback) {
        callback(...data);
      });
    }
  }
}

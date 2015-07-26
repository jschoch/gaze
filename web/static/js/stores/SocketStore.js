import {Socket} from "../../vendor/phoenix";
import Reflux from "bower_components/reflux/dist/reflux";
import Actions from "../Actions";

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.connected = false;
    this._socket = new Socket("/gaze/ws");
    this._socket.connect();
    this._socket.onOpen(this.onSocketOpen);
    this._socket.onClose(this.onSocketClose);
    this._socket.onError(this.onSocketClose);
  },

  getInitialState() {
    return this;
  },

  onJoin(channelName) {
    var chan = this._socket.chan(channelName, {name: "hell me"});
    console.log("socketstore onjoin called for ",channelName);
    if(channelName == "foo"){
        chan.on("msg", data => {
          console.log("saw msg",this,"data",data);
          //this.onUpdate(data);
          
          this.trigger({in_msg: data,foo_chan: chan});
        });
      }

    var self = this
    chan.join().receive("ok", () => {
      console.log("chan.join promise",this)
      Actions.joined(channelName, chan);
      self.onFoo(chan)
    });
  },
  onFoo(chan) {
    console.log("foo chan",chan)
    this.foo = chan
  },
  onSocketOpen() {
    this.connected = true;
    this.trigger(this);
  },

  onSocketClose() {
    this.connected = false;
    this.trigger(this);
  }
});

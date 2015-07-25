import Reflux from "bower_components/reflux/dist/reflux";
import Actions from "../Actions";

export default channelName => {
  return {
    listenables: Actions,

    getInitialState() {
      return null;
    },

    onJoined(joinedChannelName, chan) {
      console.log("onJoined",joinedChannelName)
      if (channelName == joinedChannelName) {
        chan.on("msg", data => {
          console.log("saw msg",this);
          this.onUpdate(data);
        });
        chan.on("update", data => {
          console.log("update seen in channelMixin");
          this.onUpdate(data);
        });
      }
    },

    onUpdate(data) {
      this.trigger(data);
    }
  }
};

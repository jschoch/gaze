import Reflux from "bower_components/reflux/dist/reflux";
import Actions from "../Actions";

export default channelName => {
  return {
    listenables: Actions,

    getInitialState() {
      return null;
    },

    onJoined(joinedChannelName, chan) {
      console.log("onJoined",joinedChannelName,channelName,chan)
      if(channelName == "foo"){
        chan.on("msg", data => {
          console.log("saw msg",this,"data",data);
          //this.onUpdate(data);
          this.trigger(data);
        });
      }
      if (channelName.name != "foo" && channelName == joinedChannelName) {
        chan.on("update", data => {
          console.log("update seen in channelMixin");
          this.onUpdate(data);
        });
      }
      return chan
    },

    onUpdate(data) {
      console.log("channel mixin onUpdate:",data);
      this.trigger(data);
    }
  }
};

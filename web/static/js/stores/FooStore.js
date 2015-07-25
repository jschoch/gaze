import Reflux from "bower_components/reflux/dist/reflux";
import channelMixin from "./ChannelMixin";

export default Reflux.createStore({
  mixins: [channelMixin("foo")],
  onUpdate(data) {
    console.log("in foo store update: ", data);
    this.trigger({msg: data})
  }
});

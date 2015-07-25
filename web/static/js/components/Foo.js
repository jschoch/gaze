import React from "bower_components/react/react";
import Reflux from "bower_components/reflux/dist/reflux";
import SystemStore from "../stores/FooStore";
import Actions from "../Actions";
import {Socket} from "../../vendor/phoenix";


export default React.createClass({
   mixins: [Reflux.connect(SystemStore, "foo")],

  componentWillMount() {
    var res = Actions.join("foo");
    console.log("will mount: ",res)
  },
  getInitialState: function(){
    console.log("init state fail?",this);
    var s = new Socket("/gaze/ws")
    s.connect()
    var chan = s.chan("foo",{})
    chan.join()
    return({
      //foo: 
      name: "no name",
      socket: s,
      chan: chan,
      message: "no message",
      messages: [{from: "System",text: "Welcome: please enter a name and message and then click Send!"}]
    })
  },
  onUpdate: function(data){
    console.log("onUpdate got",date);
  },
  onClick: function(event){
    console.log("state",this.state,this.state.chan);
    var res = this.state.chan.push("msg",{from: this.state.name,text: this.state.message})
    this.setState({text: ""})
    
  },
  handleMsgChange: function(event){
    this.setState({message: event.target.value})
  },
  handleNameChange: function(event){
    this.setState({name: event.target.value})
  },
  clearMsgs: function(){
    this.setState({messages: []});
  },
  render: function(){
    console.log("render called: state: ",this.state)
    if (this.state.foo && this.state.foo.msg){
      //this.setState(
      this.state.messages.push(this.state.foo.msg)
      this.state.foo = null;
    }
    return (
    <div>
      <MyModal /> 
      <h2>Gaze Chat</h2>
      Enter Name: <input type="text" onChange={this.handleNameChange}></input>
      Enter Message: <input type="text" onChange={this.handleMsgChange}></input>
      <button className="btn btn-xs" onClick={this.onClick}>Send!</button>
      <hr/>
      Messages:
      <button className="btn btn-xs" onClick={this.clearMsgs}>Clear msgs</button>
      <ul>
        <Msgs msgs={this.state.messages} /> 
      </ul>
    </div>
    )
  }
})

var Msgs = React.createClass({
  render: function(){
    return(
      <div>
      {this.props.msgs.map(function(msg){
        return ( 
          <li>
          <span>
          <span className="badge"> {msg.from } </span>: {msg.text}
          </span>
          </li>
        )
      })}
      </div>
    )
  }
})
var MyModal = React.createClass({
  getInitialState(){
    return { showModal: false};
  },

  Moff(){
    this.setState({ showModal: false });
  },

  Mon(){
    this.setState({ showModal: true });
  },
  //componentDidMount: function(){
    //$('#myModal').on('shown.bs.modal', function () {
      //$('#myInput').focus()
    //})
  //},
  render() {
    return (
     <div>
        modal here
<div class="container">
  <button type="button" class="btn btn-info btn-lg" onClick={this.Mon} data-target="#myModal">Open Modal</button>
  {this.state.showModal ? 
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  : null}
  
</div>
     </div>
    )
  }
});

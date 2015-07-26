import React from "bower_components/react/react";
import Reflux from "bower_components/reflux/dist/reflux";
//import FooStore from "../stores/FooStore";
import Actions from "../Actions";
import {Socket} from "../../vendor/phoenix";
import SocketStore from "../stores/SocketStore";


export default React.createClass({
  //mixins: [
   // Reflux.connect(SocketStore,"socket"),
    //Reflux.connect(FooStore, "foo")],
  mixins: [Reflux.connect(SocketStore,"socket")],

  getInitialState: function(){
    var name = "no name"
    Actions.join("foo"); 
    return({
      name: name,
      text: "",
      messages: [{from: "Local System",text: "Welcome: "+name}]
    })
  },
  onUpdate: function(data){
    console.log("onUpdate got",date);
  },
  onClick: function(event){
    console.log("state",this.state,this.state.chan);
    //var chan = this.state.socket._socket.chan("foo",{name: this.state.name})
    var chan = this.state.socket.foo_chan
    console.log("chan",chan)
    var res = chan.push("msg",{from: this.state.name,text: this.state.text})
    this.setState({text: ""})
    
  },
  handleMsgChange: function(event){
    this.setState({text: event.target.value})
  },
  handleNameChange: function(event){
    this.setState({name: event.target.value})
  },
  clearMsgs: function(){
    this.setState({messages: []});
  },
  setName: function(name){
    this.setState({name: name})
  },
  submitMsg: function(event){
    if(event.keyCode == 13){
      this.onClick(event)
    }
  },
  submitName: function(name){
    this.setState({name: name})
  },

  render: function(){
    //console.log("render called: state: ",this.state)
    if (this.state.socket.in_msg){
      //this.setState(
      var msg = this.state.socket.in_msg
      this.state.messages.push(msg)
      this.state.socket.in_msg = null;
    }
    return (
    <div>
      <MyModal setName={this.setName} submitName={this.submitName}/> 
      <h2>Gaze Chat</h2>
      <button className="btn btn-xs">{this.state.name}</button>
      Enter Message: <input type="text" onChange={this.handleMsgChange} value={this.state.text} onKeyDown={this.submitMsg}></input>
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
    return { 
      name: "",
      showModal: true
    };
  },
  handleChange: function(event){
    //console.log(event.target.value);
    this.setState({name: event.target.value});
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
  closeModal: function(event){
    console.log("clicked: ",this.state.name);
    if (this.state.name != ""){
      this.setState({showModal: false})
      this.props.setName(this.state.name)
    }
  },
  submit: function(event){
    if(event.keyCode == 13){
      this.props.submitName(event.target.value);
      this.closeModal(event);
    }
  },
  render() {
    return (
     <div>
        {this.state.showModal ?
<div className="jumbotron" style={{position: 'absolute', width: '100%', top: 0, height: 500}}>
        <h3>Enter a Username</h3>
        <input 
          type="text" 
          onChange={this.handleChange}
          onKeyDown={this.submit}>
        </input>
        <button 
          className="btn btn-md btn-primary" 
          onClick={this.closeModal}
          >Submit</button>
      </div>      
      : null}
    </div>
    )
  }
});

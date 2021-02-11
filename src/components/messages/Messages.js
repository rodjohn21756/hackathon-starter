import React from "react";
import { withAsyncAction } from "../../redux/HOCs";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      count: 0,
      image: ''
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload, 'list of messages')
      this.setState({
        messages: res.payload.messages,
        count: res.payload.count
      })
    })
  }

  newMessageHandler = () => {
    let text = this.state.message;
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: ''
      })
    })
  }

  handleChange = (event) => {
    let data = {...this.state};
   
    data[event.target.name] = event.target.value;   

    this.setState(data);
  }

  deleteMessage = (messageId) => {
    this.props.deleteMessage(messageId).then(() => {
      this.fetchMessages();
      this.setState({
        message: ''
      })
    })
  }

  render() {
    let display = (<div>No Messages Found</div>)
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        return (
          <li key={value.id}>
            <span>{value.username}</span><br/>
            {value.text} <button onClick={() => this.deleteMessage(value.id)}>x</button><br/>
            <span>{value.createdAt}</span>
            </li>
        )
      })
    }

    return (
      <div className="Messages">
        <div className="ListMessage">
          {display}
        </div>
        <div className="NewMessage">
          <input name="message" onChange={this.handleChange} value={this.state.message}/>
          <button onClick={this.newMessageHandler}> Send Message </button>
        </div>
      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);

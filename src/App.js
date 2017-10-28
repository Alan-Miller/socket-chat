import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketioClient from 'socket.io-client';
const socket = socketioClient('http://localhost:3101');

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      message: '',
      messages: []
    }

    this.update = this.update.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    socket.on('all messages', message => {
      this.setState({ messages: [...this.state.messages, message] })
    });
  }

  update(e, prop) {
    this.setState({ [prop]: e.target.value })
  }

  send(e) {
    e.preventDefault();
    const { username, message } = this.state;
    socket.emit('new message', { username, message });
    this.setState({ message: '' });
  }

  render() {
    const { username, message, messages } = this.state;
    const formComplete = username && message;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <main>
          <p style={formComplete ? { visibility: 'hidden' } : null}
          >Fill out username and message.</p>
          <form className="messageForm" onSubmit={this.send}>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={e => this.update(e, 'username')} />
            <input
              type="text"
              value={message}
              placeholder="message"
              onChange={e => this.update(e, 'message')} />
            <input type="submit" />
          </form>

          <div className="messages">
            {!messages.length ? 'No messages yet :(' : this.state.messages.map((item, i) => (
              <div>{item.username}: {item.message}</div>
            ))}
          </div>
        </main>

      </div>
    );
  }
}

export default App;

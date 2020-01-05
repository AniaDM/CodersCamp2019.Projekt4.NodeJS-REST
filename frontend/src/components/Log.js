import React, { Component } from 'react';
import './loginScreen.css';
import logo from './test.jpg';
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    




    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  
    if(this.state.username.length > 0 && this.state.password.length > 0){
      console.log(`${document.querySelector('.userNameInput').value} and ${document.querySelector('.pwinput').value}`)
    } 

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

    

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }



  
  render() {

    return (
      
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }

          <img src={logo} className="background" alt="Logo" />
          <div className="Frame4"></div>



          <label className="UserName">User Name</label>
          <input type="text" className="userNameInput" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
          <div className="Background"></div>
          <label className="Password">Password</label>
          <input type="password"className="pwinput" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="submit" className="signIn" value="Sign In" data-test="submit" />

          <input type="submit" className="signUp" value="Sign Up" data-test="submit" />

          <a href="https://google.com" className="forgotPW">Forgot Password?</a>
        </form>
      </div>
    );
  }
}

export default LoginPage;
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


      console.log(`${document.querySelector('.userNameInputG').value} and ${document.querySelector('.pwinputG').value}`)
    ///


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
          <div className="windowUI"></div>



          <label className="UserNameG">User Name</label>
          <input type="text" className="userNameInputG" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
          <div className="Background"></div>
          <label className="PasswordG">Password</label>
          <input type="password"className="pwinputG" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="submit" className="signInG" value="Sign In" data-test="submit" />

          <input type="submit" className="signUpG" value="Sign Up" data-test="submit" />

          <a href="https://google.com" className="forgotPW">Forgot Password?</a>
        </form>
      </div>
    );
  }
}

export default LoginPage;
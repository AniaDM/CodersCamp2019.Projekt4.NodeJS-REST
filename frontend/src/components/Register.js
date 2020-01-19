import React, { Component } from 'react';
import './register.css';
import logo from './test.jpg';

// import CreateUserCredentials from '../../../backend/src/main/authentication/application/CreateUserCredentials';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repeatpw:'',
      email:'',
      firstname:'',
      secondname:'',
      error: '',
    };

  
    this.handleRepeatPw = this.handleRepeatPw.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlefirstnameChange = this.handlefirstnameChange.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlesecondnameChange=this.handlesecondnameChange.bind(this);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  
    if(this.state.password.value !== this.state.repeatpw.value){
      return this.setState({ error: 'Passwords are noth the same' });
    } 

    if(this.state.password.value > 0 ){
      console.log(`${document.querySelector('.userNameInput').value} and ${document.querySelector('.pwinput').value}`)
  
    } 

    
    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    if (!this.state.email) {
      return this.setState({ error: 'email is required' });
    }

    if (!this.state.firstname) {
      return this.setState({ error: 'firstname is required' });
    }

    if (!this.state.secondname) {
      return this.setState({ error: 'secondname is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }


        const res = fetch('http://localhost:4000/api/user-profiles/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
            
            "username": this.state.username,
            "email": this.state.email,
            "firstName": this.state.firstname,
            "lastName": this.state.secondname,
            "password": this.state.password,
            "repeatedPassword": this.state.repeatpw
        },
       })
       .then((response) => response.json())
       .then((responseJson) => {
       return localStorage.setItem('responseJson', JSON.stringify(responseJson));
       })
       .catch((error) => {
         console.error(error);
       });



    
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

  handleRepeatPw(evt) {
    this.setState({
      repeatpw: evt.target.value,
    });
  }

  handleemailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  }
  
  handlefirstnameChange(evt) {
    this.setState({
      firstname: evt.target.value,
    });
  }

  handlesecondnameChange(evt) {
    this.setState({
      secondname: evt.target.value,
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
          <div className="FrameUI"></div>
          <div className="Background"></div>

          <label className="Book">Book a room wherever you like</label>

          <button className="addImg">Add Photo</button>

          <label className="UserName">User Name</label>
          <input type="text" className="userNameInput" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

          <label className="Password">Password</label>
          <input type="password"className="pwinput" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <label className="email">Email</label>
          <input type="email" className="emailinput" data-test="email" value={this.state.email} onChange={this.handleemailChange} />

          <label className="repeatpw">Repeat Password</label>
          <input type="password" className="repeatpwinput" data-test="repeatpw" value={this.state.repeatpw} onChange={this.handleRepeatPw} />

          <label className="firstName">First name</label>
          <input type="text" className="firstNameinput" data-test="firstName" value={this.state.firstname} onChange={this.handlefirstnameChange} />

          <label className="lastName">Last Name</label>
          <input type="text" className="lastNameinput" data-test="lastName" value={this.state.secondname} onChange={this.handlesecondnameChange} />



          <input type="submit" className="signIn" value="Sign In" data-test="submit" />

          <input type="submit" className="signUp" value="Sign Up" data-test="submit" />

          <a href="https://google.com" className="forgotPW">Forgot Password?</a>
        </form>
      </div>
    );
  }
}

export default Register;
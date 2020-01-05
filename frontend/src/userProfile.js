import React, { Component } from 'react';
import './userProfile.css';

import businessLogo from './businessLogo.png';

class userProfile extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email:'JanekKowalkski@s.pl',
      firstname:'Janek',
      secondname:'Kowalski',
      error: '',
    };
  }



  dismissError() {
    this.setState({ error: '' });
  }

  phone(evt) {
    evt.preventDefault();
  console.log('s')
  }

  myReservation(evt) {
    evt.preventDefault();
  console.log('s')
  }
  myRequests(evt) {
    evt.preventDefault();
  console.log('s')
  }

  profile(evt) {
    evt.preventDefault();
  console.log('s')
  }

  email(evt) {
    evt.preventDefault();
  console.log('s')
  }

  logOut(evt) {
    evt.preventDefault();
  console.log('s')
  }




  
  render() {

    return (
      
      <div className="container">

        <div className="navigation">
         <div className="businessLogo">
         <img src={businessLogo} className="businessLogo" alt="businessLogo" />
         </div>
          <div className="Frame4"></div>
          <div  className="Phone" onClick={this.phone}>Room Offers</div>
          <div className="myReservations" onClick={this.myReservation}>My Reservations</div>
          <div className="myRequests" onClick={this.myRequests}>My Requests</div>
          <div className="Profile" onClick={this.profile}>Profile</div>

           <div className="userLogo">
            {/* //img src */}
           </div>
           <div className="email" onClick={this.email}>`{this.em}email`</div>
           <div className="logOut" onClick={this.logOut}>LOGOUT</div>    
           </div>

      <div className="body">

           <div className="mainLogo">  {/* //img src */} </div>
            <div className='userFirstandSecondname'>{this.state.firstname} {this.state.secondname}</div>

          <div className='table'>
          <table>
            <tr>
              <th>username</th>
              <th>  email</th>
            </tr>
            <tr>
              <td>{this.state.firstname} {this.state.secondname}</td>
              <td>{this.state.email}</td>
            </tr>
          </table>
          </div>
    

           </div>





      </div>




  
   


    );
  }
}

export default userProfile;
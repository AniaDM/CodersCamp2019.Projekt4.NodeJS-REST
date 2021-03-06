import React  from 'react';
import Menu from './Menu';
import ListOfRoomReviews from './listOfRoomReviews';
import businessLogo from './businessLogo.png';

const UserProfile = () => {
    return (  <div>
        <ListOfRoomReviews />
        <ListOfRoomReviews />
        <ListOfRoomReviews />
        <ListOfRoomReviews />
        </div>
    )
};

class userProfile extends React.Component {
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

  addNewOffer(evt) {
    evt.preventDefault();
  console.log('s')
  }

  seeYourRoomRequests(evt) {
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
           <div className="email" onClick={this.email}>{this.state.email}</div>
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
          <div className="text">Your offer following rooms as a host</div>
          <button className="addNewOffer" value="Add new offer" onClick={this.addNewOffer}>ADD NEW OFFER</button>
          <button className="seeYourRoomRequests" value="See Your Room Request" onClick={this.seeYourRoomRequests}>SEE YOUR ROOM REQUESTS</button>
           </div>


      <div className="roomOffers"></div>
         <div className="window1">

            <div className="inwindow1userimg">
            {/* {//img src*/ }
            br  USER 
            br  IMG
            </div>

            <div className="inwindow1title">title</div>
            <div className="inwindow1location">roomLocation</div>
            <div className="inwindow1roomimage">
            {/* {//img src*/ }
           imgsrc
            </div>
            <div className="inwindow1description">description</div>
            <div className="inwindow1guestnumber">Number of guests: numberofGuests</div>
            <div className="inwindow1price">Price: price </div>
            <div className="inwindow1avaiblereservation">Avaible to make reservation: </div>
         </div>
 
 
         <div className="window2">

         <div className="inwindow1userimg">
            {/* {//img src*/ }
            br  USER 
            br  IMG
            </div>

            <div className="inwindow1title">title</div>
            <div className="inwindow1location">roomLocation</div>
            <div className="inwindow1roomimage">
            {/* {//img src*/ }
           imgsrc
            </div>
            <div className="inwindow1description">description</div>
            <div className="inwindow1guestnumber">Number of guests: numberofGuests</div>
            <div className="inwindow1price">Price: price </div>
            <div className="inwindow1avaiblereservation">Avaible to make reservation: </div>
           </div>


           
           <div className="window3">
           
           <div className="inwindow1userimg">
            {/* {//img src*/ }
            br  USER 
            br  IMG
            </div>

            <div className="inwindow1title">title</div>
            <div className="inwindow1location">roomLocation</div>
            <div className="inwindow1roomimage">
            {/* {//img src*/ }
           imgsrc
            </div>
            <div className="inwindow1description">description</div>
            <div className="inwindow1guestnumber">Number of guests: numberofGuests</div>
            <div className="inwindow1price">Price: price </div>
            <div className="inwindow1avaiblereservation">Avaible to make reservation: </div>
           </div>

      </div>




  
   


    );
  }
}

export default userProfile;
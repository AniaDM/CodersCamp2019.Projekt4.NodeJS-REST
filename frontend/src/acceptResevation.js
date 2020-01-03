import React from 'react';
import './App.css';
import ListOfPreservedRooms from './listOfPreservedRooms';



function AcceptReservation() {
  return (
    <div className = "RoomReviews">
      <h1 style={{textAlign: 'left', margin: '4vh'}}>Some people requests to stay at your rooms</h1>
      <ListOfPreservedRooms />
      <ListOfPreservedRooms />
      <ListOfPreservedRooms />
      <ListOfPreservedRooms />
    </div>
  );
}

export default AcceptReservation;

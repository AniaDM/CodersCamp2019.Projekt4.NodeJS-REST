import React from 'react';
import './App.css';
import ListOfRoomReviews from './listOfRoomReviews';


function RoomReviews() {
  return (
    <div className="RoomReviews">
      <h1 style={{textAlign: 'left', margin: '4vh'}}>You have requested some reservations as a guest!</h1>
      <ListOfRoomReviews />
      <ListOfRoomReviews />
      <ListOfRoomReviews />
      <ListOfRoomReviews />
    </div>
  );
}

export default RoomReviews;
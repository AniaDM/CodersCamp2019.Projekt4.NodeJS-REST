import React from 'react';
import AppForm from './Ania';
import ListOfPreservedRooms from './listOfPreservedRooms';
import ListOfRoomReviews from './listOfRoomReviews';

function App() {
  return (

    <div className="App">
        <ListOfPreservedRooms />
        {/* <AppForm /> */}
        <ListOfRoomReviews />
    </div>
 
 );
}

export default App;

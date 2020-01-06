import React from 'react';
import ListOfPreservedRooms from './components/listOfPreservedRooms';
import ListOfRoomReviews from './components/listOfRoomReviews';
// import ScrollableTabsButtonForce from './menu'

import AppForm from './components/AppForm';

const App = () => {
  return (
  <div>
        {/* <ListOfPreservedRooms /> 
        <ListOfPreservedRooms />
        <ListOfPreservedRooms /> */}
         <ListOfPreservedRooms />  
         <ListOfRoomReviews />
        <ListOfRoomReviews />
        <ListOfRoomReviews />
        <ListOfPreservedRooms />  
         <ListOfRoomReviews /> 
        <AppForm /> 
      
  </div>

 );
}

export default App;

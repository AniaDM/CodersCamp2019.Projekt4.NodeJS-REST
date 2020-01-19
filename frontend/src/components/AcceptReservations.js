import React from 'react';
// import Menu from './Menu';
import ListOfPreservedRooms from './listOfPreservedRooms';

 class AcceptReservations extends React.Component {
    
 state = {
    userId: '',
    
 }

    render() {
    return (<div>
        <ListOfPreservedRooms userId = {this.state.roomLocation}/>
        <ListOfPreservedRooms />
        <ListOfPreservedRooms />
        <ListOfPreservedRooms />
    </div>)
    }
};

export default AcceptReservations


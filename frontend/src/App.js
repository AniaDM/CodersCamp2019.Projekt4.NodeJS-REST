import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './makereservation/Log'
import Register from './makereservation/Register'
import RoomOffers from './makereservation/RoomOffers'
import MakeReservation from './makereservation/MakeReservation'
import GuestReservations from './makereservation/GuestReservations'
import AcceptReservations from './makereservation/AcceptReservations'
import SendOpinion from './makereservation/SendOpinion'
import UserProfile from './makereservation/UserProfile'
import AddOffer from './makereservation/AddOffer'

const App = () => {
  return (<div>
    <BrowserRouter>
    <div>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/roomoffers" exact component={RoomOffers} />
    <Route path="/makereservation" exact component={MakeReservation} />
    <Route path="/questreservations" exact component={GuestReservations} />
    <Route path="/acceptreservations" exact component={AcceptReservations} />
    <Route path="/sendopinion" exact component={SendOpinion} />
    <Route path="/userprofile" exact component={UserProfile} />
    <Route path="/addoffer" exact component={AddOffer} />
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

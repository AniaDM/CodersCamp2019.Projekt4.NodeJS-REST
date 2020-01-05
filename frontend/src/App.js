import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Log'
import Register from './components/Register'
import RoomOffers from './components/RoomOffers'
import MakeReservation from './components/MakeReservation'
import GuestReservations from './components/GuestReservations'
import AcceptReservations from './components/AcceptReservations'
import SendOpinion from './components/SendOpinion'
import UserProfile from './components/UserProfile'
import AddOffer from './components/AddOffer'

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

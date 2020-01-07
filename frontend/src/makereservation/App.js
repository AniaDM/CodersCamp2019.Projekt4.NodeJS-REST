import React from 'react';
import ReactDOM from 'react-dom';
import ReservationCard from './ReservationCard';
import ReservationForm from './ReservationForm';
import OpinionsCards from './OpinionsCard';

const App = () => {
  return ( 
    <div className = "App" >
    <ReservationCard />
    <ReservationForm />
    <OpinionsCards />
    </div>
  )
};
export default App;
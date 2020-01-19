import React from 'react';
import './itemList.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import SendOpinion from './SendOpinion';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import axios from 'axios';
import AcceptReservations from './AcceptReservations'


  class ListOfRoomReviews extends React.Component {
constructor(props){
  super(props)

    this.state = {
      _idRoomOffer: 12,
      offerId: 3,
      userId: 1,
      owner: '',
      name: 'Adam',
      surname: 'Kowal',
      roomLocation: 'Wrocław',
      dateCheckIn: '01-01-2020',
      dateCheckOut: '10-01-2020',
      numberOfGuests: 5,
      paymentMethod: 'cash',
      title: 'Cosy Apartment close to City Center',
      status: 'PENDING...'
    }
    this.acceptedbtn = this.acceptedbtn.bind(this);

    };
  
     componentDidMount()
      {
        axios.get(`http://localhost:4000/api/room-offers/:${this.state._idRoomOffer}`)
        .then(res => {
          const persons = res.data;
          console.log(persons);
            this.setState({
            _id: persons._id,
            offerId: persons.offerId || 23,
            title: persons.title || 'Cosy Apartment close to City Center',
            roomLocation: persons.location || 'Berlin',
            userName: persons.userName || "Pan Kto",
          })
        })
  
         axios.get(`http://localhost:4000/api/room-reservation/:${this.state.userId}`)
        .then(res => {
          const persons = res.data;
          console.log(persons);
          this.setState({
            _id: persons._id || 10,
          offerId: persons.offerId || 23,
          name: persons.name || 'Pio',
          surname: persons.surname || 'Booo',
          dateCheckIn: persons.dateCheckIn || '01-01-2020',
          dateCheckOut: persons.dateCheckOut || '05-01-2020',
          paymentMethod: persons.paymentMethod || 'card',
          status: persons.status || 'acceptButton',
          notice: persons.notice || 'test test',
          numberOfGuests: persons.numberOfGuests || 3,
        })
        })
     
      }
     
      acceptedbtn = () => {
          return (
<Route path="/" exact component={AcceptReservations} />
          )
      }

    render() {
  return (

    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='titleItems'>
          Where  
        </Typography>
   
        <Typography className='content'>
        {this.state.title}
        </Typography>
        <Typography className='city'>
        <Place style={{transform: 'translate(0, 5px)'}} />{this.state.roomLocation}
        </Typography>

      </CardContent>

      <CardContent className='first'>
        <Typography className='titleItems'>
        When
        </Typography>
        <Typography className='contentItems'>
        From {this.state.dateCheckIn} To {this.state.dateCheckOut}
        </Typography>
      </CardContent>

      <CardContent className='second'>

        <Typography className='titleItems'>
            Who
        </Typography>

        <Typography className='contentItems'>
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />
        {this.state.name} {this.state.surname}
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='titleItems'>
          With who?
        </Typography>

        <Typography className='contentItems'>
        {this.state.numberOfGuests > 1 ? this.state.numberOfGuests : 'Alone'}
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='titleItems'>
        Will pay by
        </Typography>

        <Typography className='contentItems'>
        {this.state.paymentMethod}
        </Typography>

    </CardContent>

    <Typography className='accepted' variant="h5" component="h2">
    {this.state.status} 
        {/* PENDING..., ACCEPTED, REFUSED,  */}
        {/* <Route path = '/' exact component={SendOpinion} /> */}
        </Typography>
        <Typography className ='btnOpinion' >
        
        <Button onClick = {this.acceptedbtn}  variant="contained" color="primary">
                <Router>
        {/* <Route path="/sendopinion" exact component={SendOpinion} /> */}
        {/* potrzebne menu, żeby zmienić w meny stronę */}
        RATE
        </Router>
      </Button>
      
      </Typography>

    </Card>
  )};
}

   

 
export default ListOfRoomReviews;
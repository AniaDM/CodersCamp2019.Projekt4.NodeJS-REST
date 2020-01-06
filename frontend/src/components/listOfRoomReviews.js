import React from 'react';
import './itemList.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppForm from './AppForm'

  class ListOfRoomReviews extends React.Component {
constructor(props){
  super(props)

    this.state = {
      offerId: 3,
      userId: 1,
      owner: '',
      name: 'Adam',
      surname: 'Kowal',
      email: '1@1.pl',
      location: 'Wrocław',
      dateCheckIn: '01-01-2020',
      dateCheckOut: '10-01-2020',
      numberOfGuests: 3,
      paymentMethod: 'cash',
      status: 'ACCEPTED'
    }
    this.acceptedbtn = this.acceptedbtn.bind(this);
    this.wysylka = this.wysylka.bind(this);
    };
  
    wysylka = event => {
    
       event.preventDefault();

       fetch('http://localhost:4000/api/room-reservations', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offerId: 1,
          userId: 1,
          owner: '',
          name: 'Adam',
          surname: 'Kowal',
          email: 'test@test.pl',
          location: 'Wroclaw',
          dateCheckIn: this.state.dateCheckIn,
          dateCheckOut: this.state.dateCheckOut,
          numberOfGuests: this.state.numberOfGuests || 11,
          numberOfBeds: this.state.beds || 44,
          paymentMethod: 'card',
          status: 'ACCEPTED',
          
        })
      })
        .then(res => res.json())                 


        .then(res => console.log(res));
    
    };
  
     componentDidMount()
      {

      fetch('http://localhost:4000/api/room-reservations/1')
        .then(response => response.json())
        .then(data => {
              console.log(data)
  
          this.setState({
            offerId: data.offerId || 23,
            owner: data.owner || '',
            name: data.name || 'Tomasz',
            surname: data.surname || 'Kowalski',
            userId: data.userId || '1',
            email: data.email || 'test@dobrze.uk',
         
            location: data.location || 'Berlin',
            dateCheckIn: data.dateCheckIn || '05-05-2020',
            dateCheckOut: data.dateCheckOut || '15-05-2020',
            numberOfGuests: data.numberOfGuests || '3',
            paymentMethod: data.paymentMethod || 'cash',
            status: data.accept || 'ACCEPTED',
          })
  
        })
        .catch(err => console.log(`blad ${err}`))
      }
     
      acceptedbtn = () => {
      // wysłanie na stronę dodającą opinie
      }

    render() {
  return (

    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='titleItems'>
          Where  
        </Typography>
   
        <Typography className='content'>
        Cosy Apartment close to City Center
        </Typography>
        <Typography className='city'>
        <Place style={{transform: 'translate(0, 5px)'}} /> Wroclaw
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
        {this.state.username}
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='titleItems'>
          With who?
        </Typography>

        <Typography className='contentItems'>
        {this.state.numberOfGuests}
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
        </Typography>
        <Typography className ='btnOpinion' >
        
        <Button onClick = {this.acceptedbtn}  variant="contained" color="primary">
        RATE
        {/* potrzebne menu, żeby zmienić w meny stronę */}
      </Button>
      
      </Typography>

    </Card>
  )};
}

   

 
export default ListOfRoomReviews;
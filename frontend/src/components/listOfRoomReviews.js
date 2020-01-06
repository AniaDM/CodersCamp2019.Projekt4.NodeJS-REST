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

  class ListOfRoomReviews extends React.Component {
constructor(props){
  super(props)

    this.state = {
      userId: 1,
      username: '2www',
      email: '1@1.pl',
      roomOfferId: 3,
      location: 'Wrocław',
      dateCheckIn: '01-01-2020',
      dateCheckOut: '10-01-2020',
      numberOfGuests: 3,
      paymentMethod: 'cash',
      accept: 'ACCEPTED'
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
          userId: 1,
          email: 'test@test.pl',
          location: 'Wroclaw',
          roomOfferId: this.state.roomOfferId || 33,
          dateCheckIn: this.state.dateCheckIn,
          numberOfGuests: this.state.numberOfGuests || 11,
          numberOfBeds: this.state.beds || 44,
          paymentMethod: 'card',
          accept: 'ACCEPTED',
          
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
            username: data.username || 'test1',
            userId: data.userId || '1',
            email: data.email || 'test@dobrze.uk',
            roomOfferId: data.roomOfferId || '3',
            location: data.location || 'Berlin',
            dateCheckIn: data.dateCheckIn || '05-05-2020',
            dateCheckOut: data.dateCheckOut || '15-05-2020',
            numberOfGuests: data.numberOfGuests || '3',
            paymentMethod: data.paymentMethod || 'cache',
            accept: data.accept || 'ACCEPTED',
          })
  
        })
        .catch(err => console.log(`blad ${err}`))
      }
     
      acceptedbtn = () => {
      console.log(this.state.accept)
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
     
    {this.state.accept} 
    {/* PENDING..., ACCEPTED, REFUSED,  */}
        </Typography>
        <Typography className ='btnOpinion' >
        <Button onClick = {this.acceptedbtn}  variant="contained" color="primary">
        RATE
      </Button>
      </Typography>
      <CardActions>
        
      </CardActions>
    </Card>
  )};
}

   

 
export default ListOfRoomReviews;
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

    state = {
      userId: '',
      username: '',
      email: '',
      roomOfferId: '',
      location: '',
      dateCheckIn: '',
      dateCheckOut: '',
      numberOfGuests: '',
      paymentMethod: '',
      XXaccept: '',
    };
  
    wysylka = event => {
      console.log('juhu');
      // event.preventDefault();
  
      for (let i=1; i<5; i++){
        this.setState.roomOfferId = i;
        this.setState.dateCheckIn = `${1+i}.08.2020`;
        this.setState.dateCheckOut = `${10+i}.08.2020`;
        this.setState.numberOfGuests = i; 
  
      fetch('http://localhost:4000/api/room-review', {
        // mode: 'no-cors',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          email: 'test@test.pl',
          location: 'Wroclaw',
          roomOfferId: this.state.roomOfferId,
          dateCheckIn: this.state.dateCheckIn,
          numberOfGuests: this.state.numberOfGuests,
          numberOfBeds: this.state.beds,
          paymentMethod: 'card',
          XXaccept: 'do wyboru'
        })
      })
        .then(res => res.json())
        .then(res => console.log(res));
    }
    };
  
     componentDidMount()
      {
    
      fetch('api/Room-review/1')
        .then(response => response.json())
        .then(data => {
              console.log(data)
  
          // this.setState({
          //   username: ''
          // })
  
        })
        .catch(err => console.log(`blad ${err}`))
      
      }
     



    render() {
  return (

    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='title'>
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
        <Typography className='title'>
        When
        </Typography>
        <Typography className='content'>
        From 2020-01-01 To 2020-01-05
        </Typography>
      </CardContent>

      <CardContent className='second'>

        <Typography className='title'>
            Who
        </Typography>

        <Typography className='content'>
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />Jan Kowalski
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title'>
          With who?
        </Typography>

        <Typography className='content'>
          Alone
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title'>
        Will pay by
        </Typography>

        <Typography className='content'>
        Credit card
        </Typography>

    </CardContent>

    <Typography className='accepted' variant="h5" component="h2">
    ACCEPTED
        </Typography>
        <Typography className ='btnOpinion' >
        <Button variant="contained" color="primary">
        RATE
      </Button>
      </Typography>
      <CardActions>
        
      </CardActions>
    </Card>
  )};
}

   

 
export default ListOfRoomReviews;
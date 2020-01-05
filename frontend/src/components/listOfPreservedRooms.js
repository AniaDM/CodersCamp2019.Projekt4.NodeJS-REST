import React from 'react';
import './itemList.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
/*test console*/
class ListOfPreservedRooms extends React.Component {

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

 
  // wysylka = event => {
  //   console.log('juhu');
  //   // event.preventDefault();

  //   for (let i=1; i<5; i++){
  //     this.setState.roomOfferId = i;
  //     this.setState.dateCheckIn = `${1+i}.08.2020`;
  //     this.setState.dateCheckOut = `${10+i}.08.2020`;
  //     this.setState.numberOfGuests = i; 

  //   fetch('http://localhost:4000/api/room-offers', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       userId: 1,
  //       email: 'test@test.pl',
  //       location: 'Wroclaw',
  //       roomOfferId: this.state.roomOfferId,
  //       dateCheckIn: this.state.dateCheckIn,
  //       numberOfGuests: this.state.numberOfGuests,
  //       numberOfBeds: this.state.beds,
  //       paymentMethod: 'card',
  //       XXaccept: 'do wyboru'
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }
  // };

   componentDidMount()
    {
    fetch('api/Room-review')
      .then(response => response.json())
      .then(data => {
        this.setState({
          username: ''
        })
      }      )
      .catch(err => console.log(`blad ${err}`))
    
    }
   
render() {
  // this.wysylka();

  return (
    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='titleItems'>
          Where
        </Typography>
   
        <Typography className='contentItems'>
        Cosy Apartment close to City Center
        </Typography>
        <Typography className='content, city'>
        <Place style={{transform: 'translate(0, 5px)'}} /> Wroclaw
        </Typography>

      </CardContent>

      <CardContent className='first'>
        <Typography className='titleItems'>
        When
        </Typography>
        <Typography className='contentItems'>
        From 2020-01-01 To 2020-01-05
        </Typography>
      </CardContent>

      <CardContent className='second'>

        <Typography className='titleItems'>
            Who
        </Typography>

        <Typography className='contentItems'>
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />
      
        Jan Kowalski
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='titleItems'>
            With who?
        </Typography>

        <Typography className='contentItems'>
            Alone
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='titleItems'>
            Will pay by
        </Typography>

        <Typography className='contentItems'>
            Credit card
        </Typography>

    </CardContent>

    <Typography className='accepted'>
    
        </Typography>
      <CardActions>
          <Button  variant="contained" color="primary">
              ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} />
          </Button>
          <Button variant="contained" color="secondary">
              REFUSE <DeleteIcon />
          </Button>
      </CardActions>
    </Card>
  );
}}


 
export default ListOfPreservedRooms;
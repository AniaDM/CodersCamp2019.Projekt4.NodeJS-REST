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

class ListOfPreservedRooms extends React.Component {
  constructor(props){
    super(props)
  
  this.state = {
    userId: 1,
    roomOfferId: 1,
    username: 'test',
    email: 'kowalski@gmail.com',
    location: 'Wroclaw',
    dateCheckIn: '01-01-2020',
    dateCheckOut: '02-01-2020',
    numberOfGuests: 1,
    paymentMethod: 'cash',
    accept: 'acceptButton',
    changeOffer: ['acceptButton', 'refuseButton', 'ACCEPTED', 'REFUSE'],
    index: 1,
  };
  this.wysylka = this.wysylka.bind(this);
  this.handleClickBtn = this.handleClickBtn.bind(this);
  this.handleClickAccept = this.handleClickAccept.bind(this);
  this.handleClickRefuse = this.handleClickRefuse.bind(this);
  this.componentDidMount = this.componentDidMount.bind(this);
}
 
  wysylka = event => {
     
      this.setState.index++;
      this.setState.roomOfferId = this.index;
      this.setState.numberOfGuests = this.index; 
     

    fetch('http://localhost:4000/api/room-reviews/', {
   
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
        accept: 'acceptButton'
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  
  };


   componentDidMount()
    {  

    fetch(`http://localhost:4000/api/room-reviews?userId=${this.state.userID}`)
      .then(response => response.json())
      .then(data => {
           
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
          accept: data.accept || 'refuseButton',
        })

      })
      .catch(err => console.log(`blad ${err}`))
    }
   
    handleClickBtn = () => {

      fetch('http://localhost:4000/api/room-reviews/', {
   
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
          accept: this.state.accept,
        })
      })
    }


    handleClickAccept = () => {
      this.setState({accept: 'ACCEPTED'});
      this.handleClickBtn();
    };

    handleClickRefuse = () => {
      this.setState({accept: 'REFUSE'});
      console.log(this.state.accept);
      this.handleClickBtn();
    }

render() {
                         
            this.wysylka();   //dla testu
                          
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
        <Place style={{transform: 'translate(0, 5px)'}} /> {this.state.location}
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

    <Typography className='accepted'>
    
        </Typography>
      <CardActions style={{textAlign: 'center', fontWeight: 'bold'}}>
                
              {(this.state.accept === 'acceptButton' || this.state.accept === 'refuseButton') ?(<Button onClick={this.handleClickAccept} type = 'submit' variant="contained" color="primary">
                    ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} /></Button>) : <Typography  className='accepted' variant="h5" component="h2" >{this.state.accept} </Typography>}
                
              {(this.state.accept === 'refuseButton')?(<Button onClick={this.handleClickRefuse} type = 'submit'  variant="contained" color="secondary">
                    REFUSE <DeleteIcon /></Button>) : ''}
      </CardActions>
    </Card>
  );
}}

 
export default ListOfPreservedRooms;
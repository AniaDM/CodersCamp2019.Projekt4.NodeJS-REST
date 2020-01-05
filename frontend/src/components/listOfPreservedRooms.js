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
  constructor(props){
    super(props)
  
  this.state = {
    userId: '1',
    username: 'test',
    email: 'kowalski@gmail.com',
    roomOfferId: '',
    location: 'Wroclaw',
    dateCheckIn: '01-01-2020',
    dateCheckOut: '02-01-2020',
    numberOfGuests: '1',
    paymentMethod: '',
    accept: 'acceptButton',
    changeOffer: ['acceptButton', 'refuseButton', 'accepted', 'refuse'],
  };
  this.wysylka = this.wysylka.bind(this);
}


  wysylka = event => {
      //taka baza do zapełnienia
      for (let i=1; i<5; i++){
      this.setState.roomOfferId = i;
      this.setState.dateCheckIn = `${1+i}.08.2020`;
      this.setState.dateCheckOut = `${10+i}.08.2020`;
      this.setState.numberOfGuests = i; 
//Chcesz tutaj co dodac? jakoś baze zrobić żeby nie była pusta
// Ania jeszcze pisała, żeby zaciągnąć najnowasza wersję naszego projektu
//jak ja zacząłem robić to usunąlem plik App.js teraz się boję bo mam packet-json

//Ale co chcesz dodac? Opinie? Czy pokoje?
//tutaj są pokoje do akceptacji
//To cos niepokolei, bo musisz miec:
//1. uzytkownika na razie mam na stałe 1
//2. pokoj - oomOfferId: 
//3. rezerwacje do ackeptacji i tutaj miałem pytanie ale coś tam robię

//Tutaj probujesz dodac opinie, dlatego request jest zły room-reviews
// robiłem na pliku Ani i też miałem takie problemy - czekaj
    fetch('http://localhost:4000/api/room-reviews/', {
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
        accept: 'do wyboru'
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  };

   componentDidMount()
    {  // kod jej wysłąłem i mówiła, ze nie widzi co źle  Dobra, to daj mi chwilke
  //A gadales z Ania? Bo ona zrobila dodawanie przeciez
    fetch(`http://localhost:4000/api/room-reviews?userId=${this.state.userID}`)
      .then(response => response.json())
      .then(data => {
           
        this.setState({
          username: data.username || 'test1',
          userId: data.userId,
          email: data.email,
          roomOfferId: data.roomOfferId,
          location: data.location,
          dateCheckIn: data.dateCheckIn,
          dateCheckOut: data.dateCheckOut,
          numberOfGuests: data.numberOfGuests,
          paymentMethod: data.paymentMethod,
          accept: data.accept,

        })

      })
      .catch(err => console.log(`blad ${err}`))
    }
   
    handleClickAccept = () => {
      this.setState({accept: 'accepted'});
      console.log(this.state.accept);
    };

    handleClickRefuse = () => {
      this.setState({accept: 'refuse'});
      console.log(this.state.accept);
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

    <Typography className='accepted'>
    
        </Typography>
      <CardActions className = 'button' >
                
              {(this.state.accept === 'acceptButton' || this.state.accept === 'refuseButton') ?(<Button onClick={this.handleClickAccept} type = 'submit' variant="contained" color="primary">
                    ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} /></Button>) : <Typography className='titleItems'> </Typography>}
                
                
                {(this.state.accept === 'refuseButton' || this.state.accept === 'acceptButton')?(<Button onClick={this.handleClickRefuse} type = 'submit'  variant="contained" color="secondary">
                    REFUSE <DeleteIcon /></Button>) : <Typography className='titleItems'>REFUSED</Typography>}

      </CardActions>
    </Card>
  );
}}//pookaz prosze jak to sie dzieje
//Pokaz teraz bo widze, ze Ciebie chyba nie bylo a potem mnie :P 

 
export default ListOfPreservedRooms;
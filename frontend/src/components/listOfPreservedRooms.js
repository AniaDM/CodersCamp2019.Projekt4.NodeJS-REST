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
import axios from 'axios';

class ListOfPreservedRooms extends React.Component {
  constructor(props){
    super(props)
  
  this.state = {
        offerId: 1,
        name: 'Pio',
        surname: 'Bożek',
        dateCheckIn: '25-10-2020',
        dateCheckOut: '27-10-2020',
        paymentMethod: 'card',
        status: 'acceptButton',
        numberOfGuests: 1,
        notice: ',',

        roomLocation: 'Cosy Apartment close to City Center',
        userId: 1,
        owner: '',
        email: '1@1.pl',
        location: 'Wrocław',
  };
  // this.wysylka = this.wysylka.bind(this);
  this.handleClickBtn = this.handleClickBtn.bind(this);
  this.handleClickAccept = this.handleClickAccept.bind(this);
  this.handleClickRefuse = this.handleClickRefuse.bind(this);
  this.componentDidMount = this.componentDidMount.bind(this);
}
 
  // wysylka = event => {
  //     // const user = [this.state.email, this.state.dateCheckIn ]
  //     // axios.post(`http://localhost:4000/api/room-reviews`, { user })
  //     // .then(res => {
  //     //   console.log('axsios wysyłka')
  //     //   console.log(res);
  //     //   console.log(res.data);
  //     // })
// }
rrrr(){
fetch('http://localhost:4000/api/room-reviews', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    offerId: 1,
    userId: 1,
    name: 'Adam',
    surname: 'Kowal',
    email: 'test@test.pl',
    location: 'Wroclaw',
    paymentMethod: 'card',
    status: 'ACCEPTED',
    
  })
})
  .then(res => res.json())                 


  .then(res => console.log(res));
}

   componentDidMount()
    {  
       axios.get(`http://localhost:4000/api/room-reviews`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons });
        console.log('componentDM')
        console.log(persons);
      })

    }
   
  async  handleClickBtn() {
      const user = JSON.stringify({ roomLocation: this.state.location,
        offerId: this.state.offerId,
        name: this.state.name,
        surname: this.state.surname,
        dateCheckIn: this.state.dateCheckIn,
        dateCheckOut: this.state.dateCheckOut,
        paymentMethod: this.state.paymentMethod,
        status: this.state.status,
        numberOfGeusts: this.state.numberOfGeusts,
        notice: '',
})

// https://10.0.2.2:3000/v1/test

await axios.post(`http://localhost:4000/api/room-reviews`, { user })
 .then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
})


axios.get(`http://localhost:4000/api/room-reviews`)
.then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
})
    }

    handleClickAccept = () => {
      this.setState({status: 'ACCEPTED'});
      this.handleClickBtn();
    };

    handleClickRefuse = () => {
      this.setState({status: 'REFUSE'});
      console.log(this.state.accept);
      this.handleClickBtn();
    }

render() {
                         
            // this.wysylka();   //dla testu
                          
  return (
    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='titleItems'>
          Where  
        </Typography>
   
        <Typography className='contentItems'>
        {this.state.roomLocation}
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

    <Typography className='accepted'>
    
        </Typography>
      <CardActions style={{textAlign: 'center', fontWeight: 'bold'}}>
                
              {(this.state.status === 'acceptButton' || this.state.status === 'refuseButton') ? (<Button onClick={this.handleClickAccept} type = 'submit' variant="contained" color="primary">
                    ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} /></Button>) : <Typography 
              className='accepted' variant="h5" component="h2" >{this.state.status}</Typography>}
                
              {(this.state.status === 'refuseButton' || this.state.status === 'acceptButton') ? (<Button onClick={this.handleClickRefuse} type = 'submit'  variant="contained" color="secondary">
                    REFUSE <DeleteIcon /></Button>) : ''}
      </CardActions>
    </Card>
  );
}}

 
export default ListOfPreservedRooms;
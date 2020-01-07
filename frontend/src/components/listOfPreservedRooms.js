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
    userId: 1,
    roomOfferId: 1,
    username: 'test',
    email: 'kowalski@gmail.com',
    roomLocation: 'Wroclaw',
    dateCheckIn: '01-01-2020',
    dateCheckOut: '02-01-2020',
    numberOfGuests: 1,
    paymentMethod: 'cash',
    accept: 'acceptButton',
    changeOffer: ['acceptButton', 'refuseButton', 'ACCEPTED', 'REFUSE'],
    index: 1,

    price: 100,
    roomPhoto: 67,
    numberOfBeds: 3,
    title: "temat",
    description: 52,
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

   componentDidMount()
    {  
       axios.head(`http://localhost:4000/api/room-reviews`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log('componentDM')
        console.log(persons);
      })

    }
   
    handleClickBtn = () => {

const user = {     title: this.state.title,
  description: this.state.description,
  roomLocation: this.state.roomLocation,
  roomOfferId: this.state.roomOfferId,
  username: this.state.username,
  numberOfGuests: this.state.numberOfGuests,
  numberOfBeds: this.state.paymentMethod,
}

axios.post(`http://localhost:4000/api/room-reviews`, { user })
.then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
})


axios.head(`http://localhost:4000/api/room-reviews`)
.then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
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
                         
            // this.wysylka();   //dla testu
                          
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
                
              {(this.state.accept === 'refuseButton' || this.state.accept === 'acceptButton')?(<Button onClick={this.handleClickRefuse} type = 'submit'  variant="contained" color="secondary">
                    REFUSE <DeleteIcon /></Button>) : ''}
      </CardActions>
    </Card>
  );
}}

 
export default ListOfPreservedRooms;
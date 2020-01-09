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
        _idRoomOffer: 1,
        offerId: 1,
        userName: "Pan Kto",
        userId: 1,
        name: 'Pio',
        surname: 'Booo',
        dateCheckIn: '01-01-2020',
        dateCheckOut: '05-01-2020',
        paymentMethod: 'card',
        status: 'acceptButton',
        notice: 'test test',
        numberOfGuests: 3,
        roomLocation: 'Wrocław',
        title: 'Cosy Apartment close to City Center',
        colorStatus: 'black',
  };

  this.handleClickBtn = this.handleClickBtn.bind(this);
  this.handleClickAccept = this.handleClickAccept.bind(this);
  this.handleClickRefuse = this.handleClickRefuse.bind(this);
  this.componentDidMount = this.componentDidMount.bind(this);
}

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
          roomlocation: persons.location || 'Berlin',
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
  

  async  handleClickBtn() {
      const user = JSON.stringify( 
        {
          status: this.state.status,

        }
)

await axios.patch(`http://localhost:4000/api/room-reservation/:/:${this.state.offerId}/status`, { user })
 .then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
  
})


await axios.patch(`http://localhost:4000/api/host-reservation/:/:${this.state.offerId}/status`, { user })
 .then(res => {
  const persons = res.data;
  this.setState({ persons });
  console.log('componentDM')
  console.log(persons);
 
})

    }

    handleClickAccept = () => {
      this.setState({status: 'ACCEPTED'});
      this.setState.colorStatus = 'green';
      this.handleClickBtn();
    };

    handleClickRefuse = () => {
      this.setState({status: 'REFUSE'});
      this.setState.colorStatus = 'red';
      this.handleClickBtn();
    }

render() {
                          
  return (
    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='titleItems'>
          Where  
        </Typography>
   
        <Typography className='contentItems'>
              {this.state.title}
        </Typography>
        <Typography className='content, city'>
        <Place style={{transform: 'translate(0, 5px)'}} /> {this.state.roomLocation}
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
                
              {(this.state.status === 'acceptButton' || this.state.status === 'refuseButton') ? (<Button onClick={this.handleClickAccept}  type = 'submit' variant="contained" color="primary">
                    ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} /></Button>) : <Typography style={{color: this.state.colorStatus}}
              className='accepted' variant="h5" component="h2" >{this.state.status}</Typography>}
                
              {(this.state.status === 'refuseButton' || this.state.status === 'acceptButton') ? (<Button onClick={this.handleClickRefuse}  type = 'submit'  variant="contained" color="secondary">
                    REFUSE <DeleteIcon /></Button>) : ''}
      </CardActions>
    </Card>
  );
}}


 
export default ListOfPreservedRooms;
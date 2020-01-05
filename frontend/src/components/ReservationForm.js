import React from 'react';
import './ReservationForm.css';
import { TextField, InputAdornment, FormControl } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      surname: '',
      amount: 0,
      price: 100,
      nights:1,
      description: '',
      people: 1,
      message: '',
      paymentMethod: 'Cash',
      dateCheckIn:  '2020-01-05',
      dateCheckOut: '2020-01-05'
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePeople = this.handleChangePeople.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangePeople = event => {
    this.setState({ [event.target.name]: (event.target.value<1?1:event.target.value) });
  };
  handleChangeDateCheckIn = event => {
    const time=(new Date()).getTime()-(new Date(event.target.value)).getTime();
    if(time<0) {this.setState({ ["dateCheckIn"]: event.target.value });}
  };
  handleChangeDateCheckOut = event => {
    const time=(new Date(this.state.dateCheckIn)).getTime()-(new Date(event.target.value)).getTime();
    if(time<0){
    const days=(new Date(Math.abs(time))).getDate()-1;
    this.setState({["nights"]:days});
    this.setState({["amount"]:(this.state.price*days)})
    this.setState({ ["dateCheckOut"]: event.target.value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:4000/api/room-offers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.surname,
        price: this.state.amount,
        numberOfGuests: this.state.guests,
        description: this.state.description
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  componentDidMount() {
   
  }

  render() {
    const paymentMethods = [
      {
        value: 'Credit card',
        label: 'Credit card',
      },
      {
        value: 'Cash',
        label: 'Cash',
      },
      {
        value: 'Bank transfer',
        label: 'Bank transfer',
      }
    ];
    return (
      <div>
         <Typography variant="h6" color="initial" component="p">Selected room</Typography>
         <Card className="card" variant="outlined">
        <form
          className="offer"
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div>
          <div>
          <TextField
            id="reservation-name"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            id="reservation-surname"
            label="Surname"
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          </div>
          <div>
          <TextField
          id="reservation-people"
          label="People"
          type="number"
          name="people"
          value={this.state.people}
          onChange={this.handleChangePeople}
          InputLabelProps={{shrink: true}}
          variant="outlined"
          />
         <TextField
          id="reservation-select-payment-method"
          select
          label="Payment Method"
          name="paymentMethod"
          value={this.state.paymentMethod}
          onChange={this.handleChange}
          InputLabelProps={{shrink: true}}
          variant="outlined"
          >
          {paymentMethods.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          </div>
          <TextField
            id="offer-description"
            label="Description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            multiline
            rows="5"
            variant="outlined"
          />
          </div>
          <div>
          <div> Select when you want to stay</div>
          <TextField
            id="date-check-in"
            label="Date Check In"
            type="date"
            value={this.state.dateCheckIn}
            onChange={this.handleChangeDateCheckIn}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            id="date-check-out"
            label="Date Check Out"
            name="dateCheckOut"
            type="date"
            value={this.state.dateCheckOut}
            onChange={this.handleChangeDateCheckOut}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          </div> 
          <div>{`Price for ${this.state.nights} nights $${this.state.amount}`}</div>   
          <Button
            variant="contained"
            className="submit"
            type="submit"
            endIcon={<SendIcon />}
            >
            SEND RESERVATION REQUEST
          </Button>
        </form>
        </Card>
      </div>
    );
  }
}
export default ReservationForm;
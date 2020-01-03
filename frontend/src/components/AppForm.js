import React from 'react';
import './AppForm.css';
import {
  TextField,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
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

class AppForm extends React.Component {
  constructor() {
    super();

    this.state = {
      amount: 10000,
      guests: 0,
      beds: 0,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.increaseGuests = this.increaseGuests.bind(this);
    this.decreaseGuests = this.decreaseGuests.bind(this);
    this.increaseBeds = this.increaseBeds.bind(this);
    this.decreaseBeds = this.decreaseBeds.bind(this);
  }

  handleChange = event => {
    this.setState({ amount: event.target.value });
  };

  increaseGuests = () => {
    this.setState({ guests: this.state.guests + 1 });
  };

  decreaseGuests = () => {
    if (this.state.guests > 0) {
      this.setState({ guests: this.state.guests - 1 });
    } else {
    }
  };

  increaseBeds = () => {
    this.setState({ beds: this.state.beds + 1 });
  };

  decreaseBeds = () => {
    this.setState({ beds: this.state.beds - 1 });
  };

  componentDidMount() {
    fetch('http://localhost:4000/api/room-offers', {
      method: 'post',
    
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <div>Please decribe what do you offer</div>
        <form className="offer" noValidate autoComplete="off">
          <TextField
            id="offer-title"
            label="Title"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            id="offer-location"
            label="Location"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="offer-price">Price per night</InputLabel>
            <OutlinedInput
              id="offer-price"
              value={this.state.amount}
              onChange={this.handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={110}
            />
          </FormControl>
          <TextField
            id="offer-description"
            label="Description"
            multiline
            rows="5"
            defaultValue=" "
            variant="outlined"
          />
          <div>For how many guests?</div>
          <IconButton className="buttons" onClick={this.decreaseGuests}>
            <RemoveCircleOutlineIcon fontSize="large" />
          </IconButton>
          <InputBase
            value={this.state.guests}
            inputProps={{ 'aria-label': 'naked' }}
          />
          <IconButton className="buttons" onClick={this.increaseGuests}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          <div>With how many beds?</div>
          <IconButton className="buttons" onClick={this.decreaseBeds}>
            <RemoveCircleOutlineIcon fontSize="large" />
          </IconButton>
          <InputBase
            value={this.state.beds}
            inputProps={{ 'aria-label': 'naked' }}
          />
          <IconButton className="buttons" onClick={this.increaseBeds}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>

          <Fab aria-label="add">
            <AddIcon />
          </Fab>
          <div>Add photo</div>

          <Button variant="contained" className="submit" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default AppForm;

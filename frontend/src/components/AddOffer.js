import React from 'react';
import Menu from './Menu';
import './AddOffer.css';
import {
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputBase,
  Button,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class AddOffer extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      location: '',
      amount: 10000,
      description: '',
      guests: 0,
      photo: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.increaseGuests = this.increaseGuests.bind(this);
    this.decreaseGuests = this.decreaseGuests.bind(this);
    this.increaseBeds = this.increaseBeds.bind(this);
    this.decreaseBeds = this.decreaseBeds.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgToBase64 = this.handleImgToBase64.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileSelect = event => {
    event.preventDefault();
    document.getElementById('inputPhoto').click();
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
    if (this.state.beds > 0) {
      this.setState({ beds: this.state.beds - 1 });
    } else {
    }
  };

  handleImgToBase64 = event => {
    let reader = new FileReader();
    let file = event.target.files[0];
    let self = this;
    reader.readAsDataURL(file);
    reader.onload = function(upload) {
      self.setState({
        photo: upload.target.result
      });
    };
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:4000/api/room-offers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomLocation: this.state.location,
        price: parseInt(this.state.amount),
        roomPhoto: this.state.photo,
        numberOfGuests: this.state.guests,
        numberOfBeds: this.state.beds,
        title: this.state.title,
        description: this.state.description
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  render() {
    return (
      <div>
        <div>
          <Menu />
          Strona z formularzem dodawania oferty pokoju
        </div>
        <div>
          <div id="header">Please decribe what do you offer</div>
          <form
            className="offer"
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="offer-title"
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              id="offer-location"
              label="Location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="offer-price">Price per night</InputLabel>
              <OutlinedInput
                id="offer-price"
                name="amount"
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
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              defaultValue=" "
              multiline
              rows="6"
              variant="outlined"
            />
            <div id="guests">
              <div className="how-many-text">For how many guests?</div>
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
            </div>

            <div id="beds">
              <div className="how-many-text">With how many beds?</div>
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
            </div>

            <div id="add-photo">
              <Fab
                aria-label="add"
                onClick={this.handleFileSelect}
                name="photo"
                value={this.state.photo}
                onChange={this.handleImgToBase64}
              >
                <AddIcon />
              </Fab>
              <InputBase
                type="file"
                id="inputPhoto"
                name="photo"
                onChange={this.handleImgToBase64}
                style={{ display: 'none' }}
              ></InputBase>

              <div className="add-photo-text">Add photo</div>
            </div>

            <Button
              variant="contained"
              className="submit"
              type="submit"
              endIcon={<SendIcon />}
            >
              SUBMIT ROOM OFFER
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddOffer;

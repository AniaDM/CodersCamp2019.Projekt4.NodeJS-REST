import React from 'react';
import './AppForm.css';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Menu from './Menu'

class Searcher extends React.Component {
    constructor() {
      super();
  
      this.state = {
        numberOfGuests: 1,
        minPrice: 0,
        maxPrice: 100,
        minAverageRating: 1,
        location: '',
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.increaseGuests = this.increaseGuests.bind(this);
      this.decreaseGuests = this.decreaseGuests.bind(this);
      this.increaseRating = this.increaseRating.bind(this);
      this.decreaseRating = this.decreaseRating.bind(this);
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
  
    increaseGuests = () => {
      this.setState({ numberOfGuests: this.state.numberOfGuests + 1 });
    };
  
    decreaseGuests = () => {
      if (this.state.numberOfGuests > 0) {
        this.setState({ numberOfGuests: this.state.numberOfGuests - 1 });
      }
    };
  
    increaseRating = () => {
        if (this.state.minAverageRating < 5) {
          this.setState({ minAverageRating: this.state.minAverageRating + 1 });
        }
      };
  
    decreaseRating = () => {
        if (this.state.minAverageRating > 0) {
          this.setState({ minAverageRating: this.state.minAverageRating - 1 });
        }
      };

    increaseMinPrice = () => {
        this.setState({ minPrice: this.state.minPrice + 1 });
      };
    
    decreaseMinPrice = () => {
        if (this.state.minPrice > 0) {
          this.setState({ minPrice: this.state.minPrice - 1 });
        }
        };

    increaseMaxPrice = () => {
        this.setState({ maxPrice: this.state.maxPrice + 1 });
      };
    
     decreaseMaxPrice = () => {
        if (this.state.maxPrice > 0) {
          this.setState({ maxPrice: this.state.maxPrice - 1 });
        }
      };

  
    handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);

    };
  
    render() {
      return (
        <div>
          <div>Book a room wherever you like</div>
          <form
            className="search"
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="search-city"
              label="City"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <div>For how many guests?</div>
            <IconButton className="buttons" onClick={this.decreaseGuests}>
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
            <InputBase
              value={this.state.numberOfGuests}
              inputProps={{ 'aria-label': 'naked' }}
            />
            <IconButton className="buttons" onClick={this.increaseGuests}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <div>What the minimum rating?</div>
            <IconButton className="buttons" onClick={this.decreaseRating}>
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
            <InputBase
              value={this.state.minAverageRating}
              inputProps={{ 'aria-label': 'naked' }}
            />
            <IconButton className="buttons" onClick={this.increaseRating}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <div>What the minimum price?</div>
            <IconButton className="buttons" onClick={this.decreaseMinPrice}>
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
            <InputBase
              value={this.state.minPrice}
              inputProps={{ 'aria-label': 'naked' }}
            />
            <IconButton className="buttons" onClick={this.increaseMinPrice}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <div>What the maximum price?</div>
            <IconButton className="buttons" onClick={this.decreaseMaxPrice}>
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
            <InputBase
              value={this.state.maxPrice}
              inputProps={{ 'aria-label': 'naked' }}
            />
            <IconButton className="buttons" onClick={this.increaseMaxPrice}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <Button
              variant="contained"
              className="search"
              type="Search"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </form>
        </div>
      );
    }
  }

  class OfferList extends React.Component {
    constructor() {
      super();
    }

    render() {
        return (
        <div>
            Lista
            {/* Tutaj powinnien byc komponent Offer, czyli pojedyncze okno z ofertą, powtarzający się tyle razy ile jest ofert */}
        </div>
        )
    }
}
  
  class RoomOffers extends React.Component {
    state = { id: [] };

        // Gdzie dać to state, czyli req.query czyli filter, żeby przefiltrował oferty?
      handleSubmit = async state => {
        const response = await fetch('http://localhost:4000/api/offers', {
            method: 'get'
          })
            .then(res => res.json())
            .then(res => console.log(res));
            // poniżej trochę improwizacja. myślę, że mając id przefiltrowanych ofert tutaj w state to id mozę być prop np. zdjęcia, tytułu, opisu itd ?
            this.setState({ id: response.map(offer => offer._id) })
        };

    render () {
        return (
        <div>
            <Menu />
        <Searcher onSubmit={this.handleSubmit}/><OfferList />
        </div>
        )
    }
  }

  export default RoomOffers;
  
import 'date-fns';
import React from 'react';
import Menu from './Menu';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    width: 300,
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function City() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField id="outlined-search" label="City" type="search" variant="outlined" />
    </div>
        </form>
    )
}



function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
      <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check in"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check out"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
    </div>
  );
}

function SelectInput() {
    const classes = useStyles();
    const [people, rating, setAge] = React.useState('');
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
  
    const handleChange = event => {
      setAge(event.target.value);
    };
  
    return (
        <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            People
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={people}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value={1}>1 person</MenuItem>
            <MenuItem value={2}>2 people</MenuItem>
            <MenuItem value={3}>3 people</MenuItem>
            <MenuItem value={4}>4 people</MenuItem>
            <MenuItem value={5}>5 people</MenuItem>
            <MenuItem value={6}>6 people</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Rating
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={rating}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value={1}>1 star</MenuItem>
            <MenuItem value={2}>2 stars</MenuItem>
            <MenuItem value={3}>3 stars</MenuItem>
            <MenuItem value={4}>4 stars</MenuItem>
            <MenuItem value={5}>5 stars</MenuItem>
          </Select>
        </FormControl>
        </div>
    );
  }

  function valuetext(value) {
    return `${value}zł`;
  }

const PriceSlider = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState([20, 37]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Price
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    );
  }

  function SendButton() {
    const classes = useStyles();
  
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    );
  }

const Searcher = () => {
return (
<div style={{width: '70%', align: 'center'}}>
    <Grid container justify="space-around">{City()}{MaterialUIPickers}{SelectInput()}</Grid>
    <Grid container justify="space-between">{PriceSlider()}{SendButton()}</Grid>
    </div>
)
}

const RoomOffers = () => {
    return <div><Menu /><Searcher /></div>
};

export default RoomOffers
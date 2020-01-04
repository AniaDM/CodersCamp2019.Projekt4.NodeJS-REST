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
/*test*/
class ListOfPreservedRooms extends React.Component {

  componentDidMount() {
    fetch('http://localhost:4000/api/room-offers')
      .then(response => response.json())
      // .then(data => console.log({ data }))
      .catch(err => console.log(err))
  }

render() {
  return (
    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='title'>
          Where
        </Typography>
   
        <Typography className='contentItems' component="h2">
        Cosy Apartment close to City Center
        </Typography>
        <Typography className='content, city' component="h2">
        <Place style={{transform: 'translate(0, 5px)'}} /> Wroclaw
        </Typography>

      </CardContent>


      <CardContent className='first'>
        <Typography className='title'>
        When
        </Typography>
        <Typography className='contentItems'  component="h2">
        From 2020-01-01 To 2020-01-05
        </Typography>
      </CardContent>

      <CardContent className='second'>

        <Typography className='title' gutterBottom>
            Who
        </Typography>

        <Typography className='contentItems'>
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />
      
        Jan Kowalski
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title' gutterBottom>
            With who?
        </Typography>

        <Typography className='contentItems' component="h2">
            Alone
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title' gutterBottom>
            Will pay by
        </Typography>

        <Typography className='contentItems' component="h2">
            Credit card
        </Typography>

    </CardContent>

    <Typography className='title, accepted' component="h2">
    
        </Typography>
      <CardActions>
          <Button  variant="contained" color="primary">
              ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} />
          </Button>
          <Button variant="contained" color="secondary">
              REFUSE <DeleteIcon />
          </Button>
      </CardActions>
    </Card>
  );
}}


 
export default ListOfPreservedRooms;
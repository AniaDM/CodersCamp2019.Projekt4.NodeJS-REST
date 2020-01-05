import React from 'react';
import './itemList.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';

  class ListOfRoomReviews extends React.Component {
    render() {
  return (

    <Card className='card'>

      <CardContent className='first'>
       
        <Typography className='title'>
          Where
        </Typography>
   
        <Typography className='content'>
        Cosy Apartment close to City Center
        </Typography>
        <Typography className='city'>
        <Place style={{transform: 'translate(0, 5px)'}} /> Wroclaw
        </Typography>

      </CardContent>


      <CardContent className='first'>
        <Typography className='title'>
        When
        </Typography>
        <Typography className='content'>
        From 2020-01-01 To 2020-01-05
        </Typography>
      </CardContent>

      <CardContent className='second'>

        <Typography className='title'>
            Who
        </Typography>

        <Typography className='content'>
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />Jan Kowalski
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title'>
          With who?
        </Typography>

        <Typography className='content'>
          Alone
        </Typography>

        </CardContent>

        <CardContent className='second'>

        <Typography className='title'>
        Will pay by
        </Typography>

        <Typography className='content'>
        Credit card
        </Typography>

    </CardContent>

    <Typography className='accepted' variant="h5" component="h2">
    ACCEPTED
        </Typography>
      <CardActions>
        
      </CardActions>
    </Card>
  )};
}

   

 
export default ListOfRoomReviews;
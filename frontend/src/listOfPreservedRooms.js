import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Place from '@material-ui/icons/Place';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
// import {RoomReviewService} from '../../backend/src/main/roomreview/RoomReviewService'




const useStyles = makeStyles({
  card: {               
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15vh',
    boxShadow: '2px 2px 2px 3px #808080',
    margin: '2vh',
    color: 'black',
  },
   title: {
     display: 'flex',
     justifyContent: 'center',
     alignContent: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: "700",
    margin: '1vh',
    height: '3vh',    
  },
  pos: {
    marginBottom: 12,
    
  },
  first: {
    width: '15vw',
  },
  second: {
    width: '11vw',
  },
  accepted: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: "700",
  },
  content: {
    fontSize: '14px',
    margin: 0,
  },
  city: {
    color: '#c8c8c8',
    fontSize: '14px',
    margin: '0',
  }
});

const ListOfPreservedRooms = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>

      <CardContent className={classes.first}>
       
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Where
        </Typography>
   
        <Typography className={classes.content} variant="h5" component="h2">
        Cosy Apartment close to City Center
        </Typography>
        <Typography className={classes.content, classes.city} variant="h5" component="h2">
        <Place style={{transform: 'translate(0, 5px)'}} /> Wroclaw
        </Typography>

      </CardContent>


      <CardContent className={classes.first}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        When
        </Typography>
        <Typography className={classes.content} variant="h5" component="h2">
        From 2020-01-01 To 2020-01-05
        </Typography>
      </CardContent>

      <CardContent className={classes.second}>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Who
        </Typography>

        <Typography className={classes.content} variant="h5" component="h2">
        <PersonIcon color="primary" style={{transform: 'translate(-3px, 5px)'}} />Jan Kowalski
        </Typography>

        </CardContent>

        <CardContent className={classes.second}>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          With who?
        </Typography>

        <Typography className={classes.content} variant="h5" component="h2">
        Alone
        </Typography>

        </CardContent>

        <CardContent className={classes.second}>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Will pay by
        </Typography>

        <Typography className={classes.content} variant="h5" component="h2">
        Credit card
        </Typography>

    </CardContent>

    <Typography className={classes.title, classes.accepted} variant="h5" component="h2">
    
        </Typography>
      <CardActions>
      <Button variant="contained" color="primary">
  ACCEPT <SendIcon style={{transform: 'translate(3px, 0)'}} />
</Button>
<Button variant="contained" color="secondary">
REFUSE <DeleteIcon />
</Button>
      </CardActions>
    </Card>
  );
}

   

 
export default ListOfPreservedRooms;
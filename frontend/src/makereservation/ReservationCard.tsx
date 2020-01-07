import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { lightGreen } from '@material-ui/core/colors';
import PlaceIcon from '@material-ui/icons/Place';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 402,
      maxHeight: 487
    },
    media: {
      height: 225,
      width: 402
    },
    avatar: {
      backgroundColor: lightGreen[500],
    },
  }),
);


export default function RecipeReviewCard() {
  const classes = useStyles();
  const [value] = React.useState<number | null>(3);

  return (
    <div>
     <Typography variant="h6" color="initial" component="p">Selected room</Typography>
     <Card className={classes.card} variant="outlined">
     <CardHeader
     avatar={<Avatar  className={classes.avatar}>H</Avatar>}
     title="Cosy apartment close to City Center"
     subheader={
       <div>
       <Typography variant="subtitle1"><PlaceIcon />Wrocław</Typography>
       <Rating value={value}  size="small" readOnly />
       </div>
     }
      />
      <CardMedia
        className={classes.media}
        image="./logo192.png"
        title="room"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Nice apartment with view on the Market. From the room it's near to famous polish shop Biedronka
        </Typography>
        <Typography variant="body2" color="initial" component="p">
          Number of guests:5
        </Typography>
        <Typography variant="body2" color="initial" component="p">
          Price: 100$ /night
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
    }

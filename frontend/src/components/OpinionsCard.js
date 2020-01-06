import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { lightGreen } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';

const reviews = [
    {
      label: '1 San Francisco – Oakland Bay Bridge, United States',
      text: 'https: //images.unsplash.com/ photo-1537944434 965-cf4679d1a59 8?auto=format&fit=crop&w=400&h=250&q=60',
      rating: 4
    },
    {
      label: '2 Bird fsdggffdggfdggfdgfd',
      text:
        'https://images.unsplash.com/p hoto-1538 032746644-0212e812a9e7? auto=format&fit=crop &w=400&h=250&q=60',
        rating: 3
    },
    {
      label: '3 Bali, Indonesiafdgfdfdggfdfdg',
      text:
        'https://images.u nsplash.com/photo-15379 96194471-e657df975ab4?au to=format&fit=crop&w=4 00&h=250&q=80',
        rating: 2
    },
    {
      label: '4 NeONBRAND Digital Marketing, Las Vegas, United States',
      text:
        'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
        rating: 5
    },
    {
      label: '5 Goč, Serbiab  hdfhgfhgfhgjfjjgf',
      text:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        rating: 4
    },
    {
        label: '6 San Francisco – Oakland Bay Bridge, United States',
        text: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        rating:3
      },
      {
        label: '7 Bird hggfdjkjlklkkjlklglgh',
        text:
          'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
          rating:3
      },
      {
        label: '8 Bali, Indonesia jgjhffhhgjhgj',
        text:
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
          rating:3
      },
      {
        label: '9 NeONBRAND Digital Marketing, Las Vegas, United States',
        text:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
          rating:3
      },
      {
        label: '10 Goč, Serbia jhgfjfhhghgf',
        text:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
          rating:3
      },
      {
        label: '11 NeONBRAND Digital Marketing, Las Vegas, United States',
        text:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
          rating:3
      },
      {
        label: '12 Goč-1, Serbia-1 jgfgjdhjhjhfd',
        text:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
          rating:3
      },
  ];
const useStyles = makeStyles({
    
  root: {
    maxWidth: '25%',
    maxHeight: 0,
    marginLeft : 'auto',
    marginRight: 'auto',
        },
  card: {
    float: 'left',
    width: '31%',
    maxHeight: 142,
          },
  avatar: {
    backgroundColor: lightGreen[500],
    width:'30px',
    height: '30px',
          },
  header: {
    display:'flex',
  },
  header1: {
    flexDirection: 'column',
    marginTop:-10
  },
  rating: {
    float: 'left'
  }
  
});
const reviews1 = [];

export default function DotsMobileStepper() {
  const offerId="d337b848-17c9-44e1-85dd-b18aab122f37";
 
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwZGJkY2Y4Mi1jMDdlLTQ1NmUtODIwNC1jYzdmZDU4MTM3NzgiLCJ1c2VybmFtZSI6ImFiY2Q0IiwiaWF0IjoxNTc4MjU1ODk2fQ.brFE6ITH8xNL2sWEEdDVBro4j-Rw3RhKESO29sVDnYk"
    const response =fetch( 'http://localhost:4000/api/user-profiles/50309575-4f0f-499d-aa24-7b6e35f6ab68', {
      method: 'GET', 
      mode:'cors',
      headers: {
         Authentication: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzZjcwMjFlMC1lMWQ3LTQ2ZDctOGE2Mi00YTQ4ZGFhYmQ3ZjIiLCJpYXQiOjE1NzcwNTE5OTB9.esyuU6De-2Wrnka9KLDBAe5ybQjATacQW6cdsRbjluw'
        }
      })
      .then(res => res.json())
      .then(user  => console.log(user))
      .catch((error)=>console.error(error))
    
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div >
      
    <MobileStepper
      variant="dots"
      steps={Math.floor(reviews.length/3)}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
    < div >
    <div className={classes.card}>
      <Paper square elevation={4} >
          <div className={classes.header}>
            <Avatar className={classes.avatar} >H</Avatar>
            <div  className={classes.header1}> 
            <Typography variant="caption" >{reviews[3*activeStep].label}</Typography>
            <Rating  value={reviews[3*activeStep].rating}  size="small" readOnly />
            </div>
          </div>
            <Typography variant="caption">{reviews[3*activeStep].text}</Typography>
        </Paper>
    </div>
    <div className={classes.card}>
      <Paper square elevation={4} >
          <div className={classes.header}>
            <Avatar  className={classes.avatar}>H</Avatar>
            <div  className={classes.header1}> 
            <Typography variant="caption" >{reviews[3*activeStep+1].label}</Typography>
            <Rating  value={reviews[3*activeStep+1].rating}  size="small" readOnly />
            </div>
          </div>
            <Typography variant="caption">{reviews[3*activeStep+1].text}</Typography>
        </Paper>
    </div>
    <div className={classes.card}>
      <Paper square elevation={4} >
          <div className={classes.header}>
            <Avatar  className={classes.avatar}>H</Avatar>
            <div  className={classes.header1}> 
            <Typography variant="caption" >{reviews[3*activeStep+2].label}</Typography>
            <Rating value={reviews[3*activeStep+2].rating}  size="small" readOnly />
            </div>
          </div>
            <Typography variant="caption">{reviews[3*activeStep+2].text}</Typography>
        </Paper>
    </div>
    </div>
    </div>
  );
}
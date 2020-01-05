import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const tutorialSteps = [
    {
      label: '1 San Francisco – Oakland Bay Bridge, United States',
      text: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: '2 Bird',
      text:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: '3 Bali, Indonesia',
      text:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      label: '4 NeONBRAND Digital Marketing, Las Vegas, United States',
      text:
        'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: '5 Goč, Serbia',
      text:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: '6 San Francisco – Oakland Bay Bridge, United States',
        text: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: '7 Bird',
        text:
          'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: '8 Bali, Indonesia',
        text:
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      },
      {
        label: '9 NeONBRAND Digital Marketing, Las Vegas, United States',
        text:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: '10 Goč, Serbia',
        text:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: '11 NeONBRAND Digital Marketing, Las Vegas, United States',
        text:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: '12 Goč-1, Serbia-1',
        text:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      },
  ];
const useStyles = makeStyles({
    
  root: {
    maxWidth: 400,
    alignItems: 'center',
        },
  card: {
    float: 'left',
    width: '30%',
    height: 142,
          },
  header: {
    alignItems: 'center'
 
  }
  
});

export default function DotsMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

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
      steps={Math.floor(tutorialSteps.length/3)}
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
      <Paper square elevation={4} className={classes.header}>
            <Typography>{tutorialSteps[3*activeStep].label}</Typography>
            <Typography>{tutorialSteps[3*activeStep].text}</Typography>
        </Paper>
    </div>
    <div className={classes.card}>
      <Paper square elevation={4} className={classes.header}>
            <Typography>{tutorialSteps[3*activeStep+1].label}</Typography>
            <Typography>{tutorialSteps[3*activeStep+1].text}</Typography>
        </Paper>
    </div>
    <div className={classes.card}>
      <Paper square elevation={4} className={classes.header}>
            <Typography>{tutorialSteps[3*activeStep+2].label}</Typography>
            <Typography>{tutorialSteps[3*activeStep+2].text}</Typography>
        </Paper>
    </div>
    </div>
    </div>
  );
}
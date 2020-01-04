import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Link to="/roomoffers"><Tab label="Room Offers" icon={<SearchIcon />} {...a11yProps(0)} /></Link>
          <Link to="/questreservations"><Tab label="My Reservations" icon={<FavoriteIcon />} {...a11yProps(1)} /></Link>
          <Link to="/acceptreservations"><Tab label="Room Requests" icon={<HelpIcon />} {...a11yProps(2)} /></Link>
          <Link to="/userprofile"><Tab label="Profile" icon={<PersonPinIcon />} {...a11yProps(3)} /></Link>
          {/* avatar i mail powinny być pobierane na podst id zalogowanego uzytkowanika */}
          {/* proszę o pomoc, jak mądrze ostylowac ten mail i avatar */}
          <Avatar>H</Avatar>
          <div>username@gmail.com</div>
          <Tab label="Logout" icon={<ExitToAppIcon />} />
        </Tabs>
      </AppBar>
    </div>
  );
}
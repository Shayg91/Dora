import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClassIcon from '@material-ui/icons/Class';

import Lessons from './Lesson';
import Scenarios from './Scenarios'
import Actions from './Actions'

const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
  });

function MainAppBar(props) {
  const { classes } = props;
  return (
    <HashRouter>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Dora - The Learning Robot
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
        <NavLink to='/Lessons'><ListItem button key='Lessons'>
            <ListItemIcon><ClassIcon /></ListItemIcon>
            <ListItemText primary='Lessons' />
          </ListItem></NavLink>
          <NavLink to='/Scenarios'><ListItem button key='Scenarios'>
            <ListItemIcon><ClassIcon /></ListItemIcon>
            <ListItemText primary='Scenarios' />
          </ListItem></NavLink>
          <NavLink to='/Actions'><ListItem button key='Actions'>
            <ListItemIcon><ClassIcon /></ListItemIcon>
            <ListItemText primary='Actions' />
          </ListItem></NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/Lessons" component={Lessons}/>
        <Route path="/Scenarios" component={Scenarios}/>
        <Route path="/Actions" component={Actions}/>
      </main>
    </div>
    </HashRouter>
  );
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
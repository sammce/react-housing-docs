import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.type === 'dark' ? grey[800] : theme.palette.primary.main,
  },
}));

function Header(props) {

  const theme = useTheme();
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.header}>
        <Toolbar>

          <IconButton color="inherit" aria-label="toggle menu" onClick={props.toggleDrawer(true)} >
            <MenuIcon />
          </IconButton>

          <Grid container justify="flex-end">

            <Tooltip title="Toggle dark/light theme">
              <IconButton 
              color="inherit" 
              aria-label="toggle dark mode"
              onClick={props.toggleDark}>

                {theme.palette.type === 'dark'
                ? <Brightness7Icon />
                : <Brightness4Icon />}
                
              </IconButton>
            </Tooltip>

            <Tooltip title="GitHub repository">
              <IconButton 
              color="inherit" 
              aria-label="github repository" 
              href="https://github.com/sammce/housing" 
              target="_blank" 
              rel="noreferrer">
                <GitHubIcon />
              </IconButton>
            </Tooltip>

          </Grid>

        </Toolbar>
      </AppBar>
      <Toolbar id="btta" />
    </React.Fragment>
  );
}

export default React.memo(Header);
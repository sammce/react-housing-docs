import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Collapse from '@material-ui/core/Collapse';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ComputerIcon from '@material-ui/icons/Computer';
import BarChartIcon from '@material-ui/icons/BarChart';

import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

import Link from '../Link/Link';
import { ListItemText, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
        [theme.breakpoints.up("sm")]: {
            width: 350,
        },
    },
    nav: {
        padding: 0,
        
    },
    topSidebarDiv: {
        minHeight: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: theme.palette.type === 'dark' ? "#595959": "#e6e6e6",
    },
    listItem: {
        padding: "10px 16px",
    },
    nestedListItem: {
        paddingLeft: theme.spacing(5),
    },
   
}));

const ListLink = (props) => {
    // props

    // to, icon, text, active
    
    const classes = useStyles();
    const locationName = props.to.slice(1);
    return (
        <Link nounderline="true" nocolor="true" to={props.to}>
            <ListItem 
                button 
                className={
                    [
                        classes.listItem, 
                        props.active === locationName 
                        ? classes.active
                        :"",
                        props.nested 
                        ? classes.nestedListItem
                        :"",

                    ].join(' ')}
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}>

                <ListItemIcon>
                    <props.icon />
                </ListItemIcon>

                <ListItemText primary={props.text} />

            </ListItem>
        </Link>
    )
}

function Sidebar(props){

    const [open, setOpen] = React.useState(false);

    const handleDropClick = (e) => {
        e.preventDefault()
        setOpen(!open);
    };

    const classes = useStyles();
    const { active, toggleDrawer } = props;

    return (
        <div
            className={classes.list}
            role="presentation"
        >

                <Link 
                    nocolor="true" 
                    nounderline="true" to="/"
                    tabIndex="-1">
                    <ListItem button
                    className={classes.topSidebarDiv}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                        <Typography variant="h5">
                            Housing Analysis
                        </Typography>
                    </ListItem>
                </Link>

                <Divider />
            
            <List className={classes.nav} component="nav" aria-label="links around the site">

                <ListItem />

                <ListLink 
                to="/findings" 
                icon={FindInPageIcon} 
                text="Our Findings" 
                active={active} 
                toggleDrawer={toggleDrawer}
                tabIndex="-1"/>
                
                <ListItem 
                    button 
                    onClick={handleDropClick}
                    className={classes.listItem}>

                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Documentation
                    </ListItemText>

                    {open ? <ExpandLess /> : <ExpandMore />}
                    
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListLink 
                            to="/docs/clean" 
                            icon={SpellcheckIcon} 
                            text="Cleaning" 
                            active={active} 
                            toggleDrawer={toggleDrawer}
                            nested="true"/>

                        <ListLink 
                            to="/docs/process" 
                            icon={ComputerIcon} 
                            text="Processing" 
                            active={active} 
                            toggleDrawer={toggleDrawer}
                            nested="true"/>

                        <ListLink 
                            to="/docs/visual" 
                            icon={BarChartIcon} 
                            text="Visualising" 
                            active={active} 
                            toggleDrawer={toggleDrawer}
                            nested="true"/>
                    </List>
                </Collapse>

            </List>
        </div>
    )
}

export default React.memo(Sidebar)
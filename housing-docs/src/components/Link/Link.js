import React from 'react';
import { Link as RouteLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    link: {
        textDecoration: 'none',
        color: props => props.nocolor
        ? theme.palette.text.primary
        : theme.palette.secondary.main,

        '&:hover': {
            textDecoration: props => props.nounderline
            ? "none"
            : "underline",
        }
    },
}));

function Link(props){

    const classes = useStyles(props);

    // if 'to' prop is recieved, return route link for local navigation
    // else return a regular anchor tag
    const Link = props.to ? RouteLink : (props) => 
    (
      <a 
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}>
        {props.children}
      </a>
    )

    return (
        <Link className={classes.link} {...props}> 
          {props.children}
        </Link>
    )
  }

  export default React.memo(Link)
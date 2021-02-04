import { Link as RouteLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    }
})

export default function Link(props){

    const classes = useStyles();
  
    return (
        <RouteLink className={classes.link} {...props}> 
          {props.children}
        </RouteLink>
    )
  }
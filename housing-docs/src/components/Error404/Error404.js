import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Grid from '@material-ui/core/Grid';

import Link from '../Link/Link';

const useStyles = makeStyles({
    errorDiv: {
      minHeight: '80vh',
      textAlign: 'center',
    },
    sadIcon: {
        fontSize: 50,
    },
});

const Error404 = props => {

    const classes = useStyles();
  
    return (
      <Grid 
      className={classes.errorDiv} 
      container 
      direction="column"
      justify="center"
      alignItems="center">

          <Grid className={classes.messageDiv} container item spacing={3}>
            <Grid item>
                <h1>Page not found</h1> 
            </Grid>

            <Grid item>
                <SentimentVeryDissatisfiedOutlinedIcon className={classes.sadIcon} />
            </Grid>
            
          </Grid>

          <Grid item>
            <Link to="/"> 
                <Button variant="contained" color="primary">Return to home page</Button>
            </Link>
          </Grid>
      </Grid>
        // <h1>dwadwa</h1>
    )
}

export { Error404 };
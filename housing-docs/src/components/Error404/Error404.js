import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Grid from '@material-ui/core/Grid';

import Link from '../Link/Link';
import PageSkeleton from '../PageSkeleton/PageSkeleton';

const useStyles = makeStyles({
    errorDiv: {
      minHeight: '60vh',
      textAlign: 'center',
    },
    sadIcon: {
        marginTop: '6px',
        fontSize: 45,
    },
});

const Error404 = props => {

    const classes = useStyles();
  
    return (
      <PageSkeleton toggleDark={props.toggleDark}>
      <Grid 
      className={classes.errorDiv} 
      container 
      direction="column"
      justify="center"
      alignItems="center">

          <Grid 
          className={classes.messageDiv} 
          container 
          item 
          spacing={1}
          justify="center"
          alignItems="center">
            <Grid item>
                <h1>Page not found</h1> 
            </Grid>

            <Grid item>
                <SentimentVeryDissatisfiedOutlinedIcon className={classes.sadIcon} />
            </Grid>
            
          </Grid>

          <Grid item>
            <Link to="/" nounderline="true"> 
                <Button variant="contained" color="secondary">Return to home page</Button>
            </Link>
          </Grid>
      </Grid>
      </PageSkeleton>
    )
}

export { Error404 };
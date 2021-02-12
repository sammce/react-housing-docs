import React from 'react';
import Link from '../Link/Link';
import CaptionedHeading from '../CaptionedHeading/CaptionedHeading';
import PageSkeleton from '../PageSkeleton/PageSkeleton';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Graph from '../Graph/Graph';

const useStyles = makeStyles({
  buttonGrid: {
    width: '100%',
    margin: '40px 0',
  }
})

function Home(props) {

  const classes = useStyles();

  return (
    <PageSkeleton active="home">
        <CaptionedHeading align="center" caption="By Óran, Robert and Sam">
          Housing Analysis
        </CaptionedHeading>

        <Graph file="dublin_averages_new_line.html" />
        

        <Grid container justify="center" className={classes.buttonGrid} spacing={4}>

          <Grid item>
            <Link nocolor="true" nounderline="true" to="/findings">
              <Button variant="contained" color="primary" size="large">View our results</Button>
            </Link>
          </Grid>

          <Grid item>
            <Link nocolor="true" nounderline="true" to="/docs/clean" >
              <Button color="secondary" variant="contained" size="large">How we did it</Button>
            </Link>
          </Grid>


        </Grid>
    </PageSkeleton>
  );
}

export default React.memo(Home);
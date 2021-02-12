import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../Link/Link';

const useStyles = makeStyles( theme => ({
    footerContainer: {
        marginTop: 60,
        padding: 60,
        backgroundColor: theme.palette.type === 'dark' 
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.palette.type === 'dark' 
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
    }
}));

function Footer(){

    const classes = useStyles();

    return (
            <Grid container justify="center" alignItems="center" className={classes.footerContainer}>
                <Grid item container direction="column">

                    <Grid item>
                        <Typography paragraph align="center">
                            Copyright&#169; 2021
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography paragraph className={classes.text}>
                            Made with <Link href="https://reactjs.org/">React</Link>
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
    )
}

export default React.memo(Footer);
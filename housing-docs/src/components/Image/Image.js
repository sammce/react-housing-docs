import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        borderRadius: 6,
        width: '100%',
        margin: '5px 0 20px 0',
    }
})

function Image(props){
    const classes = useStyles();
    return (
        <img src={props.src} className={classes.root} alt={props.alt} />
    )
}
export default React.memo(Image);
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles( theme => ({
    subtext: {
        color: theme.palette.type === 'dark' ? grey[500]: grey[600],
        marginBottom: 16,
    }
}));

export default function CaptionedHeading({children, caption}){

    const classes = useStyles();

    return (
        <>
            <Typography variant="h2">{children}</Typography>
            <Typography variant="body2" className={classes.subtext}>{caption}</Typography>
        </>
    )
}
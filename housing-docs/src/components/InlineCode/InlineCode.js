
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "2px 5px",
        borderRadius: 4,
        display: 'inline',
        backgroundColor: theme.palette.type === 'dark'
        ? 'rgba(252,232,172,0.4)'
        : 'rgba(156, 39, 176, 0.4)',
        whiteSpace: 'nowrap',
    }
}));

export default function InlineCode(props){
    const classes = useStyles()
    return (
        <code className={classes.root}>
            {props.children}
        </code>
    )
}
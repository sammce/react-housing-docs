import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { python } from 'react-syntax-highlighter/dist/esm/languages/hljs';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    snackbar: {
        [theme.breakpoints.down('xs')]: {
            bottom: 100,
        }
    }
}))

const style = {
        borderRadius: 6,
        padding: '15px 25px',
        margin: '10px 0 0 0',
        height: '100%',
    }

SyntaxHighlighter.registerLanguage('python', python);

function CodeBlock(props){

    const copyTargetRef = React.useRef(null);
    const [snackState, setSnack] = React.useState({
        open: false,
        error: false,
    });

    const classes = useStyles();

    const handleCopy = (e) => {
        let currentNode = copyTargetRef.current.children[0].children[0];
        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(currentNode);
            range.select();
            document.execCommand('copy');
            range.remove();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(currentNode);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();
        } else {
            setSnack({
                open: true,
                error: true,
            })
            return
        }

        setSnack({
            open: true,
            error: false,
        });
    }

    const handleSnackClose = () => {
        const oldSnackState = {...snackState};
        oldSnackState.open = false
        setSnack(oldSnackState);
    }

    return (
        <>
        <Box boxShadow={2} borderRadius={6} ref={copyTargetRef}>
            <SyntaxHighlighter 
                customStyle={style} 
                style={tomorrowNightEighties} 
                language="python"
                showLineNumbers={props.line ? true : false}
                startingLineNumber={props.line ? parseInt(props.line) : 1}>
                {props.children}
            </SyntaxHighlighter>
        </Box>
        <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 0'}}>
            <Tooltip title={props.gitLink ? "View code on GitHub" : "This code is just example code"} placement="top">
                {props.gitLink ?
                    <IconButton 
                        aria-label="view on github"
                        href={props.gitLink} 
                        target="_blank" 
                        rel="noreferrer">
                        <CodeIcon />
                    </IconButton>

                :   
                    <span>
                        <IconButton 
                            disabled>
                            <CodeIcon />
                        </IconButton>
                    </span>
                }
                
                
            </Tooltip>

            <Tooltip title="Copy source code" placement="top">
                <IconButton aria-label="copy code block" onClick={handleCopy}>
                    <FileCopyIcon />
                </IconButton>
            </Tooltip>
        </div>

        <Snackbar
            className={classes.snackbar}
            open={snackState.open}
            onClose={handleSnackClose}
            TransitionComponent={Grow}
            children={
                snackState.error 
                ?   <Alert onClose={handleSnackClose} severity="error">
                        {snackState.message ? snackState.message : <span>Code couldn't be copied</span>}
                    </Alert>
                : <Alert onClose={handleSnackClose} severity="success">
                    Code copied to clipboard
                </Alert>
            }
            autoHideDuration={3000}/>
        
        
            
        </>
    )
}

export default React.memo(CodeBlock)
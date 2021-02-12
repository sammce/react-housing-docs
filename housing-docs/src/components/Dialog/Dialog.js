import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Cookies from 'universal-cookie';

// setup cookies
const cookies = new Cookies();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

function AlertDialog(props) {

  const [dialogOpen, setDialogOpen] = React.useState(false)

  if (useMediaQuery('(max-width: 768px)') && !cookies.get('_nmd')){
        setDialogOpen(true);
        let d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        cookies.set('_nmd', 1, { path: "/", expires: d })
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  return (
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your mobile experience"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This website is best enjoyed on a PC, but still functions on your device.
            You may need to scroll horizontally to view tables and code blocks if you continue on mobile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            I understand
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default React.memo(AlertDialog);
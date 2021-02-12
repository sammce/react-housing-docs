import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tooltip from '@material-ui/core/Tooltip';

  
function ScrollTop(props) {
    const style = {
      position: 'fixed',
      bottom: 30,
      right: 30
    }
  
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#btta');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
        <React.Fragment>
            <Zoom in={trigger}>
                <div onClick={handleClick} role="presentation" style={style}>
                    {props.children}
                </div>
            </Zoom>
        </React.Fragment>
    );
  }

export default function BackToTop(props){
  return (
    <React.Fragment>
      <ScrollTop {...props}>
        <Tooltip title="Back to top" placement="top">
          <Fab color="secondary" aria-label="scroll back to top">
            <KeyboardArrowUpIcon style={{fontSize: 25}}/>
          </Fab>
        </Tooltip>
      </ScrollTop>
    </React.Fragment>
  )
}
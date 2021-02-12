import React from 'react';
import Navbar from '../Navbar/Navbar';
import BackToTop from '../BackToTop/BackToTop';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Dialog from '../Dialog/Dialog';

import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { createMuiTheme, ThemeProvider, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import { blue, amber, grey, purple } from '@material-ui/core/colors';

import Cookies from 'universal-cookie';

// setup cookies
const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 35,
        [theme.breakpoints.down("sm")]: {
            marginTop: 20,
            maxWidth: '100vw',
        }
    }
}));


function PageSkeleton(props) {

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [darkMode, setDark] = React.useState(cookies.get('_d') ? true : false);

    const toggleDark = () => {
        if (darkMode){
            cookies.remove('_d', { path: "/" })
        } else {
            let d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000));
            cookies.set('_d', 1, { path: "/", expires: d })
        }
        setDark(!darkMode);
        console.log(document.cookie)
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setDrawerOpen(open);
    };

    const classes = useStyles();

    let theme = createMuiTheme({
        palette: {
            primary: {
                main: blue[700],
            },
            secondary: {
                main: darkMode ? amber[400] : purple[500],
                codeBg: darkMode ? amber[50] : purple[50],
            },
            contrastThreshold: 3,

            type: darkMode ? 'dark' : 'light',

            background: {
                default: darkMode ? grey[900] : grey[100],
            },
        },
        
        typography: {
            h1: {
                fontSize: 55,
                fontWeight: 400,
            },
            h2: {
                fontSize: 45,
                fontWeight: 400,
            },
            h3: {
                fontSize: 33,
                fontWeight: 400,
            },
            h4: {
                fontSize: 28,
                marginBottom: 8,
                fontWeight: 400,
            },
            h5: {
                fontSize: 24,
                marginBottom: 4,
                fontWeight: 400,
            },
        }
    });

    theme = responsiveFontSizes(theme);

    const { children } = props;

    const MemoizedContainer = React.memo(() => (
        <Container className={classes.container} maxWidth="md">
            {children}
        </Container>
    ));

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid 
            style={{minHeight: '100vh'}}
            container 
            direction="column">
            <Grid item style={{flexGrow: 1}}>

                <Navbar toggleDark={toggleDark} toggleDrawer={toggleDrawer} />

                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Sidebar toggleDrawer={toggleDrawer} active={props.active}/>
                </Drawer>
                
                <MemoizedContainer />

                <BackToTop />
            </Grid>

            <Grid item>
                <Footer />
            </Grid>
        </Grid>

        <Dialog />

        </ThemeProvider>
    );
}

export default React.memo(PageSkeleton);
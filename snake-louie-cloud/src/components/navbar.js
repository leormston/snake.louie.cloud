import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import lg_logo from '../images/lg_logo.png';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Switch } from '@mui/material';
import Menu from '@mui/material/Menu';

export default function Navbar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="fixed" className="navStyle" sx={{ backgroundColor: props.cssTheme === "light" ? "#453a4a" : "#370152" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' }, mr: 1 }} >
                        <img src={lg_logo} height="50px" width="50px" alt="logo" style={{ "marginRight": "20px" }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                height: "50px",
                                alignItems: "center"
                            }}
                        >
                            snake.louie.cloud
                        </Typography>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            style={{ marginLeft: "-20px" }}
                        >
                           
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            height: "50px",
                            verticalAlign: "middle",
                            alignItems: "center",
                        }}>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
                                <img src={lg_logo} height="50px" width="50px" alt="logo" style={{ "marginRight": "10px" }} />
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textAlign: "left",
                                    alignSelf: "left"
                                }}
                            >
                                snake.louie.cloud
                            </Typography>
                        </Box>
                    </Box>




                    


                    <Box sx={{ display: { xs: 'flex', md: 'flex' }, textAlign: "right", height: "50px", alignItems: "center" }}>
                        <Switch onChange={() => {
                            localStorage.setItem("theme", props.cssTheme === "dark" ? "light" : "dark")
                            props.setCssTheme(props.cssTheme === "dark" ? "light" : "dark")
                        }
                        } size="medium" />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                fontWeight: 500,
                                fontSize: "1rem",
                                letterSpacing: '.05rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            style={{ "height": "50px", "lineHeight": "50px", "marginLeft": "10px", "marginRight": "10px", "textAlign": "center", "verticalAlign": "middle" }}
                        >
                            {props.cssTheme}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none' } }}>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
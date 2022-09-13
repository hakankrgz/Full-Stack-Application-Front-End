import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";

    var link={
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
    }
    var userlink={
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
    }


function Navbar() {

    const onClick=()=>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        window.history.go(0)
    }
    
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    ><MenuIcon/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left" }}>
                <Link style={link} to="/">Home</Link>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"right"}}>
                    {localStorage.getItem("currentUser")==null ? <Link style={link} to="/auth">Login / Register</Link>:
                <div><IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>
                <Link style={userlink} to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
                </div>}
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
)}
export default Navbar;
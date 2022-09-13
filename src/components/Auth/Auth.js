import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import {PostWithoutAuth} from "../../services/HttpService";

function Auth(){

    const [username, setUsername]=useState()
    const [password, setPassword]=useState()
    const handleUsername=(value)=>{
        setUsername(value)
    }
    
    const handlePassword=(value)=>{
        setPassword(value)
    }

    const sendRequest=(path)=>{
        PostWithoutAuth("/auth/"+path,{
            userName :username,
            password:password,
        })
        .then((res)=>res.json())
        .then((result)=>{localStorage.setItem("tokenKey",result.accessToken);
                        localStorage.setItem("refreshKey",result.refreshToken);
                        localStorage.setItem("currentUser",result.userId);
                        localStorage.setItem("userName",username)})
        .catch((err)=>console.log(err))
    }

    const handleRegister = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        window.history.go("/auth")
    }

    const handleLogin = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
    }
            
    
    return(
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input onChange={(i)=>handleUsername(i.target.value)}/>
            <InputLabel style={{top: 80}}>Password</InputLabel>
            <Input style={{top: 40}}
            onChange={(i)=>handlePassword(i.target.value)}/>
            <Button variant="contained"
            style={{marginTop: 60,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'}}
            onClick={()=>handleRegister("register")}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant="contained"
            style={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'}}
            onClick={()=>handleLogin("login")}>Login</Button>
        </FormControl> 

    )
}




export default Auth;
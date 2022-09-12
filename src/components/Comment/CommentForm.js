import React, { useState } from "react";
import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
function CommentForm(props){
    const{userId, userName, postId} = props;
    const[text, SetText]=useState("");

    let link = {
        textDecoration:"none",
        boxShadow: "none",
        color:"white"
    };

    const saveComment=()=>{
        PostWithAuth("/comments",{
            postId: postId,
            userId: localStorage.getItem("currentUser"),
            text: text,
        })
        .then((res)=>res.json())
        .catch((err)=> console.log(err))
    }

    const handleSubmit = ()=>{
        saveComment();
        SetText("");
    }

    const handleChange=(value)=>{
        SetText(value);
    }

    return(
        <CardContent className="comment">
            <OutlinedInput
            id = "outlined-adornment-amount"
            multiline
            inputProps = {{ maxLength: 250 }}
            fullWidth
            onChange={(i)=>handleChange(i.target.value)}
            startAdornment = {
                <InputAdornment position="start" >
                    <Link style={link} to={{pathname : '/users/' + userId}}>
                        <Avatar aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                </InputAdornment>
                }
                endAdornment ={
                <InputAdornment position="end">
                    <Button
                    variant='contained'
                    style={{background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%',
                    color:'white'}}
                    onClick={handleSubmit}
                    >Comment</Button>
                    </InputAdornment>
                    }
                    value={text}
                    style = {{color: "black", backgroundColor: "white"}}
                    ></OutlinedInput>         
                    </CardContent>
                    )
                }

export default CommentForm;
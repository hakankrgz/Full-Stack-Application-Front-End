import React, { useState, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import {useParams} from "react-router-dom";
import UserActivity from "../UserActivity/UserActivity";
import { GetWithAuth } from "../../services/HttpService";

var divstyle={
    display:"flex"
}

function User() {
    const{userId} = useParams();
    const [user, setUser]= useState();

    const getUser=()=>{
        GetWithAuth("/users/"+userId,)
        .then(res=>res.json())
        .then(
            (result)=> {
                console.log(result);
                setUser(result);
            },
            (error)=>{
                console.log(error)
            }
        )
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <div style={divstyle}>
            {user? <Avatar avatarId={user.avatarId}/>:""}
            <UserActivity userId={userId}/>
        </div>
    )
}

export default User;
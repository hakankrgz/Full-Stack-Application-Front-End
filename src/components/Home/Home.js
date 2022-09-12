import React, {useState, useEffect} from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

var container={
    display: "flex",
    flexWrap:"Wrap",
    justifyContent: "center",
    aliginItems: "center",
    backgroundColor: "#f0f5ff"
}


function Home() {
    const [error, setError]=useState(null);
    const [isLoaded, setIsLoaded]=useState(false);
    const [postList, setPostlist]=useState([]);

    const refreshPosts=()=>{
        fetch("/posts")
        .then(res=>res.json())
        .then(
            (result)=>{
                setIsLoaded(true);
                setPostlist(result);
            },
            (error)=>{
                console.log(error);
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(()=>{
        refreshPosts()
    },[])
    
    if(error){
        return <div>Error !!!</div>
    }else if(!isLoaded){
        return <div> Loading...</div>
    }else{
        return(
            <div style={container}>
                {localStorage.getItem("currentUser")==null?"":
                <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts={refreshPosts}/>}
                {postList.map(post =>(
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} 
                    title={post.title} text={post.text}></Post>
                ))}
            </div>
        );
    }
}

export default Home;
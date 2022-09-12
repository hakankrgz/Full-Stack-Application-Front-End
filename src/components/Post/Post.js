import React, {useState, useEffect, useRef} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom";
import { Container } from "@mui/system";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

function Post(props) {
    let link = {
        textDecoration:"none",
        boxShadow: "none",
        color:"white"
          };
    const {title, text, userId, userName, postId, likes} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [CommentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId]=useState(null);
    let disabled= localStorage.getItem("currentUser")==null?true:false;


  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(CommentList);
  };
  
  const handleLike = () => { 
    setIsLiked(!isLiked)
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }
  }

  const refreshComments = () => {
    fetch("/comments?postId" + postId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setCommentList(result)     
        },
        (error) => {
          console.lpg(error)
            setIsLoaded(true);
            setError(error);
        }
    )
  } 

  const saveLike = () => {
    PostWithAuth("/likes",{
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    } )
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  const deleteLike=()=>{
    DeleteWithAuth("/likes/"+likeId)
    .catch((err) => console.log(err))
  }

  const checkLikes =()=>{
    var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
    refreshComments();
  }, [])

  useEffect(() => {checkLikes()},[])

    return (
        <div style={{margin:20}}>
            <Card style={{width:800, margin:"auto"}}>
                <CardHeader style={{ textAlign:"left"}}
                    avatar={
                    <Link style={link} to={{pathname : '/users/' + userId}}>
                        <Avatar style={{ background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%' }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }
                    title={title}
                />
                <CardContent style={{textAlign:"left"}}>
                    <Typography variant="body2" color="text.secondary">
                    {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {disabled ?
                    <IconButton
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null}/>
                    </IconButton> :
                    <IconButton
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                      <FavoriteIcon style={isLiked? { color: "red" } : null}/>
                    </IconButton>
                    }
                    {likeCount}
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                      {error? "error":
                      isLoaded? CommentList.map(comment => (
                        <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
                      )): "loading"}
                      {disabled ?"":
                      <CommentForm userId = {userId} userName = {userName} postId = {postId}></CommentForm>}
                    </Container>
                </Collapse>
            </Card>
        </div>
    )
}

export default Post;
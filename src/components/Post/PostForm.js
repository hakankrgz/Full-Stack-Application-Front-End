import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { PostWithAuth } from '../../services/HttpService';

import { Link } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';

var link={
textDecoration:"none",
boxShadow: "none",
color:"white"
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    
    transform:'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),

  }));

function PostForm(props){
    const{userId,userName, refreshPosts} = props;
    const [text, SetText]=React.useState("");
    const [title, setTitle]=React.useState("");
    const [isSent, setIsSent]=React.useState(false);

    const savePost=()=>{
      PostWithAuth("/posts",{
        title: title,
        userId: userId,
        text: text,
    })
    .then((res)=>res.json())
    .catch((err)=> console.log(err))
    }

    const handleSubmit =()=>{
        savePost();
        setIsSent(true);
        setTitle("");
        SetText("");
        refreshPosts();
    }

    const handleTitle =(value)=>{
        setTitle(value);
        setIsSent(false);

    }

    const handleText =(value)=> {
        SetText(value);
        setIsSent(false);

    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setIsSent(false);
    };

    return (
      <div style={{margin:20}}>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your post is sent!
        </Alert>
      </Snackbar>
<Card className='postContainer' sx={{ width: 800, textAlign: 'left', margin:1}}>
        <CardHeader
          avatar={
            <Link style={link} to={{pathname : '/users/' + userId}}>
            <Avatar style={{ background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%' }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          }
          title={<OutlinedInput
          id='outlined-adornment-amount'
          multiline
          placeholder='Title'
          inputProps={{maxLenght:25}}
          fullWidth
          value={title}
          onChange={(i)=> handleTitle(i.target.value)}
          >
          </OutlinedInput>}
          />
        <CardContent tent>
          <Typography variant="body2" color="text.secondary">
          <OutlinedInput
          id='outlined-adornment-amount'
          multiline
          placeholder='Text'
          inputProps={{maxLenght:250}}
          fullWidth
          value={text}
          onChange={(i)=> handleText(i.target.value)}
          endAdornment={
            <InputAdornment position='end'>
                <Button
                variant='contained'
                style={{background: 'linear-gradient(45deg, #2196F3 30%,#21CBF3 90%',
                color:'white'}}
                onClick={handleSubmit}
                >Post</Button>
            </InputAdornment>
          }
          >
          </OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
      </div>
    );
}
export default PostForm;
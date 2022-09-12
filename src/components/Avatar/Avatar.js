import {Button, Card, CardActions, CardContent, CardMedia, List, ListItem, ListItemSecondaryAction, Modal, Radio, Typography } from "@mui/material";
import React, { useState } from "react";
import { PutWithAuth } from "../../services/HttpService";

var modal={
    display: "flex",
    maxWidth: 200,
}

var card={
    maxWidth: 345,
    margin:20,
}

function Avatar(props) {
    const {avatarId} = props
    const [open, setOpen]= useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    
    const saveAvatar=()=>{
        PutWithAuth("/users/"+localStorage.getItem("currentUser"),{
            avatar: selectedValue,
        })
        .then((res) =>res.json())
        .catch((err) => console.log(err))
    }

    const handleOpen = ()=>{
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
        saveAvatar();
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
     
    return(
        <div>
            <Card sx={card}>
                <CardMedia
                component="img"
                image={`/avatars/avatar${selectedValue}.png`}
                title="User Avatar"
                alt="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    User İnfo
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpen}>
                    Change Avatar</Button>
                </CardActions>
            </Card>
            <Modal sx={modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <List dense>
                    {[1, 2, 3, 4, 5, 6].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                          <ListItem key={key} button>
                              <CardMedia
                              style = {{maxWidth: 100}}
                              component="img"
                              alt={`Avatar n°${key}`}
                              image={`/avatars/avatar${key}.png`}
                              title="User Avatar"
                              />
                            <ListItemSecondaryAction>
                              <Radio
                                edge="end"
                                value= {key}
                                onChange={handleChange}
                                checked={""+selectedValue === ""+key}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                </List>
            </Modal>
            </div>
            );
        }
        export default Avatar;
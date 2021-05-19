import React, { useState } from "react";
import "./Todo.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {db} from "../firebase_config";
import UpdateIcon from "@material-ui/icons/Update";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import { Modal, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxWidth: 300,
    height: 145,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginLeft: "25rem",
    marginTop: "12rem",
  },
  root: {
    width: 345,
    marginBottom: "1rem",
  },
}));

function Todo({ todo, id, inprogress }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);// for modal.
  const [input, setInput] = useState("");

  const handleClose = () => {
    setOpen(true);
  };
  const toggelTodoStatus = () => {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  };
  const updateTodo = (e) => {
    //this function gets fired on clicking update button inside modal window and update the todo value
    db.collection("todos").doc(id).update(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const DeleteTodo = (e) => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Edit your Todo</h1>
          <input
            autoFocus="ture"
            value={input}
            placeholder={todo}
            onChange={(e) => setInput(e.target.value)}
          />
          <UpdateIcon onClick={updateTodo} />
        </div>
      </Modal>
      <div className="card-center">
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="textPrimary" component="h2">
                {todo}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {inprogress ? "In Progress" : "Completed"}
              </Typography>
              <Button onClick={toggelTodoStatus}>
                {inprogress ? <ToggleOffIcon /> : <ToggleOnIcon />}
              </Button>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <EditIcon onClick={(e) => handleClose()} />
            <DeleteForeverIcon onClick={DeleteTodo} />
          </CardActions>
        </Card>
      </div>
      </React.Fragment>
  );
}

export default Todo;

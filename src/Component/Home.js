import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Home.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "../Component/Todo";
import { db } from "../firebase_config";
// import firebase from "firebase";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log(input);
  //when the app loads, we need to listen to the data base to fetch new todos as they get added/removed
  useEffect(() => {
    // this code here fires when the app loads and get all the todos from data base
    db.collection("todos")
      // .orderBy("timestemp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            inprogress: doc.data().inprogress,
          }))
        );
        // console.log(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const AddTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: input,
    });

    setInput(""); // clear input after hitting enter
  };

  return (
    <React.Fragment>
      <div className="App">
        <h1> 🚀 Your Todos 🚀 </h1>

        <form>
          <FormControl>
            <InputLabel>✅ New Todo</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </FormControl>

          <Button
            disabled={!input}
            type="submit"
            onClick={AddTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </form>
        <div>
          {todos.map((todo) => (
            <Todo todo={todo.todo} id={todo.id} inprogress={todo.inprogress} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;

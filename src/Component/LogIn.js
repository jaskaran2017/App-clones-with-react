import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./login.css";
import { auth } from "../firebase_config";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  //////////////////////////////////

  const success = () => {
    toast.success("✅  WELCOME TO TODO APP!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const failed = () => {
    toast.error("💥 Please try again!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      success();
      history.push("/");
    } catch (err) {
      failed();
    }
  };
  return (
    <React.Fragment>
      <div className="loginbody">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="margin heading">LogIn</h1>
          <input
            className="margin"
            value={email}
            placeholder="abc@abc.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="margin"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="margin"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default LogIn;

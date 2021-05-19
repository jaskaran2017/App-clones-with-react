import React from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase_config";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

function Navbar({ user }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root.main}>
      <AppBar position="static">
        <Toolbar>
          <div className="logo">
            <Typography variant="h6" className={classes.title}>
              TODO App
            </Typography>
          </div>

          <div /*className="marginleft"*/>
            <ul className="flexContainer">
              {
                !user ?
              
                <React.Fragment>
                  <li className="hoverEffect">
                    <Link to="/Login">
                      <Button
                        onClick={() => {
                          history.push("/Home");
                        }}
                        color="inherit"
                      >
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li className="hoverEffect">
                    <Link to="/SignUp">
                      <Button
                        onClick={() => {
                          history.push("/");
                        }}
                        color="inherit"
                      >
                        SignUp
                      </Button>
                    </Link>
                  </li>
                </React.Fragment>
              
              :
              
                <React.Fragment>
                  <div className="marginleft">
                    <li className="hoverEffect">
                      <Link to="/Home">
                        <Button color="inherit">Home</Button>
                      </Link>
                    </li>
                    <li className="hoverEffect">
                      <Link to="/LogOut">
                        <Button
                          color="inherit"
                          onClick={() => {
                            auth.signOut();
                            history.push("/LogIn");
                          }}
                        >
                          LogOut
                        </Button>
                      </Link>
                    </li>
                  </div>
                </React.Fragment>
              }
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;

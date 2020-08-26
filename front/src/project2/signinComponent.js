import React from "react";
import { CardMedia, CardHeader } from "@material-ui/core";

const SignInComponent = () => {
  return (
    <CardMedia style={{ textAlign: "center", paddingTop: "3vh" }}>
      <img src="./chat.png" alt="chat" height="50"></img>
      <CardHeader
        title="Sign in"
        color="inherit"
        style={{ textAlign: "center", paddingTop: "1vh" }}
      />
    </CardMedia>
  );
};
export default SignInComponent;

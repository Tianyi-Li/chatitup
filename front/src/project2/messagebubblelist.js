import React from "react";
import { List } from "@material-ui/core";
import MessageBubble from "./messagebubble";

const MessageBubbleList = (props) => {
  let messages = props.messages.map((message, idx) => {
    return <MessageBubble key={idx} message={message} />;
  });

  return <List>{messages}</List>;
};

export default MessageBubbleList;

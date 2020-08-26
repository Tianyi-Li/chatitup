import React, { useEffect, useRef } from "react";
import { ListItem } from "@material-ui/core";
import BubbleOther from "./bubbleother";
import BubbleMe from "./bubbleme";
import Triangle from "./triangle";

const MessageBubble = (props) => {
  const messageRef = useRef(null);
  useEffect(() => {
    messageRef.current.scrollIntoView(true);
  }, []);
  return (
    <div>
      <ListItem
        ref={messageRef}
        style={{ textAlign: "left", marginBottom: "5px" }}
      >
        {props.message.isMe && <BubbleMe msg={props.message}/>}
        {!props.message.isMe && <BubbleOther msg={props.message} />}
        <Triangle msg={props.message} alignTriangle={props.message.right} />
      </ListItem>
    </div>
  );
};
export default MessageBubble;

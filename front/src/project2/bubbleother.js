import React from "react";
import "./App.css";

const BubbleOther = (props) => {
  let msg = props.msg;
  return (
    <div className="messageBubble" style={{ backgroundColor: msg.colour }}>
      <span style={{ fontSize: "smaller" }}>{msg.from} says:</span>
      <span style={{ float: "right" }}>Room:{msg.roomName}</span>
      <br />
      <span style={{ float: "right" }}>@:{msg.time}</span>
      <br />
      <p></p>
      <span>{msg.text}</span>
    </div>
  );
};
export default BubbleOther;

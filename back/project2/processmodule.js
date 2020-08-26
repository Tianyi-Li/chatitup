// random colour generator from material design colour file
const matColours = require("./matdes100colours.json");
const moment = require("moment");

let coloridx = "";
useNames = [];
preRoom = ["main"];

const processing = async socket => {
  console.log("new connection established");

  socket.emit("previousroom",{preroom: preRoom});

  // client has joined
  socket.on("join", client => {
    socket.name = client.chatName;
    if (useNames.some(e => e.chatName === client.chatName)) {
      socket.emit("nameexists", {
        text: `${client.chatName} already exsit. try a different name`
      });
    } else {
      if(!preRoom.includes(client.roomName)){
        preRoom.push(client.roomName);
      }
      
      coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
      // add chatName to useNames array
      useNames.push({chatName:client.chatName, colour:coloridx, chatRoom: client.roomName});
      // use the room property to create a room
      socket.join(client.roomName);
      socket.emit("welcome", {
        text: `welcome ${client.chatName}`,
        colour: "#0d47a1",
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        roomName: client.roomName
      });
      socket.to(client.roomName).emit("someonejoined", {
        text: `${client.chatName} has joined ${client.roomName} room!`,
        colour: "#0d47a1",
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        roomName: client.roomName
      });

      // scenario 2 - client disconnects from server
      socket.on("disconnect", async () => {
        console.log(`${client.chatName}left`);
        socket.to(client.roomName).emit("someoneleft", {
          text: `${client.chatName} has left room ${client.roomName}`,
          colour: "#0d47a1",
          from: "Admin",
          time: moment().format("h:mm:ss a"),
          roomName: client.roomName
        });
        
        // remove the left user
        useNames.splice(useNames.indexOf(useNames.find( x => x.chatName == client.chatName)),1);
        // update other users in the same room after someone left
        let currentUsers= useNames.filter(e => e.chatRoom === client.roomName);
        
        socket.to(client.roomName).emit("roomusers", {roomUsers: currentUsers});
      });

      // scenario 3
      socket.on("typing", async clientData => {
        socket.to(client.roomName).emit("someoneistyping", { text: `${client.chatName} is typing`, from: clientData.from});
      });

      // scenario 4
      socket.on("message", async clientTypingMsg => {
        var element = useNames.find(e => e.chatName === clientTypingMsg.from);

        socket.emit("newmessage", {
          isMe: true,
          right: 80,
          text: clientTypingMsg.text,
          from: clientTypingMsg.from,
          colour: matColours.colours[element.colour],
          time: moment().format("h:mm:ss a"),
          roomName: client.roomName
        });

        socket.to(client.roomName).emit("newmessage", {
          text: clientTypingMsg.text,
          from: clientTypingMsg.from,
          colour: matColours.colours[element.colour],
          time: moment().format("h:mm:ss a"),
          roomName: client.roomName
        });
      });

       currentUsers= useNames.filter(e => e.chatRoom === client.roomName);
        socket.emit("roomusers", {roomUsers: currentUsers});
        socket.to(client.roomName).emit("roomusers", {roomUsers: currentUsers});
    } // end else
  });
};

module.exports = {
  processing
};

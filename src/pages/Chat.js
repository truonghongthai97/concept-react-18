import { useEffect, useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import socket from "../services/socket";

const rooms = [{ name: "Room 1" }];

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("socket", socket);
    if (!isConnected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("connect - socket.id:", socket.id);
      setIsConnected(true);
    });

    socket.on("broadcastNewMessage", (mess) => {
      console.log(111, messages);
      console.log(22, [...messages, mess]);
      setMessages((prevMessages) => [...prevMessages, mess]);
    });

    socket.on("disconnect", () => {
      socket.connect();
      console.log("socket disconnect");
    });

    return () => {
      socket.off("connect");
      socket.off("broadcastNewMessage");
      //   socket.disconnect();
    };
  }, []);

  const emitEvent = () => {
    try {
      socket.emit("chat", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    } catch (error) {
      console.log(111, error);
    }
  };

  return (
    <div>
      <Box boxShadow="xs" p={4} m={2}>
        <Box boxShadow="xs" p={3} mb={3}>
          <div>Connection Status: {isConnected.toString()}</div>
          <div>Rooms</div>

          {rooms.map((room, index) => (
            <div key={index}>- {room.name}</div>
          ))}
        </Box>

        <Box boxShadow="xs" p={3}>
          <ul>
            {messages.map((mess, index) => (
              <li key={index}>{mess}</li>
            ))}
          </ul>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mb={2}
          />
          <Button colorScheme="teal" onClick={emitEvent}>
            Send
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;

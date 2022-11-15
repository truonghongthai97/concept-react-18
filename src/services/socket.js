import { io } from "socket.io-client";

const socket = io("http://localhost:8080/", {
  autoConnect: false,
  auth: {
    token: "auth_token",
  },
});

export default socket;

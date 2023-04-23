import React from "react";
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = socketio.connect("http://localhost:4000", {
  autoConnect: false, // don't connect automatically
  transports: ['websocket'], // only use websockets (no polling)
});
export const SocketContext = React.createContext();
import React from "react";
import socketio from "socket.io-client";
import { base_url } from "../config";

export const socket = socketio.connect(base_url, {
  autoConnect: false, // don't connect automatically
  transports: ['websocket'], // only use websockets (no polling)
});
export const SocketContext = React.createContext();
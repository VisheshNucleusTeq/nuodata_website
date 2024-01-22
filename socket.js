import { io } from "socket.io-client";

export const socket = io("https://api.dev.nuodata.io", {
  secure: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
  upgrade: false,
  reconnection: true,
  path: "/socket.io/",
});

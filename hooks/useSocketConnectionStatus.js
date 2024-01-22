import React, { useEffect, useState } from "react";
import { socket } from "../socket";

const useSocketConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    !isConnected && socket.connect();
  }, [socket, isConnected]);

  useEffect(() => {
    socket.on("connect", (data) => {
      console.log('Connected to server');
      setIsConnected(true);
    });
  }, [socket]);

  return { isConnected, socket };
};

export default useSocketConnectionStatus;

import React, { useEffect, useState } from "react";
import { socket } from "../socket";

const useSocketConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    // useSocket();
    // if (!isConnected) {
    // console.log("not connetced")
    socket.connect();
    // }else{
    // console.log("connected!! ");
    socket.emit("request_random_number", "Hello,Server!", "testnew");

    // }
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket, isConnected]);
  useEffect(() => {
    socket.on("connect", (data) => {
      console.log("value", data);
      setIsConnected(true);
    });
    socket.on("requestRandomNumber", (data) => {
      console.log("data", data);
    });
    socket.on("randomNumber", (data) => {
      console.log("data", data);
    });
    // return () => {
    //   setIsConnected(false);
    // };
  }, [socket]);

  return isConnected;
};

export default useSocketConnectionStatus;

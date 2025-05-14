import { CONFIG } from "@/config-global";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(CONFIG.socketServerUrl);
    newSocket.on("connect", () => {
      console.log("✅ Socket connection successful!");
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌Socket connection failed:", error.message);
    });

    setSocket(newSocket);
    return () => {
      console.log("🔌 ❌Socket disconnected!");
      newSocket.disconnect();
    };
  }, []);
  return socket;
};

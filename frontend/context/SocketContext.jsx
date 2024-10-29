import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atom/userAtom";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (user?._id) {
            const newSocket = io("http://localhost:5000", {
                query: {
                    userId: user._id,
                },
            });

            setSocket(newSocket);

            // Set up event listeners
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Handle connection error or disconnection
            newSocket.on("connect_error", (err) => {
                console.error("Socket connection error:", err);
            });

            // Cleanup when component unmounts or user changes
            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

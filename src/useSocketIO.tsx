import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


export default function useSocketIO(url: string,
    registerInterestsHandler: (socket: Socket) => void,
    cleanupSpecial: (socket: Socket) => void) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket: Socket = io(url);
        setSocket(newSocket);
        console.log("connected socket")

        registerInterestsHandler(newSocket);
        console.log("registering interest in some events")

        function cleanup() {
            cleanupSpecial(newSocket)
            newSocket.disconnect();
            console.log("De-registered listeners and disconnected socket.")
        }

        return cleanup;
    }, []);
    return socket;
}

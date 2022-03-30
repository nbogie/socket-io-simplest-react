import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client';

export default function DemoSendingOnly() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {

        //Use your OWN sketch id here...    
        const newSocket = io('https://openprocessing.org:30000/?sketch=1530627');
        setSocket(newSocket);

        function cleanup() {
            if (newSocket) {
                newSocket.disconnect();
                console.log("disconnected socket")
            }
        }
        return cleanup;
    }, []);

    function sendRed() {
        if (socket) { socket.emit("red"); }
    }
    function sendOrange() {
        if (socket) { socket.emit("orange"); }
    }
    function sendAddEnemy() {
        if (socket) { socket.emit("add_enemy"); }
    }

    return (
        <div className="Demo">
            <h2>Demo of Send only</h2>

            <button onClick={sendRed}>Send Red</button>
            <button onClick={sendOrange}>Send Orange</button>
            <button onClick={sendAddEnemy}>Send 'add_enemy'</button>
        </div>
    )
}

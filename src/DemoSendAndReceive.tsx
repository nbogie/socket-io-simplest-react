import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client';

interface Position {
    x: number;
    y: number;
}
export default function DemoSendAndReceive() {
    const [socket, setSocket] = useState<Socket | null>(null);

    //Maintain received data in state
    const [mousePos, setMousePos] = useState<Position | null>(null);
    const [keyPresses, setKeyPresses] = useState<string[]>([])

    function handleReceivedMouseClick(pos: Position) {
        setMousePos(pos);
    }

    function handleReceivedKeyPress(key: string) {
        setKeyPresses(prev => [key, ...prev].slice(0, 10));
    }

    useEffect(() => {
        //Use your OWN sketch id here...
        const newSocket = io('https://openprocessing.org:30000/?sketch=1530627');
        setSocket(newSocket);
        console.log("connected socket")

        newSocket.on("user_joined", (name: string) => { console.log("user joined!", name) });
        newSocket.on("mouse_click", handleReceivedMouseClick);
        newSocket.on("key_press", handleReceivedKeyPress);
        console.log("registering interest in some events")

        function cleanup() {
            newSocket.off("user_joined");
            newSocket.off("mouse_click");
            newSocket.off("key_press");
            newSocket.disconnect();
            console.log("De-registered listeners and disconnected socket.")
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

    return <div className="Demo">
        <h2>Demo of Send and Receive</h2>
        <button onClick={sendRed}>Send Red</button>
        <button onClick={sendOrange}>Send Orange</button>
        <button onClick={sendAddEnemy}>Send 'add_enemy'</button>

        <h3>Most recent mouse click position</h3>
        {mousePos ? <div>(x: {mousePos.x}, y: {mousePos.y})</div> : <div>None yet!</div>}
        <h3>Most recent key presses</h3>
        <ul>
            {keyPresses.map((str, ix) => <li key={ix}>{str}</li>)}...
        </ul>

    </div >
}

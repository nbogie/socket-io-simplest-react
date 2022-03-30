import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client';

let socket: Socket;

interface Position {
    x: number;
    y: number;
}
export default function DemoSendAndReceive() {
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
        //@ts-ignore
        socket = io.connect('https://openprocessing.org:30000/?sketch=1530627');
        console.log("connected socket")
        socket.on("user_joined", (name: string) => { console.log("user joined!", name) });
        socket.on("mouse_click", handleReceivedMouseClick);
        socket.on("key_press", handleReceivedKeyPress);

        function cleanup() {
            socket.disconnect();
            console.log("disconnected socket")
        }

        return cleanup;
    }, []);


    function sendRed() {
        socket.emit("red");
    }

    function sendOrange() {
        socket.emit("orange");
    }

    function sendAddEnemy() {
        socket.emit("add_enemy");
    }

    return <div className="Demo">
        <h2>Demo of Send and Receive</h2>
        <button onClick={sendRed}>Send Red</button>
        <button onClick={sendOrange}>Send Orange</button>
        <button onClick={sendAddEnemy}>Send 'add_enemy'</button>

        <div>Most recent mouse click position:
            {mousePos ? <div>(x: {mousePos.x}, y: {mousePos.y})</div> : <div>None yet!</div>}
        </div>
        <div>Most recent key presses:
            <ul>
                {keyPresses.map((str, ix) => <li key={ix}>{str}</li>)}
            </ul>
        </div>
    </div>
}

import React, { useState } from 'react'
import useSocketIO from './useSocketIO';

interface Position {
    x: number;
    y: number;
}
export default function DemoSendAndReceiveWithHook() {

    //Maintain received data in state
    const [mousePos, setMousePos] = useState<Position | null>(null);
    const [keyPresses, setKeyPresses] = useState<string[]>([])

    function handleReceivedMouseClick(pos: Position) {
        setMousePos(pos);
    }

    function handleReceivedKeyPress(key: string) {
        setKeyPresses(prev => [key, ...prev].slice(0, 10));
    }
    const socket = useSocketIO('https://openprocessing.org:30000/?sketch=1530627',
        (socket) => {
            socket.on("user_joined", (name: string) => { console.log("user joined!", name) });
            socket.on("mouse_click", handleReceivedMouseClick);
            socket.on("key_press", handleReceivedKeyPress);
        },
        (socket) => {
            socket.off("user_joined");
            socket.off("mouse_click");
            socket.off("key_press");
        });



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
        <h2>Demo of Send and Receive (with hook)</h2>
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

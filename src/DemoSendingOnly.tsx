import React, { useEffect } from 'react'
import io, { Socket } from 'socket.io-client';

let socket: Socket;


export default function DemoSendingOnly() {
    useEffect(() => {

        //Use your OWN sketch id here...    
        //@ts-ignore
        socket = io.connect('https://openprocessing.org:30000/?sketch=1530627');

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
        <h2>Demo of Send only</h2>

        <button onClick={sendRed}>Send Red</button>
        <button onClick={sendOrange}>Send Orange</button>
        <button onClick={sendAddEnemy}>Send 'add_enemy'</button>

    </div>
}

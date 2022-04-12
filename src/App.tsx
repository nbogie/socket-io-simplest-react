import React, { useState } from 'react';
import './App.css';
import DemoSendAndReceive from './DemoSendAndReceive';
import DemoSendAndReceiveWithHook from './DemoSendAndReceiveWithHook';
import DemoSendingOnly from './DemoSendingOnly';

function App() {
  type DemoType = "send_only" | "send_and_receive" | "send_and_receive_with_hook";

  const [chosenDemo, setChosenDemo] = useState<DemoType>("send_only");

  return (
    <div className="App">
      <h1>React simplest socket.io demos</h1>
      {chosenDemo === "send_only" ? <DemoSendingOnly /> : chosenDemo === "send_and_receive" ? <DemoSendAndReceive /> : <DemoSendAndReceiveWithHook />}

      <footer>
        <h4>Select a demo</h4>
        <button onClick={() => setChosenDemo("send_only")}>Send Only</button>
        <button onClick={() => setChosenDemo("send_and_receive")}>Send and receive</button>
        <button onClick={() => setChosenDemo("send_and_receive_with_hook")}>Send and receive with custom hook</button>
        <hr />
        <a href="https://openprocessing.org/sketch/1530627">Accompanying p5.js sketch: https://openprocessing.org/sketch/1530627</a>
      </footer>
    </div>
  );
}

export default App;

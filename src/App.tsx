import React, { useState } from 'react';
import './App.css';
import DemoSendAndReceive from './DemoSendAndReceive';
import DemoSendingOnly from './DemoSendingOnly';

function App() {
  type DemoType = "send_only" | "send_and_receive";

  const [chosenDemo, setChosenDemo] = useState<DemoType>("send_only");

  return (
    <div className="App">
      <h1>React simplest socket.io demos</h1>
      {chosenDemo === "send_only" ? <DemoSendingOnly /> : <DemoSendAndReceive />}

      <footer>
        <h4>Select a demo</h4>
        <button onClick={() => setChosenDemo("send_only")}>Send Only</button>
        <button onClick={() => setChosenDemo("send_and_receive")}>Send and receive</button>
      </footer>
    </div>
  );
}

export default App;

import React from "react";
import Key1 from "./components/Key1";
import Key2 from "./components/Key2";
import { useFinalistsStore } from "./zustand/store";

const App = () => {
  const winner = useFinalistsStore((state) => state.winner);
  return (
    <div className="screen">
      <Key1 />
      <div className="champion-container">
        {winner?.team && (
          <div className="champion-team">
            <h1 className="winner-title">WINNER</h1>
            <img src={winner.teamFlag} alt="" className="champion-flag" />
            <strong className="champion-name">{winner.team}</strong>
          </div>
        )}
      </div>
      <Key2 />
    </div>
  );
};

export default App;

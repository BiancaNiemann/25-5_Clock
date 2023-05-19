import React from "react";

export default function StartRestButtons({startStop, startOrStop, resetTimers}){
 
    return(
        <div className="start-restart">
        <button
        className="large-button"
          id="start_stop"
          onClick={() => startStop()}
        >
          {!startOrStop ? "Start" : "Stop"}
        </button>
        <button
        className="large-button"
          id="reset"
          onClick={() => resetTimers()}
        >
          Reset
        </button>
      </div>
    )
}
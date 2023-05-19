import React from "react";

export default function LengthSelectors({sessionLengthTime, breakLengthTime, breakLength, sessionLength}){
    return(
        <div className="lengths">
          <div className="break-session">
            <div id="break-label" className="title">Break Length</div>
            <button
              id="break-decrement"
              onClick={() => breakLengthTime('-')}
            >
              <i className="fa-solid fa-circle-arrow-down fa-2xl"></i>
            </button>
            <div id="break-length">{breakLength}</div>
            <button
              id="break-increment"
              onClick={() => breakLengthTime('+')}
            >
              <i className="fa-solid fa-circle-arrow-up fa-2xl"></i>
            </button>

          </div>

          <div className="break-session">
            <div id="session-label" className="title">Session Length</div>
            <button
              id="session-decrement"
              onClick={() => sessionLengthTime('-')}
            >
              <i className="fa-solid fa-circle-arrow-down fa-2xl"></i>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button
              id="session-increment"
              onClick={() => sessionLengthTime('+')}
            >
              <i className="fa-solid fa-circle-arrow-up fa-2xl"></i>
            </button>
          </div>
        </div>
    )
}
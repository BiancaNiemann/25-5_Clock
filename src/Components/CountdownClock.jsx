import React from "react";

export default function CountdownClock({minutes, seconds, sessionOrBreak}) {
    return(
        <>
            <div id="timer-label" className="title">{!sessionOrBreak ? "Break" : "Session"}</div>
            <div id="time-left">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
        </>
    )

}
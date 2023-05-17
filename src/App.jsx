import React, { useState, useEffect } from "react";

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [onBreak, setOnBreak] = useState(false)
  const [sessionOrBreak, setSessionOrBreak] = useState(true)
  const [startOrStop, setStartOrStop] = useState(false)
  const [beep, setBeep] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setBeep(false)
        //seconds drop to nil, resets to 60 seconds and the subtracts on every second
        if (seconds === 0) {
          setSeconds(60)
          setSeconds(prevSeconds => prevSeconds - 1)
          //if seconds = nil and minutes are greater then nil then subtract one from minutes
          if (minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1)
          //if seconds = nil
          } else if (seconds === 0 && minutes === 0 ) {
            setBeep(true)
            setMinutes(0)
            setSeconds(0)
            setIsRunning(false)
            setOnBreak(true)
            setSessionOrBreak(false)
            setMinutes(breakLength)
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }
      } else if (onBreak) {
        setBeep(false)
        if (seconds === 0) {
          setSeconds(60)
          setSeconds(prevSeconds => prevSeconds - 1)
          if (minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1)
          } else {
            setBeep(true)
            setMinutes(0)
            setSeconds(0)
            setIsRunning(true)
            setOnBreak(false)
            setSessionOrBreak(true)
            setMinutes(sessionLength)
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds, onBreak]);

  function resetTimers() {
    setMinutes(25)
    setSeconds(0)
    setBreakLength(5)
    setSessionLength(25)
    setIsRunning(false)
    setOnBreak(false)
    setSessionOrBreak(true)
    setStartOrStop(false)
  }

  function breakLengthTime(e) {
    if (e === '-' && !isRunning) {
      if (breakLength > 1) {
        setBreakLength(prevBreak => prevBreak - 1)
      }
    } else if (e === '+' && !isRunning) {
      if (breakLength < 60) {
        setBreakLength(prevBreak => prevBreak + 1)
      }
    }
  }

  function sessionLengthTime(e) {
    if (e === '-') {
      if (sessionLength > 1 && !isRunning && !onBreak) {
        setSessionLength(prevSession => prevSession - 1)
        setMinutes(prevMinutes => prevMinutes - 1)
      }
    } else if (e === '+') {
      if (sessionLength < 60 && !isRunning) {
        setSessionLength(prevSession => prevSession + 1)
        setMinutes(prevMinutes => prevMinutes + 1)
      }
    }
  }

  function startStop() {
    if(sessionOrBreak){
      setIsRunning(prevIsRunning => !prevIsRunning)
    } else if(!sessionOrBreak){
      setOnBreak(prevOnBreak => !prevOnBreak)
    }

    setStartOrStop(prevStartOrStop => !prevStartOrStop)
  }


  return (
    <div>
      <div id="break-label">Break Length</div>
      <button
        id="break-decrement"
        onClick={() => breakLengthTime('-')}
      >
        Down
      </button>
      <div id="break-length">{breakLength}</div>
      <button
        id="break-increment"
        onClick={() => breakLengthTime('+')}
      >
        Up
      </button>

      <div id="session-label">Session Length</div>
      <button
        id="session-decrement"
        onClick={() => sessionLengthTime('-')}
      >
        down
      </button>
      <div id="session-length">{sessionLength}</div>
      <button
        id="session-increment"
        onClick={() => sessionLengthTime('+')}
      >
        Up
      </button>

      <div id="timer-label">{!sessionOrBreak ? "Break" : "Session"}</div>
      <div id="time-left">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

      <button
        id="start_stop"
        onClick={() => startStop()}
      >
        {!startOrStop  ? "Start" : "Stop"}
      </button>
      <button
        id="reset"
        onClick={() => resetTimers()}
      >
        Reset
      </button>

    </div>
  )
}

export default App
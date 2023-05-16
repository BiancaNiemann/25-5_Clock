import React, {useState, useEffect} from "react";

function App(){

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [onBreak, setOnBreak] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(isRunning){
        if(seconds === 0){
          setSeconds(60)
          setSeconds(prevSeconds => prevSeconds - 1)
          if(minutes > 0){
            setMinutes(prevMinutes => prevMinutes - 1)
          } else {
            setMinutes(0)
            setSeconds(0)
            //setIsRunning(false)
            setOnBreak(true)
            setMinutes(breakLength)

          }         
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }
      }
      //
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  function resetTimers(){
    setMinutes(25)
    setSeconds(0)
    setBreakLength(5)
    setSessionLength(25)
    setIsRunning(false)
    setOnBreak(false)
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
      if (sessionLength > 1 && !isRunning) {
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

  function startStop(){
    setIsRunning(prevIsRunning => !prevIsRunning)
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

      <div id="timer-label">{onBreak ? "Break" : "Session"}</div>
      <div id="time-left">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

      <button
        id="start_stop"
        onClick={()=> startStop()}
      >
        {!isRunning ? "Start" : "Stop"}
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
import React, { useState, useEffect, useRef } from "react";
import StartRestButtons from "./Components/StartResetButtons";
import CountdownClock from "./Components/CountdownClock";
import LengthSelectors from "./Components/LengthSelectors";
import SoundEffect from "./Components/SoundEffect";

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [onBreak, setOnBreak] = useState(false)
  const [sessionOrBreak, setSessionOrBreak] = useState(true)
  const [startOrStop, setStartOrStop] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (seconds === 0) {
          setSeconds(60)
          setSeconds(prevSeconds => prevSeconds - 1)
          if (minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1)
          } else if (seconds === 0 && minutes === 0) {
            audioRef.current.play()
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
        if (seconds === 0) {
          setSeconds(60)
          setSeconds(prevSeconds => prevSeconds - 1)
          if (minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1)
          } else {
            audioRef.current.play()
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
    audioRef.current.load()
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
      if (!isRunning && !onBreak) {
        setSessionLength(prevSession => prevSession > 1 ? prevSession - 1 : 1)
        setMinutes(prevMinutes => prevMinutes > 1 ? prevMinutes - 1 : 1)
      }
    } else if (e === '+') {
      if (!isRunning && !onBreak) {
        setSessionLength(prevSession => prevSession < 60 ? prevSession + 1 : 60)
        setMinutes(prevMinutes => prevMinutes < 60 ? prevMinutes + 1 : 60)
      }
    }
  }

  function startStop() {
    if (sessionOrBreak) {
      setIsRunning(prevIsRunning => !prevIsRunning)
    } else if (!sessionOrBreak) {
      setOnBreak(prevOnBreak => !prevOnBreak)
    }

    setStartOrStop(prevStartOrStop => !prevStartOrStop)
  }


  return (
    <div className="body">
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <LengthSelectors sessionLengthTime={sessionLengthTime} breakLengthTime={breakLengthTime} breakLength={breakLength} sessionLength={sessionLength} />
        <div className="session-info">
          <CountdownClock minutes={minutes} seconds={seconds} sessionOrBreak={sessionOrBreak} />
          <StartRestButtons startStop={startStop} startOrStop={startOrStop} resetTimers={resetTimers} />
        </div>
        <SoundEffect audioRef={audioRef} />
      </div>
    </div>
  )
}

export default App
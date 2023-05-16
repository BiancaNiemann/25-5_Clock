import { useState } from 'react'
import { useTimer } from 'react-timer-hook'

function MyTimer({expiryTimestamp}){
  const {seconds, minutes, restart, isRunning, start, pause} = useTimer({expiryTimestamp, autoStart:false , onExpire: ()=> console.warn('onExpire classed')})

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  

  function resetTimers(){
    const time = new Date()
    time.setSeconds(time.getSeconds() + 1500)
    restart(time)
    setBreakLength(5)
    setSessionLength(25)
  }

  function breakLengthTime(e) {
    if (e === '-') {
      if (breakLength > 1) {
        setBreakLength(prevBreak => prevBreak - 1)
      }
    } else if (e === '+') {
      if (breakLength < 60) {
      setBreakLength(prevBreak => prevBreak + 1)
      }
    }
  }

  function sessionLengthTime(e) {
    if (e === '-') {
      if (sessionLength > 1) {
        setSessionLength(prevSession => prevSession - 1)
      }
    } else if (e === '+') {
      if (sessionLength < 60) {
      setSessionLength(prevSession => prevSession + 1)
      }
    }
  }

  return(
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

      <div id="timer-label">Session</div>
      <div id="time-left">{minutes < 10 ? `0${minutes}` :minutes }:{seconds < 10 ? `0${seconds}` :seconds}</div>

      {isRunning && <button
        id="start_stop"
        onClick={pause}
      >
        Stop
      </button>
      }
      {!isRunning && <button
        id="start_stop"
        onClick={start}
      >
        Start
      </button>}
      <button
        id="reset"
        onClick={() => resetTimers()}
      >
        Reset
      </button>
      
    </div>
  )
}

function App() {

    const time = new Date()
    time.setSeconds(time.getSeconds()+1500)

  return (
    <>
      <MyTimer expiryTimestamp={time} />
    </>
  )
}

export default App



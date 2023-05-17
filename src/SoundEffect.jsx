import React, {useRef} from "react";

export default function SoundEffect(props){

    const audioRef = useRef(null)
console.log(props.audioRef)
    if(props.audioRef){
        audioRef.current.play()
    }

    if(props.reset & !props.audioRef){
        audioRef.current.load()
    }

    return (
        <div>
<audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" ref={audioRef}></audio>
<h1>test</h1>
        </div>
        
    )
}


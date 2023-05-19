import React from "react";

export default function SoundEffect({audioRef }) {

    return (
        <div>
            <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" ref={audioRef}></audio>
            <h1>test</h1>
        </div>

    )
}


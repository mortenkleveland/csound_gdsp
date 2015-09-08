instr 1

Sfile = "./local/soundfile"
kAmp chnget "targetSoundAmplitude"
aDry diskin2 Sfile, 1, 0, 1
aDry *= kAmp
aDry *= 0.4
chnset aDry, "reverbLTarget"
chnset aDry, "reverbRTarget"

endin
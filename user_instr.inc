instr 2

Sfile = "./local/soundfile"
kParam1 chnget "param1" 
kParam2 chnget "param2"
kAmp chnget "userSoundAmplitude"
aDry diskin2 Sfile, 1, 0, 1
aDry *= kAmp
aDry *= 0.4

outs aDry, aDry
chnset aDry * sqrt(kParam1), "reverbL"
chnset aDry * sqrt(kParam1), "reverbR"
chnset aDry * sqrt(1 - kParam1), "masterL"
chnset aDry * sqrt(1 - kParam1), "masterR"

endin
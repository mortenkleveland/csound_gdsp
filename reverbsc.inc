instr 90

aL chnget "reverbL"
aR chnget "reverbR"
kParam1 chnget "param1"
kParam2 chnget "param2"
kParam3 chnget "param3"

; Predelay
kParam3 *= 0.001

aDummyL delayr 2
aDelayedL deltapi kParam3
delayw aL

aDummyR delayr 2
aDelayedR deltapi kParam3
delayw aR

aWetL, aWetR reverbsc aDelayedL, aDelayedR, kParam1, kParam2
chnmix aWetL, "masterL"
chnmix aWetR, "masterR"
chnclear "reverbL"
chnclear "reverbR"

endin
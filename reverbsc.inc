/* reverbsc.inc */

aL chnget "reverbL"
aR chnget "reverbR"
kParam1 chnget "param1"
kParam2 chnget "param2"
aWetL, aWetR reverbsc aL, aR, kParam1, kParam2
chnmix aWetL, "masterL"
chnmix aWetR, "masterR"
chnclear "reverbL"
chnclear "reverbR"

/* reverbsc.inc */
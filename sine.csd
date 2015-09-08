<CsoundSynthesizer>
<CsOptions>
-odac -W -d
</CsOptions>
<CsInstruments>
sr     = 44100
ksmps  = 100
nchnls = 2
0dbfs = 1

; Instr 1
#include "target_instr.inc"

; Instr 2
#include "user_instr.inc"

; Target effects
instr 10
aDryL chnget "reverbLTarget"
aDryR chnget "reverbRTarget"
kParam1 = 0.6
kParam2 = 3000
kParam3 = 50 ; ms

; Predelay
kParam3 *= 0.001

aDummyL delayr 2
aDelayedL deltapi kParam3
delayw aDryL

aDummyR delayr 2
aDelayedR deltapi kParam3
delayw aDryR

aWetL, aWetR reverbsc aDelayedL, aDelayedR, kParam1, kParam2
chnmix aDryL * sqrt(1 - kParam1), "masterL"
chnmix aDryR * sqrt(1 - kParam1), "masterR"
chnmix aWetL * sqrt(kParam1), "masterL"
chnmix aWetR * sqrt(kParam1), "masterR"
chnclear "reverbLTarget"
chnclear "reverbRTarget"
endin

; User effects
#include "reverbsc.inc"

instr 99
    aL chnget "masterL"
    aR chnget "masterR"
    outs aL, aR
    chnclear "masterL"
    chnclear "masterR"
endin

</CsInstruments>
<CsScore>
i10 0 	9999999
i90 0 	9999999
i99 0 	9999999
</CsScore>
</CsoundSynthesizer>

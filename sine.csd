<CsoundSynthesizer>
<CsOptions>
-odac -W -d
</CsOptions>
<CsInstruments>
sr     = 44100
ksmps  = 100
nchnls = 2
0dbfs = 1

instr 1 ;Simple sine at 440Hz
a1	oscili 0.5,440, -1
outs a1, a1
endin

</CsInstruments>
<CsScore>
i1 0 30
</CsScore>
</CsoundSynthesizer>

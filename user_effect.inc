instr 90

	aDryL chnget "reverbL"
	aDryR chnget "reverbR"
	kParam1 chnget "param1"
	kParam2 chnget "param2"
	kParam3 chnget "param3"
	kParam4 chnget "param4" ; Mix

	; Predelay
	kParam3 *= 0.001

	aDummyL delayr 2
	aDelayedL deltapi kParam3
	delayw aDryL

	aDummyR delayr 2
	aDelayedR deltapi kParam3
	delayw aDryR

	aWetL, aWetR reverbsc aDelayedL, aDelayedR, kParam1, kParam2

	chnmix aDryL * sqrt(1 - kParam4), "masterL"
	chnmix aDryR * sqrt(1 - kParam4), "masterR"
	chnmix aWetL * sqrt(kParam4), "masterL"
	chnmix aWetR * sqrt(kParam4), "masterR"
	chnclear "reverbL"
	chnclear "reverbR"

endin
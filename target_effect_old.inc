instr 10

	aDryL chnget "target_effect_left"
	aDryR chnget "target_effect_right"
	kParam1 = 0.9
	kParam2 = 3000
	kParam3 = 100 ; ms
	kParam4 = 0.5 ; mix

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
	chnclear "target_effect_left"
	chnclear "target_effect_right"

endin
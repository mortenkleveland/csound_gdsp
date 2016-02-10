instr 1

	Sfile = "./local/soundfile"
	iNumChannels filenchnls Sfile
	kAmp chnget "targetAmplitude"
	aDry diskin2 Sfile, 1, 0, 1
	aDry *= kAmp
	aDry *= 0.4

	chnset aDryL, "target_effect_left"
	chnset aDryR, "target_effect_right"

endin
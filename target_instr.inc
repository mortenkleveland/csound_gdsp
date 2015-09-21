instr 1

	Sfile = "./local/soundfile"
	kAmp chnget "targetAmplitude"
	aDry diskin2 Sfile, 1, 0, 1
	aDry *= kAmp
	aDry *= 0.4

	chnset aDry, "target_effect_left"
	chnset aDry, "target_effect_right"

endin
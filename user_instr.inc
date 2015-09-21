instr 2

	Sfile = "./local/soundfile"
	kParam1 chnget "param1" 
	kParam2 chnget "param2"
	kAmp chnget "userAmplitude"
	aDry diskin2 Sfile, 1, 0, 1
	aDry *= kAmp
	aDry *= 0.4

	chnset aDry, "reverbL"
	chnset aDry, "reverbR"

endin
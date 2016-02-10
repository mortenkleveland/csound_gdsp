instr 2

	; File management
	Sfile = "./local/soundfile"
	iNumChannels filenchnls Sfile
	iAmplitudeScaling = 0.4

	prints "NUMBER OF CHANNELS: "
	print iNumChannels
	
	; Get potmeter value(s)
	kParam1 chnget "param1" 
	kParam2 chnget "param2"
	kAmp chnget "userAmplitude"

	if iNumChannels == 1 then
		aDryL diskin2 Sfile, 1, 0, 1
		aDryR = aDryL
	elseif iNumChannels == 2 then
		aDryL, aDryR diskin2 Sfile, 1, 0, 1
	endif
	
	aDryL *= kAmp
	aDryR *= kAmp
	aDryL *= iAmplitudeScaling
	aDryR *= iAmplitudeScaling	

	chnset aDryL, "reverbL"
	chnset aDryR, "reverbR"

endin
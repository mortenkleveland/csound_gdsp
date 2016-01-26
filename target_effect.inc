
instr  10 

	a1 chnget "target_effect_left"
	a2 chnget "target_effect_right"

;**************** effect: reverbsc ********************************
	kfblvl     	= 0.772482674384
	kfco     	= 4905.79466643
	kmix     	= 0.807089803209
; FDN reverb
	ar1,ar2 reverbsc a1, a2, kfblvl, kfco
	a1	= (ar1*kmix) + (a1*(1-kmix))
	a2	= (ar2*kmix) + (a2*(1-kmix))

	chnmix a1, "masterL"
	chnmix a2, "masterR"
	chnclear "target_effect_left"
	chnclear "target_effect_right"

endin 

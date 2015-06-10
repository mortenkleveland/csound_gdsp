function moduleDidLoad() {
    setDefaultValues();
    csound.Play();
    csound.CompileOrc(
        "instr 1 \n" + 
        "Sfile = \"./local/soundfile\"\n" +
        //"icps = 440 + rnd(440) \n" + 
        //"kPitch chnget \"pitch\" \n" +
        //"chnset icps, \"freq\" \n" + 
        "a1 diskin2 Sfile, 1, 0, 0\n" +
        //"a1 oscili 0.1, kcps\n" + 
        //"a2 diskin2 \"01.wav\", 1\n" +
        "outs a1, a1 \n" + 
        "endin");
}

function attachListeners() {
    document.getElementById("mess").addEventListener("click", Play);
    document.getElementById("openFileButton").addEventListener("change", handleFileSelect);
}

function handleMessage(message) {
    var mess = message.data;
    if (mess.slice(0, 11) == "::control::") {
        var messField = document.getElementById("console")
        messField.innerText = mess.slice(11);
    } else {
        var messField = document.getElementById("mess")
        messField.innerText += mess;
        csound.RequestChannel("freq");
    }
}

function setDefaultValues() {
    var initValue = 0.0;
    csound.SetChannel("freq", initValue);
}

function Play() {
    csound.Event("i1 0 5");
}

function handleFileSelect(evt) {
    var files = evt.target.files; 
    var f = files[0];
    var objectURL = window.URL.createObjectURL(f);
    playing = false;
    if(playing) {
        csound.Event("i-1 0 1");
        playing = false;   
    }
    csound.CopyUrlToLocal(objectURL, "soundfile");
    selected = true;
}
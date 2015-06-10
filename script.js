
function moduleDidLoad() {
    setDefaultValues();
    csound.Play();
    csound.CompileOrc(document.getElementById('orchestraField').value);
}

function attachListeners() {
    //document.getElementById("mess").addEventListener("click", play);
    document.getElementById("openFileButton").addEventListener("change", handleFileSelect);
    document.getElementById("playButton").addEventListener("click", play);
}

function handleMessage(message) {
    var mess = message.data;
    if (mess.slice(0, 11) == "::control::") {
    } else {
        csound.RequestChannel("freq");
    }
}

function setDefaultValues() {
    var initValue = 0.0;
    csound.SetChannel("freq", initValue);
}

function play() {
   csound.Event("i1 0 -1");
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
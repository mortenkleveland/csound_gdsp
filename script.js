function moduleDidLoad() {
    setDefaultValues();
    csound.Play();
    csound.CompileOrc(
    "instr 1 \n" +
    "icps = 440 \n" +
    "chnset icps, \"freq\" \n" +
    "a1 oscili 0.1, icps\n" +
    "outs a1, a1 \n" +
    "endin");   
    document.getElementById("tit").innerHTML = "Click on the page below to play";
}

function attachListeners() {
    document.getElementById("mess").addEventListener("click", Play);
}

function handleMessage(message) {
    var mess = message.data;
    if(mess.slice(0, 11) == "::control::") {
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
    csound.RequestChannel("lok");
    csound.SetChannel("freq", initValue);
}

function Play() {
    csound.Event("i1 0 5");
}
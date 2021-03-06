
isPlaying = false;

// WaveSurfer (Waveform GUI)
var wavesurfer = Object.create(WaveSurfer);
var userInstanceIsPlaying = false;
var lol = 1;
var audioBuffer = 0;
var audioContext;
var blob;

$(document).ready(function() {
    $('#body').show();
    try {
        // the AudioContext is the primary container for all audio  objects
        audioContext = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
});

function moduleDidLoad() {
    setDefaultValues();

    localStorage.clear();
    loadAudio("02.wav");

    // csound.CopyToLocal("01.wav", "soundfile");
    csound.CopyUrlToLocal("http://folk.ntnu.no/mortengk/csound/effects_combined.csd", "csd") 
    csound.PlayCsd('local/csd');

    // Visuals
    wavesurfer.init({
        container: document.querySelector('#waveform'),
        waveColor: '#00b2a9',
        progressColor: '#00b2a9'
    });
    wavesurfer.load("02.wav");
    wavesurfer.toggleMute();
}

function attachListeners() {
    document.getElementById("openFileButton").addEventListener("change", handleFileSelect);
    document.getElementById("playPauseButton").addEventListener("click", play);
    document.getElementById("switchInstanceButton").addEventListener("click", mute);
    // document.getElementById("drop", function(e) {
    //     handleFileSelect();
    // });
    $(document).keydown(function(e) { 
        if (e.keyCode == 32) {
            play();
        }
    });
    wavesurfer.on('finish', function() {
        wavesurfer.play(); // Looping
    });

    // var holder = document.getElementById('drop');
    // holder.ondragover = function () { this.className = 'hover'; return false; };
    // holder.ondragend = function () { this.className = ''; return false; };
    // holder.ondrop = function (e) {
    //     this.className = '';
    //     e.preventDefault();
    //     handleFileSelect(e);
    //     //readfiles(e.dataTransfer.files);
    // } 
}

 function handleMessage(message) {
  var mess = message.data;
  if(mess == "finished render"){
      ReadFile();
      return;
  } else if(mess == "Complete"){
      //saveFile();
      //scrollTo(0, messField.scrollHeight);
      return;
  }
   var messField = document.getElementById("mess")
   if(messField) {
        messField.innerText += mess;
        scrollTo(0, messField.scrollHeight);
    }
 }

function setDefaultValues() {
    csound.SetChannel("param1", 0.5);
    csound.SetChannel("param2", 5000);
    csound.SetChannel("param3", 10);
    csound.SetChannel("param4", 0.5);
    csound.SetChannel("targetAmplitude", 1.0);
    csound.SetChannel("userAmplitude", 0.0);
}

function play() {
    if (isPlaying) {
        csound.Event("i-1 0 -1");
        csound.Event("i-2 0 -1");
        wavesurfer.stop();
        document.getElementById("playPauseButton").src = "assets/play.png";
    } else {
        csound.Event("i1 0 -1");
        csound.Event("i2 0 -1");
        wavesurfer.play();
        document.getElementById("playPauseButton").src = "assets/pause.png";
    }
    isPlaying = !isPlaying
}

function mute() {
    if(userInstanceIsPlaying) {
        csound.SetChannel("targetAmplitude", 0.0);
        csound.SetChannel("userAmplitude", 1.0);
    } else {
        csound.SetChannel("targetAmplitude", 1.0);
        csound.SetChannel("userAmplitude", 0.0);
    }
    userInstanceIsPlaying = !userInstanceIsPlaying;
    console.log(userInstanceIsPlaying);
}

function handleFileSelect(evt) {
    var files = evt.target.files; 
    var f = files[0];
    var objectURL = window.URL.createObjectURL(f);
    csound.CopyUrlToLocal(objectURL, "soundfile");
    selected = true;
    wavesurfer.load(objectURL);
}

function loadAudio(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // When loaded decode the data and store the audio buffer in memory
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            audioBuffer = buffer;

            // Creating a blob to store binary audio data
            blob = new Blob([request.response], {type: "audio/wav"});
            var objectURL = window.URL.createObjectURL(blob);
            csound.CopyUrlToLocal(objectURL, "soundfile");

        }, onError);
    }
    request.send();
}

function onError(e) {
    console.log(e);
}

// GUI
$(function($) {
    $(".knob").knob({
        change : function (value) {
            if (this.$.attr('id') == "knob1") {
                csound.SetChannel("param1", value);
            } else if (this.$.attr('id') == "knob2") {
                csound.SetChannel("param2", value);
            } else if (this.$.attr('id') == "knob3") {
                csound.SetChannel("param3", value);
            } else if (this.$.attr('id') == "knob4") {
                csound.SetChannel("param4", value);
            }
        },
        release : function (value) {
        //console.log(this.$.attr('value'));
        console.log("release : " + value);
    },
    cancel : function () {
        console.log("cancel : ", this);
    },
    /*format : function (value) {
        return value + '%';
    },*/
    draw : function () {

        // "tron" case
        if(this.$.data('skin') == 'tron') {

            this.cursorExt = 0.3;

            var a = this.arc(this.cv), pa, r = 1;
                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

    var v, up = 0, down = 0, i = 0, $idir = $("div.idir"), $ival = $("div.ival"), incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }, decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
    $("input.infinite").knob({
        min: 0, max: 20, stopper: false, change: function () {
            if(v > this.cv) {
                if(up) {
                    decr();
                    up = 0;
                } else {
                    up = 1;
                    down = 0;
                }
            } else {
                if(v < this.cv) {
                    if(down) {
                        incr();
                        down = 0;
                    } else {
                        down = 1;
                        up = 0;
                    }
                }
            }
            v = this.cv;
        }
    });
});

// Dragging
$(function() {
    $('.sortable').sortable();
    $('.handles').sortable({
        handle: 'span'
    });
    $('.connected').sortable({
        connectWith: '.connected'
    });
    $('.exclude').sortable({
        items: ':not(.disabled)'
    });
});

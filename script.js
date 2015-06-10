
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

// GUI
$(function($) {
    $(".knob").knob({
        change : function (value) {
            csound.SetChannel("pitch", value);
            console.log("change : " + value);
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

            var a = this.arc(this.cv)  // Arc
                , pa                   // Previous arc
                , r = 1;

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
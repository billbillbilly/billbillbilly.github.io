// Add js here.
var vid = document.getElementById("videoplayer");
// set the preload property:
vid.preload = 'metadata';

// turn off autoplay
vid.autoplay = false;
console.log("autoplay has been suppressed");
// turn off loop
vid.loop = false;
console.log("loop has been suppressed");

// play video
document.getElementById("play").addEventListener("click", play_v);
function play_v() {
  vid.play();
}

// pause video
document.getElementById("pause").addEventListener("click", pause_v);
function pause_v() {
  vid.pause();
}

// slow down
document.getElementById("slower").addEventListener("click", slow_down);
function slow_down() {
  if (vid.playbackRate == .5) {
    alert("Video is at slowest speed!")
  }else {
    vid.playbackRate = vid.playbackRate - 0.5;
  }
}

// speed up
document.getElementById("faster").addEventListener("click", speed_up);
function speed_up() {
  if (vid.playbackRate == 2) {
    alert("Video is at fastest speed!")
  } else {
    vid.playbackRate = vid.playbackRate + 0.5;
  }
}

// skip ahead
// get video duration
var dua;
vid.onloadedmetadata = function() {
  dua = this.duration;
}

document.getElementById("skip").addEventListener("click", skip_ahead);
function skip_ahead() {
  if ((vid.currentTime + 15) <= dua) {
    vid.currentTime = vid.currentTime + 15;
  } else {
    vid.currentTime = 0;
  }
}

// mute
document.getElementById("mute").addEventListener("click", mute_video);
function mute_video() {
  if (vid.muted == false) {
    vid.muted = true;
    document.getElementById("mute").innerText = "Unmute";
  } else {
    vid.muted = false;
    document.getElementById("mute").innerText = "Mute";
  }
}

// volume slider
document.getElementById("slider").oninput = function() {
    update_vol();
};
function update_vol() {
  var vol = document.getElementById("slider").value;
  document.getElementById('volume').innerHTML = vol;
  vid.volume = vol/100;
}

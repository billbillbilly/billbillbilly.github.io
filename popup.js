
var modal = null;
var thisId = null;
var this_id = null;

function pop(item) {
  if(modal === null) {
    thisId = item.getAttribute("href");
    document.getElementById(thisId).style.display = "block";
    modal = true;
  } else {
    document.getElementById(thisId).style.display = "none";
    modal = null;
  }
}

function show_projName(item) {
  this_id = item.getAttribute("id");
  this_id = this_id + "t";
  document.getElementById(this_id).style.display = "block";
}

function hide_projName(item) {
  this_id = item.getAttribute("id");
  this_id = this_id + "t";
  document.getElementById(this_id).style.display = "none";
}

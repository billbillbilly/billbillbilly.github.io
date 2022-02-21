
var modal = null;
var thisId = null;

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

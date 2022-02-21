
var modal = null;

function pop(item) {
  if(modal === null) {
    var thisId = item.getAttribute("href");
    document.getElementById(thisId).style.display = "block";
    modal = true;
  } else {
    var thisId = item.getAttribute("href");
    alert(thisId);
    document.getElementById(thisId).style.display = "none";
    modal = null;
  }
}

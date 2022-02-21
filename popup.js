
var modal = null;

function getId(item) {
  return item.getAttribute("href");
}

function pop(item) {
  if(modal === null) {
    document.getElementById("box1").style.display = "block";
    modal = true;
  } else {
    document.getElementById("box1").style.display = "none";
    modal = null;
  }
  console.log(item.getAttribute("href"));
}

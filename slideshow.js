var slideID = null;
// showSlides(slideIndex);
var slideIndex = 1;

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function getSlideID(item) {
  slideID = item.getAttribute("id");
  if (slideID == "1") {
    slideID = 0;
  }else if (slideID == "2") {
    slideID = 3;
  }else if (slideID == "3") {
    slideID = 6;
  }else if (slideID == "4") {
    slideID = 9;
  }else if (slideID == "5") {
    slideID = 12;
  }else if (slideID == "6") {
    slideID = 15;
  }else if (slideID == "7") {
    slideID = 18;
  }else if (slideID == "8") {
    slideID = 21;
  }
  slideIndex = slideID+1;
  if (slideIndex == slideID+1) {
    showSlides(slideIndex);
  }
}

function showSlides(n) {
  var i;
  // get slides by id
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  // if (n < 1) {slideIndex = slides.length}
  for (i = slideID; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = slideID; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" act", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " act";
}

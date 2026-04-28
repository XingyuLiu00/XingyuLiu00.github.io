window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

document.addEventListener("DOMContentLoaded", function () {
  const samples = [
    {
      input: "./static/images/compare/input_01.png",
      output: "./static/images/compare/output_01.png"
    },
    {
      input: "./static/images/compare/input_02.png",
      output: "./static/images/compare/output_02.png"
    },
    {
      input: "./static/images/compare/input_03.png",
      output: "./static/images/compare/output_03.png"
    },
    {
      input: "./static/images/compare/input_04.png",
      output: "./static/images/compare/output_04.png"
    },
    // {
    //   input: "./static/images/compare/input_05.png",
    //   output: "./static/images/compare/output_05.png"
    // },
    // {
    //   input: "./static/images/compare/input_06.png",
    //   output: "./static/images/compare/output_06.png"
    // }
  ];

  const container = document.querySelector(".comparison-container");
  const beforeImage = document.getElementById("comparison-before");
  const afterImage = document.getElementById("comparison-after");
  const afterWrapper = container.querySelector(".comparison-after-wrapper");
  const sliderLine = container.querySelector(".comparison-slider-line");
  const sliderHandle = container.querySelector(".comparison-slider-handle");
  const prevButton = document.getElementById("comparison-prev");
  const nextButton = document.getElementById("comparison-next");
  const counter = document.getElementById("comparison-counter");

  let currentIndex = 0;
  let isDragging = false;

  function syncAfterImageWidth() {
    afterImage.style.width = `${container.offsetWidth}px`;
  }

  function resetSlider() {
    afterWrapper.style.width = "50%";
    sliderLine.style.left = "50%";
    sliderHandle.style.left = "50%";
  }

  function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${samples.length}`;
  }

  function showSample(index) {
    currentIndex = (index + samples.length) % samples.length;

    beforeImage.src = samples[currentIndex].input;
    afterImage.src = samples[currentIndex].output;

    beforeImage.onload = function () {
      syncAfterImageWidth();
      resetSlider();
    };

    afterImage.onload = function () {
      syncAfterImageWidth();
      resetSlider();
    };

    updateCounter();
  }

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    const percent = (offsetX / rect.width) * 100;

    afterWrapper.style.width = `${percent}%`;
    sliderLine.style.left = `${percent}%`;
    sliderHandle.style.left = `${percent}%`;
  }

  container.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener("mouseup", function () {
    isDragging = false;
  });

  container.addEventListener("touchstart", function (e) {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchend", function () {
    isDragging = false;
  });

  prevButton.addEventListener("click", function () {
    showSample(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    showSample(currentIndex + 1);
  });

  document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    showSample(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    showSample(currentIndex + 1);
  }
  });

  window.addEventListener("resize", function () {
    syncAfterImageWidth();
  });

  showSample(0);
});


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
      output: "./static/images/compare/input_01.png",
      input: "./static/images/compare/output_01.png"
    },
    {
      output: "./static/images/compare/input_02.png",
      input: "./static/images/compare/output_02.png"
    },
    {
      output: "./static/images/compare/input_03.png",
      input: "./static/images/compare/output_03.png"
    },
    {
      output: "./static/images/compare/input_04.png",
      input: "./static/images/compare/output_04.png"
    },
    {
      output: "./static/images/compare/input_05.png",
      input: "./static/images/compare/output_05.png"
    },
    {
      output: "./static/images/compare/input_06.png",
      input: "./static/images/compare/output_06.png"
    },
    {
      output: "./static/images/compare/input_07.png",
      input: "./static/images/compare/output_07.png"
    },
    {
      output: "./static/images/compare/input_08.png",
      input: "./static/images/compare/output_08.png"
    },
    {
      output: "./static/images/compare/input_09.png",
      input: "./static/images/compare/output_09.png"
    },
    {
      output: "./static/images/compare/input_10.png",
      input: "./static/images/compare/output_10.png"
    },
    {
      output: "./static/images/compare/input_11.png",
      input: "./static/images/compare/output_11.png"
    },
    {
      output: "./static/images/compare/input_12.png",
      input: "./static/images/compare/output_12.png"
    },
    {
      output: "./static/images/compare/input_13.png",
      input: "./static/images/compare/output_13.png"
    },
    {
      output: "./static/images/compare/input_14.png",
      input: "./static/images/compare/output_14.png"
    }

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



document.addEventListener("DOMContentLoaded", function () {

  const datasets = {
    train: [
      "./static/images/dataset/train_01.png",
      "./static/images/dataset/train_02.png",
      "./static/images/dataset/train_03.png",
      "./static/images/dataset/train_04.png",
      "./static/images/dataset/train_05.png",
      "./static/images/dataset/train_06.png",
      "./static/images/dataset/train_07.png",
      "./static/images/dataset/train_08.png",
      "./static/images/dataset/train_09.png",
      "./static/images/dataset/train_10.png",
      "./static/images/dataset/train_11.png",
      "./static/images/dataset/train_12.png",
      "./static/images/dataset/train_13.png",
      "./static/images/dataset/train_14.png",
      "./static/images/dataset/train_15.png",
      "./static/images/dataset/train_16.png"
    ],
    test: [
      "./static/images/dataset/test_01.png",
      "./static/images/dataset/test_02.png",
      "./static/images/dataset/test_03.png",
      "./static/images/dataset/test_04.png",
      "./static/images/dataset/test_05.png",
      "./static/images/dataset/test_06.png",
      "./static/images/dataset/test_07.png",
      "./static/images/dataset/test_08.png",
      "./static/images/dataset/test_09.png",
      "./static/images/dataset/test_10.png",
      "./static/images/dataset/test_11.png",
      "./static/images/dataset/test_12.png",
      "./static/images/dataset/test_13.png",
      "./static/images/dataset/test_14.png",
      "./static/images/dataset/test_15.png",
      "./static/images/dataset/test_16.png"
    ],
    wild: [
      "./static/images/dataset/wild_01.png",
      "./static/images/dataset/wild_02.png",
      "./static/images/dataset/wild_03.png",
      "./static/images/dataset/wild_04.png",
      "./static/images/dataset/wild_05.png",
      "./static/images/dataset/wild_06.png",
      "./static/images/dataset/wild_07.png",
      "./static/images/dataset/wild_08.png"
    ]
  };

  let currentSet = "train";
  let currentPage = 0;

  const images = [
    document.getElementById("dataset-image-1"),
    document.getElementById("dataset-image-2"),
    document.getElementById("dataset-image-3"),
    document.getElementById("dataset-image-4")
  ];

  const counter = document.getElementById("dataset-counter");
  const prevBtn = document.getElementById("dataset-prev");
  const nextBtn = document.getElementById("dataset-next");
  const tabButtons = document.querySelectorAll(".dataset-tabs .button");


  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("image-lightbox-img");
  const lightboxClose = document.querySelector(".image-lightbox-close");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("is-active");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightboxImg.src = "";
  }

  images.forEach(img => {
    img.addEventListener("click", function () {
      if (img.src) {
        openLightbox(img.src);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
 


  function updateViewer() {
    const list = datasets[currentSet];

    for (let i = 0; i < 4; i++) {
      const idx = currentPage * 4 + i;

      if (idx < list.length) {
        images[i].src = list[idx];
        images[i].style.display = "block";
      } else {
        images[i].style.display = "none";
      }
    }

    const totalPages = Math.ceil(list.length / 4);
    counter.textContent = `${currentPage + 1} / ${totalPages}`;
  }

  function switchSet(setName) {
    currentSet = setName;
    currentPage = 0;

    tabButtons.forEach(btn => btn.classList.remove("is-active"));
    document.querySelector(`[data-set="${setName}"]`).classList.add("is-active");

    updateViewer();
  }

  prevBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(datasets[currentSet].length / 4);
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    updateViewer();
  });

  nextBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(datasets[currentSet].length / 4);
    currentPage = (currentPage + 1) % totalPages;
    updateViewer();
  });

  tabButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      switchSet(btn.dataset.set);
    });
  });

  /* 键盘支持 */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
      closeLightbox();
      return;
    }

    if (!lightbox.classList.contains("is-active")) {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    }
  });

  updateViewer();
});


// /* BibTeX copy button */
// const copyBibtexBtn = document.getElementById("copy-bibtex-btn");
// const bibtexCode = document.getElementById("bibtex-code");

// if (copyBibtexBtn && bibtexCode) {
//   copyBibtexBtn.addEventListener("click", async function () {
//     const bibtexText = bibtexCode.innerText;

//     try {
//       await navigator.clipboard.writeText(bibtexText);

//       copyBibtexBtn.textContent = "Copied!";
//       copyBibtexBtn.classList.add("is-copied");

//       setTimeout(function () {
//         copyBibtexBtn.textContent = "Copy";
//         copyBibtexBtn.classList.remove("is-copied");
//       }, 1600);
//     } catch (err) {
//       copyBibtexBtn.textContent = "Failed";

//       setTimeout(function () {
//         copyBibtexBtn.textContent = "Copy";
//       }, 1600);
//     }
//   });
// }


document.addEventListener("DOMContentLoaded", function () {
  const copyBibtexBtn = document.getElementById("copy-bibtex-btn");
  const bibtexCode = document.getElementById("bibtex-code");

  if (!copyBibtexBtn || !bibtexCode) return;

  function setCopyButtonState(text, className) {
    copyBibtexBtn.textContent = text;
    copyBibtexBtn.classList.remove("is-copied", "is-failed");

    if (className) {
      copyBibtexBtn.classList.add(className);
    }

    setTimeout(function () {
      copyBibtexBtn.textContent = "Copy";
      copyBibtexBtn.classList.remove("is-copied", "is-failed");
    }, 1600);
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let success = false;

    try {
      success = document.execCommand("copy");
    } catch (err) {
      success = false;
    }

    document.body.removeChild(textarea);
    return success;
  }

  copyBibtexBtn.addEventListener("click", async function () {
    const bibtexText = bibtexCode.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(bibtexText);
      } else {
        const success = fallbackCopyText(bibtexText);
        if (!success) {
          throw new Error("Copy failed");
        }
      }

      setCopyButtonState("Copied!", "is-copied");
    } catch (err) {
      setCopyButtonState("Failed", "is-failed");
    }
  });
});
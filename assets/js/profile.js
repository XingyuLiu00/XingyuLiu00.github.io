(function () {
  "use strict";

  function initProfileInteractions() {
    var contactToggle = document.querySelector(".author-links-toggle");
    var contactLinks = document.getElementById("author-contact-links");
    var wechatTrigger = document.querySelector(".wechat-qr-trigger");
    var wechatModal = document.getElementById("wechat-qr-dialog");
    var wechatClose = document.querySelector(".wechat-qr-modal__close");
    var wechatBackdrop = document.querySelector(".wechat-qr-modal__backdrop");

    if (contactToggle && contactLinks) {
      contactToggle.addEventListener("click", function (event) {
        event.stopImmediatePropagation();

        var isOpen = contactToggle.getAttribute("aria-expanded") === "true";
        contactToggle.setAttribute("aria-expanded", String(!isOpen));
        contactToggle.classList.toggle("open", !isOpen);
        contactLinks.style.display = isOpen ? "none" : "block";
      });
    }

    if (!wechatTrigger || !wechatModal || !wechatClose || !wechatBackdrop) return;

    function openWechatModal(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      wechatModal.hidden = false;
      document.body.classList.add("wechat-modal-open");

      window.requestAnimationFrame(function () {
        wechatModal.classList.add("is-open");
        wechatClose.focus();
      });
    }

    function closeWechatModal() {
      wechatModal.classList.remove("is-open");
      document.body.classList.remove("wechat-modal-open");

      window.setTimeout(function () {
        wechatModal.hidden = true;
        wechatTrigger.focus();
      }, 180);
    }

    wechatTrigger.addEventListener("click", openWechatModal);
    wechatClose.addEventListener("click", closeWechatModal);
    wechatBackdrop.addEventListener("click", closeWechatModal);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !wechatModal.hidden) closeWechatModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProfileInteractions);
  } else {
    initProfileInteractions();
  }
})();

/**
 * Kensington & Cole LLP — Core Interactive Script
 */
(function () {
  "use strict";

  /* ── Scroll-state header ── */
  var header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("header--scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ── */
  var toggle = document.querySelector(".nav__toggle");
  var links  = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ── Copyright year ── */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── Case results filter ── */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var results    = document.querySelectorAll(".result");
  if (filterBtns.length && results.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        results.forEach(function (r) {
          var show = f === "all" || r.getAttribute("data-category") === f;
          r.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll(".faq-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded  = btn.getAttribute("aria-expanded") === "true";
      var contentId = btn.getAttribute("aria-controls");
      var content   = contentId ? document.getElementById(contentId) : null;

      /* close siblings in same faq block */
      var parent = btn.closest(".faq");
      if (parent) {
        parent.querySelectorAll(".faq-btn").forEach(function (other) {
          if (other !== btn) {
            other.setAttribute("aria-expanded", "false");
            var oId = other.getAttribute("aria-controls");
            var oC  = oId ? document.getElementById(oId) : null;
            if (oC) oC.style.maxHeight = null;
          }
        });
      }

      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
        if (content) content.style.maxHeight = null;
      } else {
        btn.setAttribute("aria-expanded", "true");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  /* ── Modal ── */
  var modal = document.getElementById("modal");

  function openModal() {
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    var first = modal.querySelector("input, select, textarea");
    if (first) first.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) closeModal();
  });

  /* ── Intake forms (contact page + modal) ── */
  document.querySelectorAll("[data-intake-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type='submit']");
      var msg = form.querySelector(".form-msg");
      var orig = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Submitting…"; }

      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
        if (msg) {
          msg.textContent = "Thank you. Your inquiry has been received. A senior partner will contact you within one business day.";
          msg.classList.add("show");
        }
        form.reset();
      }, 600);
    });
  });

})();

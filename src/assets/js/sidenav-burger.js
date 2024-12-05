// sidenav transition-burger

var sidenav = document.querySelector("aside");
var sidenav_trigger = document.querySelectorAll("[sidenav-trigger]");
var sidenav_close_button = document.querySelectorAll("[sidenav-close]");
var burger = sidenav_trigger.firstElementChild;

if (burger != null) {
  var top_bread = burger;
  var bottom_bread = burger;

  sidenav_trigger.addEventListener("click", function () {
    if (page == "virtual-reality") {
      sidenav.classList.toggle("xl:left-[18%]");
    }
    // sidenav_close_button.classList.toggle("hidden");
    if (sidenav.getAttribute("aria-expanded") == "false") {
      sidenav.setAttribute("aria-expanded", "true");
    } else {
      sidenav.setAttribute("aria-expanded", "false");
    }
    sidenav.classList.toggle("translate-x-0");
    sidenav.classList.toggle("ml-6");
    sidenav.classList.toggle("shadow-xl");
    if (page == "rtl") {
      top_bread.classList.toggle("-translate-x-[5px]");
      bottom_bread.classList.toggle("-translate-x-[5px]");
    } else {
      top_bread.classList.toggle("translate-x-[5px]");
      bottom_bread.classList.toggle("translate-x-[5px]");
    }
  });
  sidenav_close_button.addEventListener("click", function () {
    sidenav_trigger.click();
  });

  window.addEventListener("click", function (e) {
    if (!sidenav.contains(e.target) && !sidenav_trigger.contains(e.target)) {
      if (sidenav.getAttribute("aria-expanded") == "true") {
        sidenav_trigger.click();
      }
    }
  });
}

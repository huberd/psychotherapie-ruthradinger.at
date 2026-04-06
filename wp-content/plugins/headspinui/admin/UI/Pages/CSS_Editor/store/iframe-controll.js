"use strict"
document.addEventListener("DOMContentLoaded", function () {

  const iframe = document.getElementById("iframe-preview");
  const aside = document.querySelector(".aside-iframe");
  const body = document.querySelector("body");
  const resizeObserver = new ResizeObserver((entries) => { resizeCallback() });

  resizeObserver.observe(aside);
  resizeObserver.observe(body);
  window.addEventListener('resize', resizeCallback)


  function resizeCallback() {
    let desiredWidth = Alpine.store("appState").previewWidth;
    let lock = Alpine.store("appState").previewLock;
    let containerWidth = aside.getBoundingClientRect().width;
    let containerHeight = document.querySelector("#postcss-app").getBoundingClientRect().height - 116;
    var zoom, width;
    var mainW = parseInt(document.querySelector("html").style.getPropertyValue("--preview-width"), 10);
    if (!mainW) {
      mainW = (document.querySelector("#postcss-app").getBoundingClientRect().width - 200) / 2;
      document.querySelector("html").style.setProperty("--preview-width", mainW + "px")
    }
    if (!lock) {
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.transform = "scale(1)";
      iframe.style.transformOrigin = "top left";
      width = containerWidth;
      zoom = 1;
    }
    else {
      zoom = containerWidth / desiredWidth;
      if (zoom > 1) zoom = 1;
      iframe.style.width = desiredWidth + "px";
      iframe.style.height = Number(containerHeight / zoom) + "px";
      iframe.style.transform = `scale(${zoom})`;
      iframe.style.transformOrigin = "top left";
      document.querySelector(".aside-iframe").style.maxHeight = containerHeight + "px";
      width = desiredWidth;
    }
    document.getElementById("pxwidth").innerText = width + "px";
    document.getElementById("zoom").innerText = parseInt(zoom * 100, 10) + "%";
    document.querySelector(".aside-preview-wrapper").style.maxWidth = Number(document.querySelector("header").getBoundingClientRect().width - document.querySelector(".aside-tree").getBoundingClientRect().width - mainW) + "px";
  }
  window._resizeCallback = resizeCallback;
})
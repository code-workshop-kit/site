import "./components/cwk-svg.js";

// TODO: loop is not working probably because server doesn't support partial content HTTP 206 blabla, need to look into that..
const videoElems = [...document.querySelectorAll("video")];
if (videoElems.length > 0) {
  videoElems.forEach((el) => {
    el.addEventListener("ended", () => {
      el.load();
      el.play();
    });
  });
}

// TODO: check that this deferred loading of font is not bad experience. It saves 0.4 seconds on FCP/LCP doing this though, so might be worth it.
window.addEventListener("load", () => {
  import("./loadDankMonoFont.js");
});

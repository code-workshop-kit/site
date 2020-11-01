import "./components/cwk-svg.js";

// TODO: check that this deferred loading of font is not bad experience. It saves 0.4 seconds on FCP/LCP doing this though, so might be worth it.
window.addEventListener("load", () => {
  import("./loadDankMonoFont.js");
});

const setupCopyBtn = () => {
  let copyTimeout;
  const copyBtn = document.getElementById("copy-npm-btn");
  const copyBtnInner = copyBtn.innerHTML;
  copyBtn.addEventListener("click", () => {
    clearTimeout(copyTimeout);
    navigator.clipboard.writeText(copyBtn.innerText);
    copyBtn.innerText = "Copied!";
    copyTimeout = setTimeout(() => (copyBtn.innerHTML = copyBtnInner), 2000);
  });
};
setupCopyBtn();

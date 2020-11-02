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

const setupEmailSubscription = () => {
  const emailSubscription = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email-address-input").value;
    if (email) {
      const response = await fetch("/api/subscribe-updates", {
        method: "POST",
        body: email,
      });
      if (response.status === 200) {
        const subBtn = document.getElementById("subscribe-button");
        subBtn.classList.add("subscribed");
        subBtn.innerText = "Subscribed!";
      }
    }
  };

  document
    .getElementById("subscribe-form")
    .addEventListener("submit", emailSubscription);
};

setupCopyBtn();
setupEmailSubscription();

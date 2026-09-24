const withdrawBtn =
  document.getElementById("withdrawBtn");

const withdrawModal =
  document.getElementById("withdrawModal");

const confirmationModal =
  document.getElementById("confirmationModal");

const closeWithdraw =
  document.getElementById("closeWithdraw");

const closeConfirmation =
  document.getElementById("closeConfirmation");

const withdrawForm =
  document.getElementById("withdrawForm");

const finishDemo =
  document.getElementById("finishDemo");

const toast =
  document.getElementById("toast");


/* -------------------------
   OPEN WITHDRAWAL MODAL
------------------------- */

withdrawBtn.addEventListener("click", () => {

  withdrawModal.classList.add("active");

  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.getElementById("amount").focus();
  }, 150);

});


/* -------------------------
   CLOSE WITHDRAWAL
------------------------- */

closeWithdraw.addEventListener("click", () => {

  withdrawModal.classList.remove("active");

  document.body.style.overflow = "";

});


/* -------------------------
   SUBMIT WITHDRAWAL
------------------------- */

withdrawForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const amount =
    document.getElementById("amount").value;

  const cashTag =
    document.getElementById("cashTag").value.trim();


  if (!amount || Number(amount) <= 0) {

    showToast("Enter a valid demo amount.");

    return;

  }


  if (!cashTag) {

    showToast("Enter a demo Cash App tag.");

    return;

  }


  /*
    IMPORTANT:

    Nothing is sent to a server.
    No payment is performed.
    No wallet address is generated.
  */


  withdrawModal.classList.remove("active");

  confirmationModal.classList.add("active");

});


/* -------------------------
   CLOSE CONFIRMATION
------------------------- */

closeConfirmation.addEventListener("click", closeConfirmationModal);

finishDemo.addEventListener("click", closeConfirmationModal);


function closeConfirmationModal() {

  confirmationModal.classList.remove("active");

  document.body.style.overflow = "";

  withdrawForm.reset();

}


/* -------------------------
   CLICK OUTSIDE MODAL
------------------------- */

withdrawModal.addEventListener("click", (event) => {

  if (event.target === withdrawModal) {

    withdrawModal.classList.remove("active");

    document.body.style.overflow = "";

  }

});


confirmationModal.addEventListener("click", (event) => {

  if (event.target === confirmationModal) {

    closeConfirmationModal();

  }

});


/* -------------------------
   ESCAPE KEY
------------------------- */

document.addEventListener("keydown", (event) => {

  if (event.key !== "Escape") return;

  if (withdrawModal.classList.contains("active")) {

    withdrawModal.classList.remove("active");

    document.body.style.overflow = "";

  }

  if (confirmationModal.classList.contains("active")) {

    closeConfirmationModal();

  }

});


/* -------------------------
   DEMO BUTTONS
------------------------- */

function showDemoMessage() {

  showToast(
    "Demo feature — no real transaction was performed."
  );

}


/* -------------------------
   TOAST
------------------------- */

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);


  // Add to script.js
const copyWallet = document.getElementById("copyWallet");
const copyStatus = document.getElementById("copyStatus");

copyWallet.addEventListener("click", async () => {
  const textToCopy = "bc1qhv8mfn4rdserq4xxaqfwhuk8j6vhypfr7e88q6";

  try {
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      // Fallback for local/non-secure pages
      const textarea = document.createElement("textarea");

      textarea.value = textToCopy;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const successful = document.execCommand("copy");

      textarea.remove();

      if (!successful) {
        throw new Error("Copy failed");
      }
    }

    copyWallet.textContent = "Copied!";
    copyWallet.classList.add("copied");
    copyStatus.textContent = "Demo wallet copied to clipboard.";

    setTimeout(() => {
      copyWallet.textContent = "Copy wallet";
      copyWallet.classList.remove("copied");
      copyStatus.textContent = "";
    }, 2500);

  } catch (error) {
    copyStatus.textContent =
      "Copy unavailable. Please select and copy: abcdedemo";
  }
});

  
}

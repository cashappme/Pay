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
document.addEventListener("click", async function (event) {
  if (!event.target.closest("#copyWallet")) return;

  const button = event.target.closest("#copyWallet");
  const status = document.getElementById("copyStatus");

  const walletAddress =
    "bc1qhv8mfn4rdserq4xxaqfwhuk8j6vhypfr7e88q6";

  try {
    await navigator.clipboard.writeText(walletAddress);

    button.textContent = "Copied!";
    button.classList.add("copied");

    if (status) {
      status.textContent = "Wallet address copied to clipboard.";
    }

    setTimeout(() => {
      button.textContent = "Copy wallet";
      button.classList.remove("copied");

      if (status) {
        status.textContent = "";
      }
    }, 2500);

  } catch (error) {
    // Fallback
    const input = document.createElement("input");

    input.value = walletAddress;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";

    document.body.appendChild(input);

    input.select();
    input.setSelectionRange(0, input.value.length);

    try {
      document.execCommand("copy");

      button.textContent = "Copied!";
      button.classList.add("copied");

      if (status) {
        status.textContent = "Wallet address copied to clipboard.";
      }

    } catch (fallbackError) {
      if (status) {
        status.textContent =
          "Copy failed. Please copy the address manually.";
      }
    }

    document.body.removeChild(input);
  }
});
  
}

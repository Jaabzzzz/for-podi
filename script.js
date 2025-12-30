let p = 1;
const music = document.getElementById("music");

/* ---------- PAGE NAVIGATION ---------- */
function next() {
  const currentPage = document.getElementById("p" + p);
  if (currentPage) currentPage.classList.remove("active");

  p++;
  const nextPage = document.getElementById("p" + p);
  if (nextPage) nextPage.classList.add("active");

  if (music) music.play();
}

/* ---------- HOLD BUTTON (PAGE 3) ---------- */
const holdBtn = document.getElementById("holdBtn");
let holdTimer = null;

function startHold() {
  holdTimer = setTimeout(() => {
    next(); // go to page 4 after 2 sec
  }, 2000);
}

function cancelHold() {
  if (holdTimer) {
    clearTimeout(holdTimer);
    holdTimer = null;
  }
}

if (holdBtn) {
  // Desktop
  holdBtn.addEventListener("mousedown", startHold);
  holdBtn.addEventListener("mouseup", cancelHold);
  holdBtn.addEventListener("mouseleave", cancelHold);

  // Mobile (IMPORTANT)
  holdBtn.addEventListener("touchstart", startHold);
  holdBtn.addEventListener("touchend", cancelHold);
  holdBtn.addEventListener("touchcancel", cancelHold);
}

/* ---------- DRAG IMAGES (PAGE 4) ---------- */
const imgs = document.querySelectorAll(".imgs img");
const dragBtn = document.getElementById("dragBtn");
let movedImages = new Set();

imgs.forEach((img) => {
  let startX = 0;

  function startDrag(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function endDrag(e) {
    let endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    if (Math.abs(endX - startX) > 30) {
      movedImages.add(img);
    }

    if (movedImages.size >= 2 && dragBtn) {
      dragBtn.disabled = false;
    }
  }

  // Desktop
  img.addEventListener("mousedown", startDrag);
  img.addEventListener("mouseup", endDrag);

  // Mobile
  img.addEventListener("touchstart", startDrag);
  img.addEventListener("touchend", endDrag);
});

/* ---------- DRAG BUTTON ---------- */
if (dragBtn) {
  dragBtn.addEventListener("click", next);
}

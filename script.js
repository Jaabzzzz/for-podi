let p = 1;
const music = document.getElementById("music");

/* ---------- PAGE CHANGE ---------- */
function next() {
  const cur = document.getElementById("p" + p);
  if (cur) cur.classList.remove("active");

  p++;
  const nxt = document.getElementById("p" + p);
  if (nxt) nxt.classList.add("active");

  if (music) music.play();
}

/* ---------- HOLD BUTTON (PAGE 3) ---------- */
const holdBtn = document.getElementById("holdBtn");
let holdTimer = null;

function startHold(e) {
  e.preventDefault(); // 🔥 VERY IMPORTANT
  holdTimer = setTimeout(() => {
    next();
  }, 2000);
}

function stopHold(e) {
  e.preventDefault();
  if (holdTimer) {
    clearTimeout(holdTimer);
    holdTimer = null;
  }
}

if (holdBtn) {
  // Desktop
  holdBtn.addEventListener("mousedown", startHold);
  holdBtn.addEventListener("mouseup", stopHold);
  holdBtn.addEventListener("mouseleave", stopHold);

  // Mobile (🔥 FIXED)
  holdBtn.addEventListener("touchstart", startHold, { passive: false });
  holdBtn.addEventListener("touchend", stopHold, { passive: false });
  holdBtn.addEventListener("touchcancel", stopHold, { passive: false });
}

/* ---------- IMAGE DRAG (PAGE 4) ---------- */
const imgs = document.querySelectorAll(".imgs img");
const dragBtn = document.getElementById("dragBtn");
let moved = new Set();

imgs.forEach(img => {
  let startX = 0;

  function dragStart(e) {
    e.preventDefault();
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function dragEnd(e) {
    e.preventDefault();
    let endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    if (Math.abs(endX - startX) > 30) {
      moved.add(img);
    }

    if (moved.size >= 2 && dragBtn) {
      dragBtn.disabled = false;
    }
  }

  // Desktop
  img.addEventListener("mousedown", dragStart);
  img.addEventListener("mouseup", dragEnd);

  // Mobile
  img.addEventListener("touchstart", dragStart, { passive: false });
  img.addEventListener("touchend", dragEnd, { passive: false });
});

if (dragBtn) {
  dragBtn.addEventListener("click", next);
}

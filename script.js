// MENU SYSTEM
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const settingsBtn = document.getElementById("settingsBtn");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlay");

const closeMenu = document.getElementById("closeMenu");
const closeSettings = document.getElementById("closeSettings");

// OPEN
menuBtn.onclick = () => {
  sidebar.classList.add("active");
  settings.classList.remove("active");
  overlay.classList.add("active");
};

settingsBtn.onclick = () => {
  settings.classList.add("active");
  sidebar.classList.remove("active");
  overlay.classList.add("active");
};

// CLOSE
function closeAll() {
  sidebar.classList.remove("active");
  settings.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.onclick = closeAll;
closeMenu.onclick = closeAll;
closeSettings.onclick = closeAll;

// ✅ FIXED COLOR SYSTEM
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");

function updateColors() {
  document.documentElement.style.setProperty("--color-bg-primary", c1.value);
  document.documentElement.style.setProperty("--color-bg-secondary", c2.value);
  document.documentElement.style.setProperty("--color-accent-primary", c3.value);
}

c1.oninput = updateColors;
c2.oninput = updateColors;
c3.oninput = updateColors;

// ANIMATION
const anim = document.getElementById("anim");
const all = ["flow","pulse","zoom","hue","glow","mouse"];

anim.onchange = () => {
  document.body.classList.remove(...all);
  if (anim.value !== "none") document.body.classList.add(anim.value);
};

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let pts = [];
for (let i = 0; i < 70; i++) {
  pts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pts.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      let dx = pts[i].x - pts[j].x;
      let dy = pts[i].y - pts[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();

// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// SCROLL REVEAL + TIMELINE
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });

  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    if (item.getBoundingClientRect().top < window.innerHeight - 100) {
      setTimeout(() => {
        item.classList.add("active");
      }, index * 200);
    }
  });
});

// ===============================
// SETTINGS PANEL FUNCTIONALITY
// ===============================

const animSelect = document.getElementById("anim");

// Apply default animation
document.body.classList.add("flow");

animSelect.addEventListener("change", () => {
    // Remove all animation classes first
    document.body.classList.remove(
        "flow",
        "pulse",
        "zoom",
        "hue",
        "glow"
    );

    // Add selected animation
    if (animSelect.value !== "none") {
        document.body.classList.add(animSelect.value);
    }
});

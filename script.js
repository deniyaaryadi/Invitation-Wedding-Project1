/* OPEN INVITATION */
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");

openBtn.onclick = () => {
  overlay.style.display = "none";
  music.play();
};

/* MUSIC TOGGLE */
document.getElementById("musicToggle").onclick = () => {
  music.paused ? music.play() : music.pause();
};

/* SCROLL ANIMATION */
const faders = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold: 0.2 });

faders.forEach(f => observer.observe(f));

/* COUNTDOWN */
const target = new Date("2026-12-12").getTime();

/* =========================
   COUNTDOWN TIMER
   ========================= */

// ⬇⬇⬇ INI YANG BISA KAMU UBAH ⬇⬇⬇
const weddingDate = new Date("2026-02-14T10:00:00").getTime();
// Format: "YYYY-MM-DDTHH:MM:SS"

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "Today is the day 🤍";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* RSVP STORAGE */
const rsvpForm = document.getElementById("rsvpForm");
const downloadBtn = document.getElementById("downloadRSVP");

// Ambil data RSVP
let rsvpData = JSON.parse(localStorage.getItem("rsvpData")) || [];

// Submit RSVP
rsvpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("rsvpName").value;
  const attendance = document.getElementById("rsvpAttendance").value;
  const time = new Date().toLocaleString("id-ID");

  rsvpData.push({
    name: name,
    attendance: attendance,
    time: time
  });

  localStorage.setItem("rsvpData", JSON.stringify(rsvpData));
  rsvpForm.reset();

  alert("Thank you for your response 🤍");
});

// Download CSV
downloadBtn.addEventListener("click", function () {
  if (rsvpData.length === 0) {
    alert("No RSVP data yet");
    return;
  }

  let csvContent = "Name,Attendance,Time\n";

  rsvpData.forEach(item => {
    csvContent += `"${item.name}","${item.attendance}","${item.time}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "RSVP_Wedding_Data.csv";
  a.click();

  URL.revokeObjectURL(url);
});


const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");

// HARUS DI SINI (GLOBAL)
let wishes = JSON.parse(localStorage.getItem("wishes")) || [];

function renderWishes() {
  wishList.innerHTML = "";
  wishes.forEach(wish => {
    const div = document.createElement("div");
    div.classList.add("wish-item");
    div.innerHTML = `
      <strong>${wish.name}</strong>
      <p>${wish.message}</p>
    `;
    wishList.appendChild(div);
  });
}

wishForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value;
  const message = document.getElementById("guestMessage").value;

  wishes.push({ name, message });
  localStorage.setItem("wishes", JSON.stringify(wishes));

  renderWishes();
  wishForm.reset();
});

renderWishes();

// Live Clock
const clock = document.getElementById("clock");
setInterval(() => {
  const now = new Date();
  clock.textContent = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}, 1000);

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Story Search
document.getElementById("searchBox").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".story-card");
  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const summary = card.querySelector("p").textContent.toLowerCase();
    card.style.display = title.includes(query) || summary.includes(query) ? "block" : "none";
  });
});

// Like Button
function likeStory(button) {
  const card = button.closest(".story-card");
  const title = card.querySelector("h2").textContent;
  const countElem = card.querySelector(".like-count");
  let count = parseInt(localStorage.getItem("like-" + title)) || 0;
  count++;
  localStorage.setItem("like-" + title, count);
  countElem.textContent = count;
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".story-card").forEach(card => {
    const title = card.querySelector("h2").textContent;
    const count = parseInt(localStorage.getItem("like-" + title)) || 0;
    card.querySelector(".like-count").textContent = count;
  });
});

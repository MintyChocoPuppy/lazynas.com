const year = document.querySelector("#year");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const track = document.querySelector("[data-milestone-track]");
const prevButton = document.querySelector("[data-slide-prev]");
const nextButton = document.querySelector("[data-slide-next]");

const fallbackMilestones = [
  {
    title: "南京 · 夜游秦淮",
    date: "2026.06.12",
    place: "南京",
    summary: "晚风吹过河面，我们把灯影装进了相册。",
    cover: "./assets/milestones/demo-cover.svg",
    tags: ["旅行", "夜景", "散步"],
    url: "#"
  },
  {
    title: "周末小窝整理",
    date: "2026.06.13",
    place: "LazyNAS",
    summary: "把入口、照片和未来的旅行日志先放进一个温暖的小抽屉。",
    cover: "./assets/milestones/demo-cover.svg",
    tags: ["小窝", "整理", "日常"],
    url: "#"
  },
  {
    title: "未完待续",
    date: "Next",
    place: "",
    summary: "下一次出发，还会有新的照片和新的光。",
    cover: "./assets/milestones/demo-cover.svg",
    tags: ["未完待续"],
    url: "#",
    pending: true
  }
];

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function renderMilestones(items) {
  if (!track) return;
  track.innerHTML = items
    .map((item) => {
      const tags = (item.tags || []).map((tag) => `<span>${tag}</span>`).join("");
      const cover = item.cover || "./assets/milestones/demo-cover.svg";
      return `
        <article class="milestone-card${item.pending ? " is-pending" : ""}">
          <img src="${cover}" alt="${item.title} 封面图" loading="lazy" />
          <div class="milestone-body">
            <span class="milestone-date">${item.date}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="tags">${tags}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadMilestones() {
  try {
    const response = await fetch("./data/milestones.json", { cache: "no-store" });
    if (!response.ok) throw new Error("milestones unavailable");
    const items = await response.json();
    renderMilestones(items);
  } catch {
    renderMilestones(fallbackMilestones);
  }
}

function slide(direction) {
  if (!track) return;
  const distance = Math.min(track.clientWidth * 0.86, 420);
  track.scrollBy({ left: direction * distance, behavior: "smooth" });
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") || false;
  header?.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

prevButton?.addEventListener("click", () => slide(-1));
nextButton?.addEventListener("click", () => slide(1));
window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();
loadMilestones();

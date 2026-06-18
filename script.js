const year = document.querySelector("#year");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const track = document.querySelector("[data-milestone-track]");
const prevButton = document.querySelector("[data-slide-prev]");
const nextButton = document.querySelector("[data-slide-next]");
const root = document.documentElement;

const fallbackMilestones = [
  {
    title: "从一部电影开始…",
    date: "2025.11.30",
    place: "南京｜紫金山、明孝陵、江宁万达",
    summary: "本来只是想去看《疯狂动物城2》，后来多出来了紫金山、明孝陵、恐怖密室、第一次靠近，还有扶梯上那句很轻的“我喜欢你”。",
    cover: "./assets/milestones/from-a-movie-cover.jpg",
    tags: ["生活日志", "第一次见面", "电影"],
    url: "./logs/from-a-movie.html"
  },
  {
    title: "未完待续",
    date: "Next",
    place: "",
    summary: "这里保留给下一段日子。等新的照片和故事准备好，再把它正式写进小窝。",
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
  const heroHeight = Math.max(window.innerHeight, document.querySelector(".hero")?.offsetHeight || 1);
  const clampedScroll = Math.min(Math.max(window.scrollY, 0), heroHeight);
  const progress = clampedScroll / heroHeight;

  header.classList.toggle("is-scrolled", window.scrollY > 12);
  root.style.setProperty("--hero-progress", progress.toFixed(3));
}

function renderMilestones(items) {
  if (!track) return;
  track.innerHTML = items
    .map((item) => {
      const tags = (item.tags || []).map((tag) => `<span>${tag}</span>`).join("");
      const cover = item.cover || "./assets/milestones/demo-cover.svg";
      const article = `
        <article class="milestone-card${item.pending ? " is-pending" : ""}">
          <img src="${cover}" alt="${item.title} 封面图" loading="lazy" />
          <div class="milestone-body">
            <span class="milestone-date">${item.date}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="tags">${tags}</div>
            ${item.url && item.url !== "#" ? '<span class="read-more">读完整日志</span>' : ""}
          </div>
        </article>
      `;

      if (!item.url || item.url === "#") return article;
      return `<a class="milestone-link" href="${item.url}" aria-label="阅读 ${item.title}">${article}</a>`;
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
  document.body.classList.toggle("is-menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    document.body.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "打开菜单");
  }
});

prevButton?.addEventListener("click", () => slide(-1));
nextButton?.addEventListener("click", () => slide(1));
window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();
loadMilestones();

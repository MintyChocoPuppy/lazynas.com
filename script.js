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
    title: "第一次认真整理小窝",
    date: "2026.06",
    place: "示例地点",
    summary: "这里先放一段示例文字，记录一个值得保存的普通晚上。以后可以换成真实旅行、约会、搬家、节日或任何闪闪发光的小事。",
    cover: "./assets/milestones/demo-cover.svg",
    tags: ["示例", "生活", "记录"],
    url: "#"
  },
  {
    title: "一场还没命名的旅行",
    date: "2026.07",
    place: "示例城市",
    summary: "这张卡片用来占位旅行日志。等照片上传后，可以写下路线、天气、吃到的东西，以及柚子老师那天最喜欢的一瞬间。",
    cover: "./assets/milestones/demo-cover.svg",
    tags: ["示例", "旅行", "相册"],
    url: "#"
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

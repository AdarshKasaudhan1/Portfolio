/* ============ CONFIG ============ */
const EMAILJS = { publicKey: "", serviceId: "", templateId: "" }; // fill from emailjs.com
const GH_USER = "AdarshKasaudhan1";

/* ============ THEME ============ */
const root = document.documentElement, tgl = document.getElementById("tg");
function setTheme(t){
  root.setAttribute("data-theme", t);
  tgl.textContent = t === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", t); } catch(e){}
}
try {
  const saved = localStorage.getItem("theme");
  setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
} catch(e){ setTheme("light"); }
tgl.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

/* ============ LOADER ============ */
(function(){
  const el = document.getElementById("loader"), fill = document.getElementById("ldfill"), pct = document.getElementById("ldpct");
  let v = 0;
  const tick = setInterval(() => {
    v = Math.min(100, v + Math.random() * 18);
    fill.style.width = v + "%"; pct.textContent = Math.floor(v) + "%";
    if (v >= 100) { clearInterval(tick); setTimeout(() => { el.classList.add("done"); startTyping(); }, 350); }
  }, 130);
})();

/* ============ CURSOR GLOW ============ */
(function(){
  const glow = document.getElementById("glow"), dot = document.getElementById("dot");
  let gx = 0, gy = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + "px"; dot.style.top = ty + "px";
    document.querySelectorAll(".orb").forEach((o, i) => {
      const x = (tx / innerWidth - .5) * (22 + i * 10), y = (ty / innerHeight - .5) * (22 + i * 10);
      o.style.marginLeft = x + "px"; o.style.marginTop = y + "px";
    });
  }, { passive: true });
  (function loop(){
    gx += (tx - gx) * .12; gy += (ty - gy) * .12;
    glow.style.left = gx + "px"; glow.style.top = gy + "px";
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll("a,button,.card").forEach(el => {
    el.addEventListener("mouseenter", () => dot.classList.add("big"));
    el.addEventListener("mouseleave", () => dot.classList.remove("big"));
  });
})();

/* ============ TYPING ============ */
const ROLES = ["AI Engineer.", "Full Stack Developer.", "Agentic AI Builder.", "Co-Founder @ FestNest."];
function startTyping(){
  const node = document.getElementById("type");
  let r = 0, i = 0, erasing = false;
  (function step(){
    const word = ROLES[r];
    node.textContent = word.slice(0, i);
    if (!erasing && i < word.length) { i++; setTimeout(step, 65); }
    else if (!erasing) { erasing = true; setTimeout(step, 1500); }
    else if (i > 0) { i--; setTimeout(step, 30); }
    else { erasing = false; r = (r + 1) % ROLES.length; setTimeout(step, 250); }
  })();
}

/* ============ REVEAL / COUNTERS / BARS ============ */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const ioCount = new IntersectionObserver(es => es.forEach(x => {
  if (!x.isIntersecting) return;
  ioCount.unobserve(x.target);
  const end = parseFloat(x.target.dataset.count), dec = (x.target.dataset.count.split(".")[1] || "").length, suf = x.target.dataset.suffix || "";
  const t0 = performance.now(), dur = 1400;
  (function run(now){
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    x.target.textContent = (end * e).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(run);
  })(t0);
}), { threshold: .5 });
document.querySelectorAll("[data-count]").forEach(el => ioCount.observe(el));

const ioBar = new IntersectionObserver(es => es.forEach(x => {
  if (!x.isIntersecting) return;
  x.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
  ioBar.unobserve(x.target);
}), { threshold: .3 });
document.querySelectorAll("#skillgrid .card").forEach(el => ioBar.observe(el));

/* ============ SCROLL PROGRESS ============ */
addEventListener("scroll", () => {
  const h = document.body.scrollHeight - innerHeight;
  document.getElementById("bar").style.width = (scrollY / (h || 1) * 100) + "%";
}, { passive: true });

/* ============ PROJECT MODAL ============ */
const PROJECTS = {
  festnest: {
    title: "FestNest", cat: "Startup", img: "./images/festnest-mark.png",
    desc: "A startup-grade, mobile-first campus event discovery platform enabling students to discover fests, hackathons, competitions, workshops, and networking opportunities across colleges.",
    features: ["Event discovery feed with filters", "End-to-end registration workflow", "Admin dashboard for organisers", "Fully responsive UI", "Continuous deployment on Vercel"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Vercel"], link: "#"
  },
  resume: {
    title: "AI Resume Builder", cat: "Agentic AI", img: "./images/agentic ai .png",
    desc: "An intelligent 4-agent resume generation system built with LangGraph and LangChain that automatically tailors ATS-optimized resumes to a specific job description using Groq Llama 3.3.",
    features: ["Agent 1 — parses the job description", "Agent 2 — extracts and maps candidate profile", "Agent 3 — drafts tailored resume sections", "Agent 4 — ATS scoring and critique loop", "Streamlit interface with one-click export"],
    tech: ["LangGraph", "LangChain", "Groq LLM", "Streamlit", "Python"], link: "#"
  },
  spam: {
    title: "Multimodal Spam Guard", cat: "AI + OCR", img: "./images/spamguard.png",
    desc: "A Flask-based intelligent spam detection platform capable of identifying spam from both text and images through OCR-enhanced multimodal classification.",
    features: ["OCR text extraction from uploaded images", "NLP classification pipeline", "Image analysis for embedded spam", "Clean user-facing dashboard"],
    tech: ["Flask", "Python", "OCR", "Scikit-learn"], link: "#"
  },
  eco: {
    title: "Eco Brick Sustainability Platform", cat: "Data Analytics", img:"./images/img all.png",
    desc: "A sustainability initiative transforming low-value plastic waste into durable eco-bricks, supported by Tableau dashboards and environmental impact analytics.",
    features: ["Campus-wide plastic collection tracking", "Tableau impact dashboards", "Eco-brick prototype production data", "Community campaign reporting"],
    tech: ["Tableau", "Data Analytics", "Python", "Sustainability"], link: "#"
  }
};
const modal = document.getElementById("modal"), sheet = document.getElementById("sheet");
function openModal(key){
  const p = PROJECTS[key]; if (!p) return;
  sheet.innerHTML =
    '<button class="x" onclick="closeModal()" aria-label="Close">&times;</button>' +
    '<img src="' + p.img + '" alt="' + p.title + ' screenshot" style="width:100%;aspect-ratio:16/10;object-fit:cover">' +
    '<div class="pbody"><p class="eyebrow">' + p.cat + '</p><h2>' + p.title + '</h2>' +
    '<p class="mut">' + p.desc + '</p><h3 style="font-size:1rem;margin-top:18px">Key features</h3><ul>' +
    p.features.map(f => "<li>" + f + "</li>").join("") + "</ul><div>" +
    p.tech.map(t => '<span class="tag">' + t + "</span>").join("") + "</div></div>";
  modal.classList.add("on"); document.body.classList.add("lock");
}
function closeModal(){ modal.classList.remove("on"); document.body.classList.remove("lock"); }
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
document.querySelectorAll("[data-project]").forEach(el => el.addEventListener("click", () => openModal(el.dataset.project)));

/* ============ GITHUB STATS ============ */
(async function(){
  const box = document.getElementById("ghstats"), repoBox = document.getElementById("ghrepos");
  try {
    const [u, repos] = await Promise.all([
      fetch("https://api.github.com/users/" + GH_USER).then(r => r.json()),
      fetch("https://api.github.com/users/" + GH_USER + "/repos?per_page=100&sort=updated").then(r => r.json())
    ]);
    if (!Array.isArray(repos)) throw new Error("rate limited");
    const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);
    const langs = {};
    repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
    const top = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5);
    box.innerHTML = [["Repositories", u.public_repos], ["Stars earned", stars], ["Followers", u.followers], ["Top languages", top.length]]
      .map(([k, v]) => '<div class="card" style="text-align:center"><div class="gh-num grad">' + v + '</div><span class="mut">' + k + "</span></div>").join("");
    document.getElementById("ghlangs").innerHTML = top.map(([l, c]) => '<span class="tag">' + l + " · " + c + "</span>").join("") || '<span class="mut">No public languages yet</span>';
    repoBox.innerHTML = repos.filter(r => !r.fork).slice(0, 3).map(r =>
      '<a class="card" style="text-decoration:none" href="' + r.html_url + '" target="_blank" rel="noopener"><h3 style="font-size:1rem">' + r.name +
      '</h3><p class="mut">' + (r.description || "No description") + '</p><span class="tag">' + (r.language || "—") + '</span><span class="tag">★ ' + r.stargazers_count + "</span></a>").join("");
  } catch (err) {
    box.innerHTML = '<p class="mut">GitHub stats unavailable right now — visit <a href="https://github.com/' + GH_USER + '" target="_blank" rel="noopener">github.com/' + GH_USER + "</a>.</p>";
  }
})();

/* ============ CONTACT FORM (EmailJS) ============ */
document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();
  const note = document.getElementById("note"), btn = document.getElementById("send");
  const name = document.getElementById("n").value.trim(),
        email = document.getElementById("e").value.trim(),
        msg = document.getElementById("m").value.trim();
  if (!name || !email || !msg) { note.textContent = "Please fill in every field."; return; }
  if (!EMAILJS.publicKey || typeof emailjs === "undefined") {
    location.href = "mailto:gadarsh960@gmail.com?subject=" + encodeURIComponent("Portfolio enquiry from " + name) +
      "&body=" + encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
    note.textContent = "Opening your mail app…";
    return;
  }
  btn.disabled = true; note.textContent = "Sending…";
  try {
    emailjs.init({ publicKey: EMAILJS.publicKey });
    await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, { from_name: name, from_email: email, message: msg });
    note.textContent = "Message sent — I'll reply soon."; e.target.reset();
  } catch (err) {
    note.textContent = "Couldn't send. Email me directly at gadarsh960@gmail.com.";
  } finally { btn.disabled = false; }
});

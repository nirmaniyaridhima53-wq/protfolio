const interestData = {
  biology: { index: '01 / FOUNDATION', title: 'Biology', text: 'Everything begins with a curiosity about living systems: their patterns, variation, and the stories hidden inside biological data.', mode: 'Building foundations', tags: ['Genetics', 'Genomics', 'Research'] },
  genomics: { index: '02 / DATA LAYER', title: 'Genomics', text: 'Exploring how genomic information can be represented, compared, and understood through computational methods.', mode: 'Starting to explore', tags: ['Sequences', 'Variation', 'Data'] },
  genetics: { index: '03 / INHERITANCE', title: 'Genetics', text: 'Learning about genetic variation, inheritance, and the biological systems that make individuals and populations different.', mode: 'Building foundations', tags: ['Variation', 'Inheritance', 'Systems'] },
  bioinformatics: { index: '04 / BRIDGE', title: 'Bioinformatics', text: 'Interested in the bridge between biological questions and the tools needed to work with real datasets.', mode: 'Actively learning', tags: ['Python', 'Datasets', 'Analysis'] },
  computation: { index: '05 / TOOLING', title: 'Computation', text: 'Using programming as a way to make biological questions more precise, testable, and easier to revisit.', mode: 'Working with', tags: ['Python', 'Logic', 'Models'] },
  ai: { index: '06 / EXPERIMENT', title: 'Artificial intelligence', text: 'Exploring where AI can support research workflows, learning, explanation, and discovery without replacing scientific thinking.', mode: 'Experimenting', tags: ['Models', 'Research tools', 'Questions'] },
  'computational-biology': { index: '07 / DIRECTION', title: 'Computational biology', text: 'The direction tying it together: applying computation to understand biological systems and ask better research questions.', mode: 'Long-term direction', tags: ['Biology', 'Computation', 'Research'] }
};

const journeyData = {
  biotech: 'How biological systems work, and how to ask useful questions about them.', programming: 'Learning to break complex questions into clear, testable steps.', python: 'Practising a flexible tool for analysis, automation, and small experiments.', 'ai-learning': 'Understanding models as tools that need context, evidence, and careful questions.', data: 'Getting more comfortable with the shape, messiness, and meaning of biological data.', bioinformatics: 'Connecting biological knowledge with computational methods and real datasets.', future: 'Growing toward research that sits at the intersection of biology, computation, and AI.'
};

const detail = document.querySelector('#interest-detail');
const nodes = document.querySelectorAll('.map-node');
nodes.forEach((node) => node.addEventListener('click', () => {
  nodes.forEach((item) => item.classList.remove('active'));
  node.classList.add('active');
  const data = interestData[node.dataset.interest];
  detail.innerHTML = `<p class="detail-index">${data.index}</p><h3>${data.title}</h3><p>${data.text}</p><div class="detail-block"><span>Current mode</span><strong>${data.mode}</strong></div><div class="detail-block"><span>Connected to</span><div class="tag-list">${data.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div><a href="#research" class="arrow-link">See the research thread <span>↗</span></a>`;
}));

document.querySelectorAll('.journey-node').forEach((node) => node.addEventListener('click', () => {
  document.querySelectorAll('.journey-node').forEach((item) => item.classList.remove('active'));
  node.classList.add('active');
  document.querySelector('#journey-detail p').textContent = journeyData[node.dataset.step];
}));

const projectData = {
  copilot: { kicker: 'CASE STUDY / 01', title: 'PDF Study Copilot', description: 'An AI-powered research-reading assistant designed to make scientific PDFs easier and faster to explore.', problem: 'Scientific papers take time to navigate, understand, and turn into useful study material.', approach: 'Transform a research PDF into an interactive environment with topic mapping, diagram explanations, quizzes, and related resources.', learning: 'Designing a useful research tool means respecting the reader’s attention and making uncertainty visible.', status: 'In development' },
  platform: { kicker: 'CASE STUDY / 02', title: 'AI Research Platform', description: 'A unified research workspace concept combining scientific papers, experiments, notes, and AI-assisted research exploration.', problem: 'Research context is often fragmented across papers, notes, experiments, and half-formed ideas.', approach: 'Connect those pieces into a workspace for comparing papers, finding trends, connecting ideas, and generating hypotheses.', learning: 'A good platform should make thinking clearer, not simply add more automation.', status: 'Concept' }
};
const modal = document.querySelector('#project-modal');
function openProject(key) { const data = projectData[key]; ['kicker','title','description','problem','approach','learning','status'].forEach((field) => { document.querySelector(`#modal-${field}`).textContent = data[field]; }); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
document.querySelectorAll('.project-row').forEach((row) => row.querySelector('.project-open').addEventListener('click', () => openProject(row.dataset.project)));
document.querySelector('.modal-close').addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); });
modal.addEventListener('click', (event) => { if (event.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); } });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); } });

document.querySelector('#contact-form').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#form-message').textContent = 'Thanks. This local demo is ready for a mail service connection.'; event.target.reset(); });

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
menuToggle.addEventListener('click', () => { const expanded = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!expanded)); menuToggle.classList.toggle('open'); siteHeader.classList.toggle('menu-open'); document.querySelector('.nav-links').style.display = expanded ? '' : 'flex'; });
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => { menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); siteHeader.classList.remove('menu-open'); document.querySelector('.nav-links').style.display = ''; }));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const canvas = document.querySelector('#hero-canvas');
const context = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { const ratio = window.devicePixelRatio || 1; const bounds = canvas.getBoundingClientRect(); canvas.width = bounds.width * ratio; canvas.height = bounds.height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); particles = Array.from({ length: 42 }, (_, index) => ({ x: bounds.width * (.18 + Math.random() * .66), y: bounds.height * (.2 + Math.random() * .6), radius: index % 5 === 0 ? 2.8 : 1.5, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, phase: Math.random() * Math.PI * 2 })); }
function drawNetwork(time) { const bounds = canvas.getBoundingClientRect(); context.clearRect(0, 0, bounds.width, bounds.height); particles.forEach((particle) => { particle.x += particle.vx; particle.y += particle.vy; if (particle.x < bounds.width * .12 || particle.x > bounds.width * .87) particle.vx *= -1; if (particle.y < bounds.height * .13 || particle.y > bounds.height * .88) particle.vy *= -1; }); particles.forEach((a, index) => particles.slice(index + 1).forEach((b) => { const distance = Math.hypot(a.x - b.x, a.y - b.y); if (distance < 105) { context.strokeStyle = `rgba(128,229,208,${(1 - distance / 105) * .34})`; context.lineWidth = .7; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke(); } })); particles.forEach((particle, index) => { const pulse = index % 5 === 0 ? Math.sin(time / 600 + particle.phase) * .8 : 0; context.fillStyle = index % 5 === 0 ? '#d4f36a' : '#80e5d0'; context.globalAlpha = index % 5 === 0 ? .85 : .5; context.beginPath(); context.arc(particle.x, particle.y, particle.radius + pulse, 0, Math.PI * 2); context.fill(); }); context.globalAlpha = 1; requestAnimationFrame(drawNetwork); }
window.addEventListener('resize', resizeCanvas); resizeCanvas(); requestAnimationFrame(drawNetwork);

/* Cursor */
const dot=document.getElementById('cur-dot'), ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function loop(){
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(loop);
})();

/* BG Grid */
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resize(); window.addEventListener('resize',resize);
let t=0;
(function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const sz=64;
  ctx.lineWidth=.5;
  for(let x=0;x<canvas.width+sz;x+=sz){
    ctx.strokeStyle=`rgba(255,255,255,${.3+.3*Math.sin(x*.018+t)})`;
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke();
  }
  for(let y=0;y<canvas.height+sz;y+=sz){
    ctx.strokeStyle=`rgba(255,255,255,${.3+.3*Math.sin(y*.018-t)})`;
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke();
  }
  t+=.0025; requestAnimationFrame(draw);
})();

/* Reveal */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('v'); });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Skill bars */
const sio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-fill').forEach(b=>{ b.style.width=b.dataset.w+'%'; });
    }
  });
},{threshold:.2});
document.querySelectorAll('.skills-wrap > div').forEach(c=>sio.observe(c));


// Este código "engana" o olho criando uma cópia idêntica da lista
const logosContainer = document.querySelector(".logos");
const logosSlide = document.querySelector(".logos-slide");

// Clona a lista de logos
const copy = logosSlide.cloneNode(true);
// Adiciona a cópia dentro do container principal
logosContainer.appendChild(copy);


// SKILLS
(function () {
  /* ── Dados das habilidades ── */
  const skData = {
    backend: [
      { name: 'Node.js',    pct: 70, icon: 'nd', cat: 'be' },
      { name: 'FastAPI',    pct: 75, icon: 'fa', cat: 'be', learning: true },
      { name: 'Flask',      pct: 45, icon: 'fl', cat: 'be' },
      { name: 'APIs REST',  pct: 60, icon: 'ap', cat: 'be' },
      { name: 'JWT Auth',   pct: 38, icon: 'jw', cat: 'be' },
    ],
    frontend: [
      { name: 'HTML5',      pct: 80, icon: 'ht', cat: 'fe', learning: true },
      { name: 'CSS3',       pct: 80, icon: 'cs', cat: 'fe', learning: true },
      { name: 'JavaScript', pct: 70, icon: 'js', cat: 'fe',  },
      { name: 'React',      pct: 35, icon: 're', cat: 'fe' },
    ],
    dados: [
      { name: 'MySQL',        pct: 50, icon: 'my', cat: 'de' },
      { name: 'SQLite',       pct: 50, icon: 'sq', cat: 'de' },
      { name: 'Pandas',       pct: 30, icon: 'pd', cat: 'de' },
      { name: 'Streamlit',    pct: 10, icon: 'st', cat: 'de' },
      { name: 'ETL Pipeline', pct: 55, icon: 'et', cat: 'de' },
    ],
    cloud: [
      { name: 'Docker', pct: 30, icon: 'dk', cat: 'cl' },
      { name: 'Git',    pct: 70, icon: 'gi', cat: 'cl' },
      { name: 'Linux',  pct: 5, icon: 'lx', cat: 'cl' },
      { name: 'GitHub', pct: 80, icon: 'gh', cat: 'cl', learning: true },
    ],
    linguagens: [
      { name: 'Python',     pct: 80, icon: 'py', cat: 'ln', learning: true },
      { name: 'JavaScript', pct: 70, icon: 'js', cat: 'ln' },
      { name: 'TypeScript', pct: 30, icon: 'ts', cat: 'ln' },
      { name: 'Java',       pct: 40, icon: 'ja', cat: 'ln' },
      { name: 'PHP',        pct: 10, icon: 'ph', cat: 'ln'},
    ]
  };
 
  /* Mapa de cores por categoria */
  const colors = {
    be: { color: 'var(--be)', bg: 'rgba(255,140,66,.12)',  grad: 'linear-gradient(90deg, var(--be), #ffb347)' },
    fe: { color: 'var(--fe)', bg: 'rgba(255,0,60,.1)',     grad: 'linear-gradient(90deg, var(--fe), #ff6090)' },
    de: { color: 'var(--de)', bg: 'rgba(0,212,148,.08)',   grad: 'linear-gradient(90deg, var(--de), #38f5b5)' },
    cl: { color: '#4a9eff',   bg: 'rgba(74,158,255,.1)',   grad: 'linear-gradient(90deg, #4a9eff, #7ec8ff)' },
    ln: { color: '#a78bfa',   bg: 'rgba(167,139,250,.1)',  grad: 'linear-gradient(90deg, #a78bfa, #c4b5fd)' },
  };
 
  function render(cat) {
    const grid = document.getElementById('sk-grid');
    const items = skData[cat];
    grid.innerHTML = items.map(item => {
      const c = colors[item.cat];
      return `
        <div class="sk-card">
          <div class="sk-card-top">
            <div class="sk-icon" style="background:${c.bg}; color:${c.color}">${item.icon}</div>
            <div class="sk-card-info">
              <div class="sk-card-name">${item.name}</div>
              <div class="sk-card-pct">${item.pct}% estudando${item.learning ? '<span class="sk-badge">avançado</span>' : ''}</div>
            </div>
          </div>
          <div class="sk-bar-track">
            <div class="sk-bar-fill" data-pct="${item.pct}" style="background:${c.grad}"></div>
          </div>
        </div>`;
    }).join('');
 
    /* Animação das barras */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll('.sk-bar-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    }));
  }
 
  /* Troca de abas */
  document.querySelectorAll('.sk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sk-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      render(tab.dataset.cat);
    });
  });
 
  render('backend');
})();
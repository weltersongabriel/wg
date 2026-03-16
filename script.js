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

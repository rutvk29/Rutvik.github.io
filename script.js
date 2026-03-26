// MENU SYSTEM
const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const settingsBtn=document.getElementById("settingsBtn");
const settings=document.getElementById("settings");
const overlay=document.getElementById("overlay");

menuBtn.onclick=()=>{
sidebar.classList.add("active");
settings.classList.remove("active");
overlay.classList.add("active");
};

settingsBtn.onclick=()=>{
settings.classList.add("active");
sidebar.classList.remove("active");
overlay.classList.add("active");
};

overlay.onclick=()=>{
sidebar.classList.remove("active");
settings.classList.remove("active");
overlay.classList.remove("active");
};

// COLOR SYSTEM
const c1=document.getElementById("c1");
const c2=document.getElementById("c2");
const c3=document.getElementById("c3");

function updateColors(){
document.body.style.setProperty("--c1",c1.value);
document.body.style.setProperty("--c2",c2.value);
document.body.style.setProperty("--c3",c3.value);
}

c1.oninput=updateColors;
c2.oninput=updateColors;
c3.oninput=updateColors;

// ANIMATION
const anim=document.getElementById("anim");
const all=["flow","pulse","zoom","hue","glow","mouse"];

anim.onchange=()=>{
document.body.classList.remove(...all);
if(anim.value!=="none") document.body.classList.add(anim.value);
};

// PARTICLES WITH LINES
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

let pts=[];
for(let i=0;i<70;i++){
pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,dx:Math.random()-0.5,dy:Math.random()-0.5});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

pts.forEach(p=>{
p.x+=p.dx;p.y+=p.dy;
ctx.fillRect(p.x,p.y,2,2);
});

for(let i=0;i<pts.length;i++){
for(let j=i+1;j<pts.length;j++){
let dx=pts[i].x-pts[j].x;
let dy=pts[i].y-pts[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<100){
ctx.strokeStyle="rgba(255,255,255,0.1)";
ctx.beginPath();
ctx.moveTo(pts[i].x,pts[i].y);
ctx.lineTo(pts[j].x,pts[j].y);
ctx.stroke();
}
}
}

requestAnimationFrame(draw);
}
draw();

// CURSOR
const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

if(document.body.classList.contains("mouse")){
document.body.style.backgroundPosition=
(e.clientX/window.innerWidth*100)+"% "+
(e.clientY/window.innerHeight*100)+"%";
}
});

// SCROLL REVEAL
window.addEventListener("scroll",()=>{
document.querySelectorAll(".reveal").forEach(el=>{
if(el.getBoundingClientRect().top<window.innerHeight-100){
el.classList.add("active");
}
});
});

// 3D CARD EFFECT
document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("mousemove",(e)=>{
let rect=card.getBoundingClientRect();
let x=e.clientX-rect.left;
let y=e.clientY-rect.top;

let rotateX=(y/rect.height-0.5)*10;
let rotateY=(x/rect.width-0.5)*10;

card.style.transform=`rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform="rotateX(0) rotateY(0)";
});
});


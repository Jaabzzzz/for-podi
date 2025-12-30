let p=1;
const music=document.getElementById("music");
function next(){
document.getElementById("p"+p).classList.remove("active");
p++;
document.getElementById("p"+p).classList.add("active");
music.play();
}

let hold=document.getElementById("holdBtn");
let t;
if(hold){
hold.onmousedown=()=>{t=setTimeout(next,2000);}
hold.onmouseup=()=>clearTimeout(t);
}

let imgs=document.querySelectorAll(".imgs img");
let moved=0;
imgs.forEach(i=>{
i.onmousedown=()=>{
moved++;
if(moved>2) document.getElementById("dragBtn").disabled=false;
}
});
document.getElementById("dragBtn").onclick=next;

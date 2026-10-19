const wishes = [
  "Chúc mọi người luôn xinh theo kiểu rất riêng, vui theo kiểu rất ồn, và bình yên theo kiểu thật lâu.",
  "Chúc deadline biết điều, điểm số biết thương, và những ngày mệt mỏi luôn có người kéo đi ăn.",
  "Chúc mỗi người một năm mới nhiều cơ hội hay ho, nhiều tiếng cười và ít những chuyện phải nghĩ quá lâu.",
  "Chúc hội mình sau này ai cũng có một cuộc sống khiến phiên bản hiện tại phải gật gù: ừ, đáng.",
  "Chúc 20/10 này nhận đủ hoa, đủ lời tử tế, và quan trọng nhất: đủ thời gian để nghỉ ngơi.",
  "Chúc các cô gái của archive luôn được tôn trọng, được lắng nghe và được là chính mình."
];

const questions = [
  {q:"“Bãi dị dạng” trong archive nên được xếp vào thể loại nào?", a:["Tài liệu mật quốc gia","Di sản meme nội bộ","Báo cáo tài chính","Hướng dẫn học tập"], c:1},
  {q:"Khi một cuộc hẹn của hội bắt đầu bằng “5 phút nữa tới” thì xác suất cao nhất là gì?", a:["Mọi người đến đúng giờ","Có người đang tìm dép","Khái niệm thời gian bị thương lượng","Tất cả đã có mặt"], c:2},
  {q:"Nhiệm vụ tối quan trọng của một hội bạn thân là gì?", a:["Cùng nhau cười và hỗ trợ nhau","Chấm điểm đời tư nhau","Lưu mọi chuyện riêng tư để bêu","Thi đua xem ai bận nhất"], c:0},
  {q:"Mật danh chữ ký của archive là…", a:["bồn lình","bánh mì","bông linh","bồn binh"], c:0}
];

const $ = s => document.querySelector(s);
const envelope = $("#envelope");
const letterText = $("#letterText");

function randomWish(){
  let next = wishes[Math.floor(Math.random()*wishes.length)];
  if(letterText.textContent === next) next = wishes[(wishes.indexOf(next)+1)%wishes.length];
  letterText.textContent = next;
}
$("#openArchive").addEventListener("click",()=>$("#archive").scrollIntoView({behavior:"smooth"}));
envelope.addEventListener("click",()=>{ envelope.classList.toggle("open"); randomWish(); if(envelope.classList.contains("open")) burst("♡",16); });
$("#newWish").addEventListener("click",()=>{ randomWish(); burst("✿",8); });

function burst(symbols, count=24){
  const layer=$("#particles");
  for(let i=0;i<count;i++){
    const el=document.createElement("span"); el.className="particle";
    el.textContent=Array.isArray(symbols)?symbols[Math.floor(Math.random()*symbols.length)]:symbols;
    el.style.setProperty("--left",Math.random()*100+"%");
    el.style.setProperty("--x",(Math.random()*260-130)+"px");
    el.style.setProperty("--dur",(2.2+Math.random()*2.8)+"s");
    el.style.fontSize=(14+Math.random()*22)+"px";
    layer.appendChild(el); setTimeout(()=>el.remove(),5600);
  }
}
$("#flowerBtn").addEventListener("click",()=>burst(["🌸","🌷","✿","❀"],35));
$("#heartBtn").addEventListener("click",()=>burst(["♡","♥","🩷"],35));
$("#confettiBtn").addEventListener("click",()=>burst(["🎉","✦","•","♡","✿"],50));

let qi=0, score=0;
function renderQuestion(){
  const box=$("#quizBox"), item=questions[qi];
  box.innerHTML=`<div class="question">Câu ${qi+1}/${questions.length}: ${item.q}</div>
    <div class="answers">${item.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join("")}</div>`;
  box.querySelectorAll(".answer").forEach(btn=>btn.addEventListener("click",()=>answer(+btn.dataset.i)));
}
function answer(i){
  const item=questions[qi];
  $("#quizBox").querySelectorAll(".answer").forEach((b,n)=>{b.disabled=true;if(n===item.c)b.classList.add("correct");if(n===i&&n!==item.c)b.classList.add("wrong")});
  if(i===item.c)score++;
  setTimeout(()=>{
    qi++;
    if(qi<questions.length) renderQuestion();
    else {
      const percent=Math.round(score/questions.length*100);
      let label=percent===100?"Cấp độ: ARCHIVE LEGEND ✨":percent>=50?"Cấp độ: NGƯỜI TRONG CUỘC 🩷":"Cấp độ: TÂN BINH LORE 🌷";
      $("#quizBox").innerHTML=`<div class="quiz-result">${label}</div><p class="muted">Bạn đúng ${score}/${questions.length}. Không sao nếu sai — lore nội bộ có thể cập nhật bất cứ lúc nào.</p><button class="primary" id="retry">Chơi lại</button>`;
      $("#retry").addEventListener("click",()=>{qi=0;score=0;renderQuestion()});
      burst(["🎉","♡","✦"],30);
    }
  },650);
}
renderQuestion();

$("#audioFile").addEventListener("change", e=>{
  const file=e.target.files[0]; if(!file)return;
  const player=$("#audioPlayer");
  if(player.dataset.url) URL.revokeObjectURL(player.dataset.url);
  const url=URL.createObjectURL(file); player.dataset.url=url; player.src=url;
  $("#audioInfo").textContent=`Đang phát: ${file.name}`;
  player.play().catch(()=>{});
});
$("#musicToggle").addEventListener("click",()=>$("#audioFile").click());

document.addEventListener("click",e=>{
  if(e.target.closest("button") && Math.random()<0.12) burst(["♡","✦"],6);
});

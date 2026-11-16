/* ===== EDIT HERE: products (images: i1 trio, i2 gold, i3 red box, i4 navy) ===== */
const IMG={i1:"assets/perfume-1.jpg",i2:"assets/perfume-4.jpg",i3:"assets/perfume-3.jpg",i4:"assets/perfume-2.jpg"};
const P=[
["Aurum Noir","i2","#E6C77A",650,"Saffron, Amber, Oud"],["Midnight Flame","i4","#6FA8FF",720,"Bergamot, Cedar, Musk"],["Rouge Oud","i3","#E0525F",800,"Rose, Oud, Leather"],["Lavender Dusk","i1","#B58CFF",590,"Lavender, Iris, Vanilla"],
["Royal Amber","i2","#F0B84A",700,"Cardamom, Amber, Tonka"],["Blue Silk","i4","#4FC3F7",680,"Marine, Jasmine, Cashmere"],["Crimson Attar","i3","#FF7A8A",850,"Spice, Rose, Sandal"],["Violet Nights","i1","#C792EA",620,"Plum, Violet, Patchouli"],
["Desert Gold","i2","#FFD76A",760,"Citrus, Honey, Oud"],["Smoke & Sapphire","i4","#8AB4FF",890,"Pepper, Vetiver, Incense"],["Velvet Ruby","i3","#FF5C7A",780,"Cherry, Saffron, Amber"],["Orchid Mirage","i1","#D6A6FF",640,"Orchid, Pear, White Musk"],
["Sultan’s Whisper","i2","#E9C46A",950,"Neroli, Oud, Sandalwood"],["Arctic Oud","i4","#7FDBFF",830,"Mint, Oud, Ambergris"]
].map((a,i)=>({id:i+1,name:a[0],img:a[1],color:a[2],base:a[3],notes:a[4],sizes:{3:a[3],5:Math.round(a[3]*1.6/10)*10,10:Math.round(a[3]*2.8/10)*10},rating:(4.4+(i%6)/10).toFixed(1)}));
const REV=[["Rahim Uddin","Sylhet","Long-lasting and elegant. Compliments all day!"],["Nusrat Jahan","Dhaka","Packaging is gorgeous and the scent is unreal."],["Tanvir Ahmed","Chattogram","Best value perfume I’ve bought in Bangladesh."],["Farhana Akter","Sylhet","Rouge Oud is my new signature. Fast delivery too."],["Imran Hossain","Rajshahi","Premium quality. Everyone asks what I’m wearing."],["Sadia Islam","Khulna","Lavender Dusk is dreamy. Ordering again!"]];
const FAQ=[["How long does delivery take?","Sylhet 1–2 days, rest of Bangladesh 2–4 days."],["Are your perfumes authentic?","Yes. Every ELIXN fragrance is our own blend, sealed and quality-checked."],["How long does the scent last?","Typically 8–12 hours depending on skin and weather."],["Which sizes are available?","3 ml, 5 ml and 10 ml, each with its own price."],["Can I return a product?","Unopened products can be returned within 3 days of delivery."],["What payment methods do you accept?","Cash on delivery, and bKash/Nagad on confirmation via WhatsApp."],["Are the perfumes halal?","Yes, our blends are halal and alcohol-conscious."]];
/* ===== helpers ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],tk=n=>"৳"+n.toLocaleString("en-IN");
let cart=[];try{cart=JSON.parse(localStorage.getItem("elixn")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("elixn",JSON.stringify(cart))}catch(e){}$("#cc").textContent=cart.reduce((a,c)=>a+c.q,0);$("#cc").style.transform="scale(1.4)";setTimeout(()=>$("#cc").style.transform="",250)};
const toast=m=>{const t=$("#ts");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),1800)};
const card=p=>`<div class="card rev" data-id="${p.id}"><div class="im"><img loading="lazy" src="${IMG[p.img]}" alt="${p.name}"></div><div class="bd"><h3 style="color:${p.color}">${p.name}</h3><small>${p.notes}</small><span class="pr">From ${tk(p.sizes[3])}</span><span class="btn">View</span></div></div>`;
function bind(root){$$(root+" .card").forEach(c=>c.onclick=()=>location.hash="product-"+c.dataset.id);io.observe&&$$(root+" .rev").forEach(e=>io.observe(e))}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in")}}),{threshold:.12});
/* ===== shop ===== */
function renderShop(){const m=+$("#pr").value,s=$("#so").value;$("#pv").textContent=m;let l=P.filter(p=>p.sizes[3]<=m);
if(s=="lh")l.sort((a,b)=>a.base-b.base);if(s=="hl")l.sort((a,b)=>b.base-a.base);if(s=="az")l.sort((a,b)=>a.name.localeCompare(b.name));if(s=="new")l.sort((a,b)=>b.id-a.id);
const g=$("#sg");g.style.opacity=0;setTimeout(()=>{g.innerHTML=l.slice(0,15).map(card).join("")||"<p style='color:var(--mut)'>No products in this range.</p>";bind("#sg");g.style.transition="opacity .4s";g.style.opacity=1},180)}
$("#pr").oninput=renderShop;$("#so").onchange=renderShop;
/* ===== product ===== */
function renderProd(id){const p=P.find(x=>x.id==id)||P[0];let sz=3,q=1,im=p.img;const rel=P.filter(x=>x.id!=p.id).slice(0,4);
$("#pdv").innerHTML=`<div class="pd"><div><div class="zm" id="zm"><img id="mi" src="${IMG[im]}" alt="${p.name}"></div><div class="th">${["i1","i2","i3","i4"].map(k=>`<img src="${IMG[k]}" data-k="${k}" class="${k==im?"on":""}" alt="View">`).join("")}</div></div>
<div><h2 style="color:${p.color}">${p.name}</h2><div class="st">★★★★★ <span style="color:var(--mut)">${p.rating}</span></div><p style="color:var(--mut);margin:1rem 0">A refined ELIXN signature with warm, lasting character – made for evenings, celebrations and everyday elegance.</p>
<div class="notes"><div><b>Top</b>${p.notes.split(", ")[0]}</div><div><b>Heart</b>${p.notes.split(", ")[1]}</div><div><b>Base</b>${p.notes.split(", ")[2]}</div></div>
<div class="sz">${[3,5,10].map(s=>`<button data-s="${s}" class="${s==3?"on":""}">${s} ml</button>`).join("")}</div><div class="price" id="pp">${tk(p.sizes[3])}</div>
<div class="row"><div class="qty"><button id="qm">−</button><span id="qv">1</span><button id="qp">+</button></div><button class="btn mg" id="ac">Add to Cart</button><button class="btn out mg" id="bn">Buy Now</button></div></div></div>
<section><div class="title"><h2 class="gold">You May Also Like</h2></div><div class="grid" id="rl">${rel.map(card).join("")}</div></section>`;
$$(".th img").forEach(t=>t.onclick=()=>{$$(".th img").forEach(x=>x.classList.remove("on"));t.classList.add("on");$("#mi").src=IMG[t.dataset.k]});
$$(".sz button").forEach(b=>b.onclick=()=>{$$(".sz button").forEach(x=>x.classList.remove("on"));b.classList.add("on");sz=+b.dataset.s;const e=$("#pp");e.classList.add("sw");setTimeout(()=>{e.textContent=tk(p.sizes[sz]*q);e.classList.remove("sw")},200)});
const up=()=>{$("#qv").textContent=q;$("#pp").textContent=tk(p.sizes[sz]*q)};$("#qm").onclick=()=>{q=Math.max(1,q-1);up()};$("#qp").onclick=()=>{q++;up()};
const add=()=>{const k=p.id+"-"+sz,f=cart.find(c=>c.k==k);f?f.q+=q:cart.push({k,id:p.id,s:sz,q});save()};
$("#ac").onclick=()=>{add();toast("Added to cart ✓")};$("#bn").onclick=()=>{add();location.hash="cart"};
const z=$("#zm"),zi=$("#mi");z.onmousemove=e=>{const r=z.getBoundingClientRect();zi.style.transformOrigin=((e.clientX-r.left)/r.width*100)+"% "+((e.clientY-r.top)/r.height*100)+"%";zi.style.transform="scale(1.9)"};z.onmouseleave=()=>zi.style.transform="";bind("#rl")}
/* ===== cart ===== */
function renderCart(){const L=$("#cl");if(!cart.length){L.innerHTML="<p style='color:var(--mut);margin:1rem 0'>Your cart is empty.</p><a href='#shop' class='btn'>Go to Shop</a>";$("#sm").innerHTML="";return}
let sub=0;L.innerHTML=cart.map((c,i)=>{const p=P.find(x=>x.id==c.id),t=p.sizes[c.s]*c.q;sub+=t;return`<div class="ci"><img src="${IMG[p.img]}" alt="${p.name}"><div><b style="color:${p.color}">${p.name}</b><br><small style="color:var(--mut)">${c.s} ml · ${tk(p.sizes[c.s])}</small><br><span class="qty" style="margin-top:.4rem"><button data-i="${i}" data-d="-1">−</button><span>${c.q}</span><button data-i="${i}" data-d="1">+</button></span></div><div style="text-align:right">${tk(t)}<br><button class="rm" data-r="${i}">Remove</button></div></div>`}).join("");
const d=sub>=3000?0:80;$("#sm").innerHTML=`<div class="t"><span>Subtotal</span><span>${tk(sub)}</span></div><div class="t"><span>Delivery</span><span>${d?tk(d):"Free"}</span></div><div class="t" style="font-size:1.2em;color:var(--gold2)"><b>Total</b><b>${tk(sub+d)}</b></div>`;window._tot=sub+d;
$$("[data-d]").forEach(b=>b.onclick=()=>{cart[b.dataset.i].q=Math.max(1,cart[b.dataset.i].q+ +b.dataset.d);save();renderCart()});$$("[data-r]").forEach(b=>b.onclick=()=>{cart.splice(b.dataset.r,1);save();renderCart()})}
$("#of").onsubmit=e=>{e.preventDefault();if(!cart.length){toast("Cart is empty");return}const no="ELX-"+Math.floor(100000+Math.random()*900000);
$("#mo").innerHTML=`Order <b style="color:var(--gold2)">${no}</b><br>${cart.map(c=>{const p=P.find(x=>x.id==c.id);return`${p.name} · ${c.s}ml × ${c.q}`}).join("<br>")}<br><b style="color:var(--gold2)">Total ${tk(window._tot)}</b><br>Thank you, ${$("#n").value}!`;
$("#md").classList.add("on");cart=[];save();e.target.reset();renderCart()};$("#mc").onclick=()=>$("#md").classList.remove("on");
/* ===== router ===== */
function route(){const h=location.hash.slice(1)||"home";$$(".page").forEach(p=>p.classList.remove("on"));let id="home";
if(h=="shop"){id="shop";renderShop()}else if(h.startsWith("product-")){id="prod";renderProd(h.split("-")[1])}else if(h=="cart"){id="cart";renderCart()}
$("#p-"+id).classList.add("on");$("#lk").classList.remove("on");if(!window._s)scrollTo(0,0);window._s=0;$$("#p-"+id+" .rev").forEach(e=>io.observe(e));vp()}
addEventListener("hashchange",route);
$$("[data-s]").forEach(a=>{if(!a.dataset.s||a.tagName!="A")return;a.onclick=e=>{e.preventDefault();const t=a.dataset.s;const go=()=>setTimeout(()=>document.getElementById(t).scrollIntoView({behavior:"smooth"}),80);if(location.hash&&location.hash!="#home"){window._s=1;location.hash="home";go()}else go();$("#lk").classList.remove("on")}});
/* ===== home content ===== */
$("#fg").innerHTML=P.slice(0,6).map(card).join("");bind("#fg");
$("#rt").innerHTML=REV.map(r=>`<div class="rs"><div class="rc"><div class="st">★★★★★</div><q>${r[2]}</q><b>${r[0]}</b><br><small style="color:var(--mut)">${r[1]}</small></div></div>`).join("");
$("#dt").innerHTML=REV.map((_,i)=>`<button aria-label="Review ${i+1}"></button>`).join("");
let ri=0,tm;const go=i=>{ri=(i+REV.length)%REV.length;$("#rt").style.transform=`translateX(-${ri*100}%)`;$$("#dt button").forEach((b,j)=>b.classList.toggle("on",j==ri))};
const auto=()=>{clearInterval(tm);tm=setInterval(()=>go(ri+1),4500)};$$("#dt button").forEach((b,i)=>b.onclick=()=>{go(i);auto()});go(0);auto();
let sx=0;$("#rv").ontouchstart=e=>sx=e.touches[0].clientX;$("#rv").ontouchend=e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(ri+(d<0?1:-1));auto()}};
$("#fq").innerHTML=FAQ.map(f=>`<div class="fq"><button>${f[0]}</button><div><p>${f[1]}</p></div></div>`).join("");
$$(".fq button").forEach(b=>b.onclick=()=>{const f=b.parentElement,o=f.classList.contains("on");$$(".fq").forEach(x=>x.classList.remove("on"));if(!o)f.classList.add("on")});
/* ===== video: autoplay in view, no controls ===== */
const v=$("#vd");v.controls=false;v.addEventListener("pause",()=>{if(vis&&!document.hidden)v.play().catch(()=>{})});let vis=false;
new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;vis?v.play().catch(()=>{}):v.pause()}),{threshold:.35}).observe(v);
function vp(){}
/* ===== header, burger, cursor, magnetic, parallax, particles ===== */
addEventListener("scroll",()=>$("#hd").classList.toggle("sc",scrollY>40),{passive:true});$("#bg").onclick=()=>$("#lk").classList.toggle("on");
const cd=$("#cd"),cr=$("#cr");let mx=0,my=0,rx=0,ry=0;addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cd.style.transform=`translate(${mx}px,${my}px)`});
(function l(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;cr.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(l)})();
document.addEventListener("mouseover",e=>cr.classList.toggle("h",!!e.target.closest("a,button,.card,input,select")));
document.addEventListener("mousemove",e=>{const b=e.target.closest(".mg");$$(".mg").forEach(x=>x.style.transform="");if(b){const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`}});
addEventListener("scroll",()=>{const h=$("#hi");if(h&&scrollY<900)h.style.translate=`0 ${scrollY*.12}px`},{passive:true});
const cv=$("#fx"),cx=cv.getContext("2d");let W,H,pts=[];const rs=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;pts=Array.from({length:Math.min(70,W/14|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.4,s:Math.random()*.4+.1,a:Math.random()}))};
addEventListener("resize",rs);rs();(function f(){cx.clearRect(0,0,W,H);pts.forEach(p=>{p.y-=p.s;p.x+=Math.sin(p.y/40)*.3;p.a+=.01;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}cx.globalAlpha=.25+.35*Math.abs(Math.sin(p.a));cx.fillStyle="#E6C77A";cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()});requestAnimationFrame(f)})();
save();route();
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const b="modulepreload",S=function(e){return"/AchiMind/"+e},g={},C=function(t,c,i){let o=Promise.resolve();if(c&&c.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),a=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));o=Promise.allSettled(c.map(s=>{if(s=S(s),s in g)return;g[s]=!0;const l=s.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${d}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":b,l||(u.as="script"),u.crossOrigin="",u.href=s,a&&u.setAttribute("nonce",a),document.head.appendChild(u),l)return new Promise((v,y)=>{u.addEventListener("load",v),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${s}`)))})}))}function n(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return o.then(r=>{for(const a of r||[])a.status==="rejected"&&n(a.reason);return t().catch(n)})};let f=!1;document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("loading");try{if(f){e&&(e.style.display="none");return}e&&(e.style.display="flex");const[t,c]=await Promise.all([p("header","header.html"),p("footer","footer.html")]);if(!t||!c)throw new Error("Failed to load components");L(),j();const i=window.location.hash.slice(1)||"overview";await w(i),f=!0,e&&(e.style.display="none")}catch(t){console.error("Initialization error:",t),e&&(e.innerHTML=`
                <div class="text-center">
                    <div class="text-red-600 mb-4">
                        <i class="fas fa-exclamation-circle text-4xl"></i>
                    </div>
                    <p class="text-gray-600">加载失败，请刷新页面重试</p>
                    <p class="text-sm text-gray-500 mt-2">${t.message}</p>
                </div>
            `)}});async function p(e,t){try{const c=window.location.pathname.endsWith("/")?window.location.pathname:window.location.pathname+"/",i=await fetch(`${c}src/components/${t}`);if(!i.ok)throw new Error(`Failed to load component: ${t}`);const o=await i.text();return document.getElementById(e).innerHTML=o,!0}catch(c){return console.error(`Error loading component ${t}:`,c),!1}}async function w(e){console.log("Loading page:",e);try{document.querySelectorAll(".page").forEach(s=>{s.classList.add("page-hidden")});const t=window.location.pathname.endsWith("/")?window.location.pathname:window.location.pathname+"/",c=await fetch(`${t}src/pages/${e}.html`);if(!c.ok)throw new Error(`Failed to load page: ${e}`);const i=await c.text(),o=document.getElementById("content");o&&(o.innerHTML=i,o.classList.remove("page-hidden"),o.classList.add("page-transition"));const n=localStorage.getItem("selectedProject")||"上海金融中心智能化项目",r=h[n];if(e==="overview"&&r){const s=document.querySelector(".project-title");s&&(s.textContent=n);const l=document.querySelector(".project-info");l&&(l.innerHTML=`项目编号: ${r.id} | 竣工日期: ${r.completionDate}`);const d=document.querySelectorAll(".stat-card");d.length>=4&&(d[0].querySelector(".stat-value").textContent=r.documents.toLocaleString(),d[1].querySelector(".stat-value").textContent=r.nodes.toLocaleString(),d[2].querySelector(".stat-value").textContent=r.videos.toLocaleString(),d[3].querySelector(".stat-value").textContent=r.standards.toLocaleString())}const a=document.querySelector(".project-selector button span");a&&(a.textContent=n);try{const s=`${t}src/scripts/pages/${e}.js`;console.log("Loading script from:",s);const l=await import(s);console.log("Script loaded successfully"),l.init&&(e==="overview"?await l.init(!1,r):await l.init())}catch(s){console.warn(`No specific script found for ${e}:`,s),e==="overview"&&await P()}}catch(t){throw console.error(`Error loading page ${e}:`,t),t}}function L(){document.addEventListener("click",e=>{const t=e.target.closest(".nav-link");if(t){e.preventDefault();const c=t.getAttribute("data-page");E(c)}})}function E(e){console.log("Switching to page:",e),document.querySelectorAll(".nav-link").forEach(t=>{t.classList.remove("active"),t.getAttribute("data-page")===e&&t.classList.add("active")}),window.location.hash=e,w(e)}const h={上海金融中心智能化项目:{id:"SHFC-2023-001",completionDate:"2023-09-15",documents:1248,nodes:3756,videos:42,standards:87},北京中心大厦智能化项目:{id:"BJC-2023-002",completionDate:"2023-10-20",documents:1560,nodes:4200,videos:38,standards:92},广州城投大厦智能化项目:{id:"GZCT-2023-003",completionDate:"2023-11-15",documents:980,nodes:2800,videos:35,standards:75},深圳地铁大厦智能化项目:{id:"SZDT-2023-004",completionDate:"2023-12-10",documents:1350,nodes:3200,videos:45,standards:85}};function j(){const e=document.querySelector(".project-selector button"),t=document.querySelector(".project-selector .dropdown-menu"),c=e.querySelector("span");if(e&&t){const i=localStorage.getItem("selectedProject")||"上海金融中心智能化项目";c.textContent=i,m(i),e.addEventListener("click",()=>{t.classList.toggle("hidden")}),document.addEventListener("click",n=>{!e.contains(n.target)&&!t.contains(n.target)&&t.classList.add("hidden")}),t.querySelectorAll("a").forEach(n=>{n.addEventListener("click",r=>{r.preventDefault();const a=n.textContent.trim();c.textContent=a,t.classList.add("hidden"),m(a)})})}}function m(e){var i;console.log("Updating project content for:",e),localStorage.setItem("selectedProject",e);const t=h[e];if(!t)return;((i=document.querySelector(".nav-link.active"))==null?void 0:i.getAttribute("data-page"))==="overview"&&k(t)}function k(e){const t=localStorage.getItem("selectedProject"),c=document.querySelector(".project-title");c&&(c.textContent=t);const i=document.querySelector(".project-info");i&&(i.innerHTML=`项目编号: ${e.id} | 竣工日期: ${e.completionDate}`);const o=document.querySelectorAll(".stat-card");o.length>=4&&(o[0].querySelector(".stat-value").textContent=e.documents.toLocaleString(),o[1].querySelector(".stat-value").textContent=e.nodes.toLocaleString(),o[2].querySelector(".stat-value").textContent=e.videos.toLocaleString(),o[3].querySelector(".stat-value").textContent=e.standards.toLocaleString()),C(()=>import("../scripts/pages/overview.js?v="+new Date().getTime()),[]).then(n=>{n.init&&n.init(!0,e)})}async function P(e=null){console.log("Initializing knowledge graph preview");try{const t=document.querySelector(".knowledge-graph-preview");if(!t){console.error("Knowledge graph container not found");return}if(console.log("Found graph container:",t),typeof vis>"u"){console.error("vis.js is not loaded");return}console.log("vis.js is loaded"),window.currentNetwork&&(window.currentNetwork.destroy(),window.currentNetwork=null),t.style.border="1px solid #ddd",t.style.backgroundColor="#ffffff";const c=localStorage.getItem("selectedProject")||"上海金融中心智能化项目";console.log("Selected project:",c);const i=q(c),o=x(c);console.log("Node data:",i),console.log("Edge data:",o);const n=new vis.DataSet(i),r=new vis.DataSet(o),a={nodes:{shape:"dot",size:30,font:{size:16,color:"#333",face:"Arial"},borderWidth:2,shadow:!0,color:{border:"#2B7CE9",background:"#97C2FC"}},edges:{width:2,color:{color:"#848484",highlight:"#848484",hover:"#848484"},arrows:{to:{enabled:!0,scaleFactor:.5}},smooth:{type:"continuous"}},physics:{enabled:!0,barnesHut:{gravitationalConstant:-2e3,centralGravity:.3,springLength:200,springConstant:.04,damping:.09},stabilization:{enabled:!0,iterations:1e3,updateInterval:100}},interaction:{hover:!0,tooltipDelay:200,zoomView:!0,dragView:!0},layout:{randomSeed:2}};console.log("Creating network with options:",a),window.currentNetwork=new vis.Network(t,{nodes:n,edges:r},a),window.currentNetwork.once("stabilizationIterationsDone",()=>{console.log("Knowledge graph stabilized"),window.currentNetwork.fit()}),window.currentNetwork.on("click",function(s){if(s.nodes.length>0){const l=s.nodes[0],d=n.get(l);console.log("Clicked node:",d)}}),console.log("Knowledge graph preview initialization completed")}catch(t){throw console.error("Error initializing knowledge graph preview:",t),t}}function q(e){const t={上海金融中心智能化项目:[{id:1,label:"BA系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:2,label:"DDC控制器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:3,label:"操作手册",group:"document",color:{background:"#B1FFB1",border:"#41E041"}},{id:4,label:"温度传感器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:5,label:"照明控制",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}}],北京中心大厦智能化项目:[{id:1,label:"安防系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:2,label:"监控设备",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:3,label:"技术文档",group:"document",color:{background:"#B1FFB1",border:"#41E041"}},{id:4,label:"门禁系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:5,label:"读卡器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}}]};return t[e]||t.上海金融中心智能化项目}function x(e){return[{from:1,to:2,label:"控制",arrows:"to"},{from:2,to:3,label:"关联",arrows:"to"},{from:1,to:4,label:"监测",arrows:"to"},{from:1,to:5,label:"包含",arrows:"to"}]}

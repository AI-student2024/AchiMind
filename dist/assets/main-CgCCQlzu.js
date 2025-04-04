(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();let u=!1;document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("loading");try{if(u){e&&(e.style.display="none");return}e&&(e.style.display="flex");const[t,r]=await Promise.all([g("header","header.html"),g("footer","footer.html")]);if(!t||!r)throw new Error("Failed to load components");h(),y();const c=window.location.hash.slice(1)||"overview";await f(c),u=!0,e&&(e.style.display="none")}catch(t){console.error("Initialization error:",t),e&&(e.innerHTML=`
                <div class="text-center">
                    <div class="text-red-600 mb-4">
                        <i class="fas fa-exclamation-circle text-4xl"></i>
                    </div>
                    <p class="text-gray-600">加载失败，请刷新页面重试</p>
                    <p class="text-sm text-gray-500 mt-2">${t.message}</p>
                </div>
            `)}});async function g(e,t){try{const r=window.location.pathname.endsWith("/")?window.location.pathname:window.location.pathname+"/",c=await fetch(`${r}src/components/${t}`);if(!c.ok)throw new Error(`Failed to load component: ${t}`);const o=await c.text();return document.getElementById(e).innerHTML=o,!0}catch(r){return console.error(`Error loading component ${t}:`,r),!1}}async function f(e){console.log("Loading page:",e);try{document.querySelectorAll(".page").forEach(a=>{a.classList.add("page-hidden")});const t=window.location.pathname.endsWith("/")?window.location.pathname:window.location.pathname+"/",r=await fetch(`${t}src/pages/${e}.html`);if(!r.ok)throw new Error(`Failed to load page: ${e}`);const c=await r.text(),o=document.getElementById("content");o&&(o.innerHTML=c,o.classList.remove("page-hidden"),o.classList.add("page-transition"));const n=localStorage.getItem("selectedProject")||"上海金融中心智能化项目",i=w[n];if(e==="overview"&&i){const a=document.querySelector(".project-title");a&&(a.textContent=n);const l=document.querySelector(".project-info");l&&(l.innerHTML=`项目编号: ${i.id} | 竣工日期: ${i.completionDate}`);const d=document.querySelectorAll(".stat-card");d.length>=4&&(d[0].querySelector(".stat-value").textContent=i.documents.toLocaleString(),d[1].querySelector(".stat-value").textContent=i.nodes.toLocaleString(),d[2].querySelector(".stat-value").textContent=i.videos.toLocaleString(),d[3].querySelector(".stat-value").textContent=i.standards.toLocaleString())}const s=document.querySelector(".project-selector button span");s&&(s.textContent=n);try{const a=`${t}src/scripts/pages/${e}.js`;console.log("Loading script from:",a);const l=await import(a);console.log("Script loaded successfully"),l.init&&(e==="overview"?await l.init(!1,i):await l.init())}catch(a){console.warn(`No specific script found for ${e}:`,a),(e==="overview"||e==="knowledge-graph")&&await m(i)}}catch(t){throw console.error(`Error loading page ${e}:`,t),t}}function h(){document.addEventListener("click",e=>{const t=e.target.closest(".nav-link");if(t){e.preventDefault();const r=t.getAttribute("data-page");v(r)}})}function v(e){console.log("Switching to page:",e),document.querySelectorAll(".nav-link").forEach(t=>{t.classList.remove("active"),t.getAttribute("data-page")===e&&t.classList.add("active")}),window.location.hash=e,f(e)}const w={上海金融中心智能化项目:{id:"SHFC-2023-001",completionDate:"2023-09-15",documents:1248,nodes:3756,videos:42,standards:87},北京中心大厦智能化项目:{id:"BJC-2023-002",completionDate:"2023-10-20",documents:1560,nodes:4200,videos:38,standards:92},广州城投大厦智能化项目:{id:"GZCT-2023-003",completionDate:"2023-11-15",documents:980,nodes:2800,videos:35,standards:75},深圳地铁大厦智能化项目:{id:"SZDT-2023-004",completionDate:"2023-12-10",documents:1350,nodes:3200,videos:45,standards:85}};function y(){const e=document.querySelector(".project-selector button"),t=document.querySelector(".project-selector .dropdown-menu"),r=e.querySelector("span");if(e&&t){const c=localStorage.getItem("selectedProject")||"上海金融中心智能化项目";r.textContent=c,p(c),e.addEventListener("click",()=>{t.classList.toggle("hidden")}),document.addEventListener("click",n=>{!e.contains(n.target)&&!t.contains(n.target)&&t.classList.add("hidden")}),t.querySelectorAll("a").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault();const s=n.textContent.trim();r.textContent=s,t.classList.add("hidden"),p(s)})})}}function p(e){var c;console.log("Updating project content for:",e),localStorage.setItem("selectedProject",e);const t=w[e];if(!t)return;((c=document.querySelector(".nav-link.active"))==null?void 0:c.getAttribute("data-page"))==="overview"&&b(t)}function b(e){const t=localStorage.getItem("selectedProject"),r=document.querySelector(".project-title");r&&(r.textContent=t);const c=document.querySelector(".project-info");c&&(c.innerHTML=`项目编号: ${e.id} | 竣工日期: ${e.completionDate}`);const o=document.querySelectorAll(".stat-card");o.length>=4&&(o[0].querySelector(".stat-value").textContent=e.documents.toLocaleString(),o[1].querySelector(".stat-value").textContent=e.nodes.toLocaleString(),o[2].querySelector(".stat-value").textContent=e.videos.toLocaleString(),o[3].querySelector(".stat-value").textContent=e.standards.toLocaleString()),m(e)}async function m(e=null){console.log("Initializing knowledge graph preview");try{const t=document.querySelector(".knowledge-graph-preview");if(!t){console.error("Knowledge graph container not found");return}if(console.log("Found graph container:",t),typeof vis>"u"){console.error("vis.js is not loaded");return}console.log("vis.js is loaded"),window.currentNetwork&&(window.currentNetwork.destroy(),window.currentNetwork=null),t.style.border="1px solid #ddd",t.style.backgroundColor="#ffffff";const r=localStorage.getItem("selectedProject")||"上海金融中心智能化项目";console.log("Selected project:",r);const c=S(r),o=C(r);console.log("Node data:",c),console.log("Edge data:",o);const n=new vis.DataSet(c),i=new vis.DataSet(o),s={nodes:{shape:"dot",size:30,font:{size:16,color:"#333",face:"Arial"},borderWidth:2,shadow:!0,color:{border:"#2B7CE9",background:"#97C2FC"}},edges:{width:2,color:{color:"#848484",highlight:"#848484",hover:"#848484"},arrows:{to:{enabled:!0,scaleFactor:.5}},smooth:{type:"continuous"}},physics:{enabled:!0,barnesHut:{gravitationalConstant:-2e3,centralGravity:.3,springLength:200,springConstant:.04,damping:.09},stabilization:{enabled:!0,iterations:1e3,updateInterval:100}},interaction:{hover:!0,tooltipDelay:200,zoomView:!0,dragView:!0},layout:{randomSeed:2}};console.log("Creating network with options:",s),window.currentNetwork=new vis.Network(t,{nodes:n,edges:i},s),window.currentNetwork.once("stabilizationIterationsDone",()=>{console.log("Knowledge graph stabilized"),window.currentNetwork.fit()}),window.currentNetwork.on("click",function(a){if(a.nodes.length>0){const l=a.nodes[0],d=n.get(l);console.log("Clicked node:",d)}}),console.log("Knowledge graph preview initialization completed")}catch(t){throw console.error("Error initializing knowledge graph preview:",t),t}}function S(e){const t={上海金融中心智能化项目:[{id:1,label:"BA系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:2,label:"DDC控制器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:3,label:"操作手册",group:"document",color:{background:"#B1FFB1",border:"#41E041"}},{id:4,label:"温度传感器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:5,label:"照明控制",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}}],北京中心大厦智能化项目:[{id:1,label:"安防系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:2,label:"监控设备",group:"device",color:{background:"#FFB1B1",border:"#E04141"}},{id:3,label:"技术文档",group:"document",color:{background:"#B1FFB1",border:"#41E041"}},{id:4,label:"门禁系统",group:"system",color:{background:"#97C2FC",border:"#2B7CE9"}},{id:5,label:"读卡器",group:"device",color:{background:"#FFB1B1",border:"#E04141"}}]};return t[e]||t.上海金融中心智能化项目}function C(e){return[{from:1,to:2,label:"控制",arrows:"to"},{from:2,to:3,label:"关联",arrows:"to"},{from:1,to:4,label:"监测",arrows:"to"},{from:1,to:5,label:"包含",arrows:"to"}]}

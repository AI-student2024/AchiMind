(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const L="modulepreload",w=function(e){return"/AchiMind/"+e},u={},E=function(t,r,c){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=Promise.allSettled(r.map(a=>{if(a=w(a),a in u)return;u[a]=!0;const l=a.endsWith(".css"),y=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${y}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":L,l||(d.as="script"),d.crossOrigin="",d.href=a,s&&d.setAttribute("nonce",s),document.head.appendChild(d),l)return new Promise((h,S)=>{d.addEventListener("load",h),d.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${a}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return n.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return t().catch(o)})};let f=!1;document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("loading");try{if(f){e&&(e.style.display="none");return}e&&(e.style.display="flex");const[t,r]=await Promise.all([m("header","components/header.html"),m("footer","components/footer.html")]);if(!t||!r)throw new Error("Failed to load components");P(),q();const c=window.location.hash.slice(1)||"overview";await g(c),f=!0,e&&(e.style.display="none")}catch(t){console.error("Initialization error:",t),e&&(e.innerHTML=`
                <div class="text-center">
                    <div class="text-red-600 mb-4">
                        <i class="fas fa-exclamation-circle text-4xl"></i>
                    </div>
                    <p class="text-gray-600">加载失败，请刷新页面重试</p>
                    <p class="text-sm text-gray-500 mt-2">${t.message}</p>
                </div>
            `)}});async function m(e,t){try{const r=await fetch(`./src/components/${t}`);if(!r.ok)throw new Error(`Failed to load component: ${t}`);const c=await r.text();return document.getElementById(e).innerHTML=c,!0}catch(r){return console.error(`Error loading component ${t}:`,r),!1}}async function g(e){console.log("Loading page:",e);try{document.querySelectorAll(".page").forEach(s=>{s.classList.add("page-hidden")});const t=await fetch(`./src/pages/${e}.html`);if(!t.ok)throw new Error(`Failed to load page: ${e}`);const r=await t.text(),c=document.getElementById("content");c&&(c.innerHTML=r,c.classList.remove("page-hidden"),c.classList.add("page-transition"));const n=localStorage.getItem("selectedProject")||"上海金融中心智能化项目",o=v[n];if(e==="overview"&&o){const s=document.querySelector(".project-title");s&&(s.textContent=n);const a=document.querySelector(".project-info");a&&(a.innerHTML=`项目编号: ${o.id} | 竣工日期: ${o.completionDate}`);const l=document.querySelectorAll(".stat-card");l.length>=4&&(l[0].querySelector(".stat-value").textContent=o.documents.toLocaleString(),l[1].querySelector(".stat-value").textContent=o.nodes.toLocaleString(),l[2].querySelector(".stat-value").textContent=o.videos.toLocaleString(),l[3].querySelector(".stat-value").textContent=o.standards.toLocaleString())}const i=document.querySelector(".project-selector button span");i&&(i.textContent=n);try{const a=await import(`./src/scripts/pages/${e}.js`+"?v="+new Date().getTime());console.log("Loaded script for:",e),a.init&&(e==="overview"?await a.init(!1,o):await a.init())}catch(s){console.warn(`No specific script found for ${e}:`,s)}}catch(t){throw console.error(`Error loading page ${e}:`,t),t}}function P(){document.addEventListener("click",e=>{const t=e.target.closest(".nav-link");if(t){e.preventDefault();const r=t.getAttribute("data-page");j(r)}})}function j(e){console.log("Switching to page:",e),document.querySelectorAll(".nav-link").forEach(t=>{t.classList.remove("active"),t.getAttribute("data-page")===e&&t.classList.add("active")}),window.location.hash=e,g(e)}const v={上海金融中心智能化项目:{id:"SHFC-2023-001",completionDate:"2023-09-15",documents:1248,nodes:3756,videos:42,standards:87},北京中心大厦智能化项目:{id:"BJC-2023-002",completionDate:"2023-10-20",documents:1560,nodes:4200,videos:38,standards:92},广州城投大厦智能化项目:{id:"GZCT-2023-003",completionDate:"2023-11-15",documents:980,nodes:2800,videos:35,standards:75},深圳地铁大厦智能化项目:{id:"SZDT-2023-004",completionDate:"2023-12-10",documents:1350,nodes:3200,videos:45,standards:85}};function q(){const e=document.querySelector(".project-selector button"),t=document.querySelector(".project-selector .dropdown-menu"),r=e.querySelector("span");if(e&&t){const c=localStorage.getItem("selectedProject")||"上海金融中心智能化项目";r.textContent=c,p(c),e.addEventListener("click",()=>{t.classList.toggle("hidden")}),document.addEventListener("click",o=>{!e.contains(o.target)&&!t.contains(o.target)&&t.classList.add("hidden")}),t.querySelectorAll("a").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const s=o.textContent.trim();r.textContent=s,t.classList.add("hidden"),p(s)})})}}function p(e){var c;console.log("Updating project content for:",e),localStorage.setItem("selectedProject",e);const t=v[e];if(!t)return;((c=document.querySelector(".nav-link.active"))==null?void 0:c.getAttribute("data-page"))==="overview"&&x(t)}function x(e){const t=localStorage.getItem("selectedProject"),r=document.querySelector(".project-title");r&&(r.textContent=t);const c=document.querySelector(".project-info");c&&(c.innerHTML=`项目编号: ${e.id} | 竣工日期: ${e.completionDate}`);const n=document.querySelectorAll(".stat-card");n.length>=4&&(n[0].querySelector(".stat-value").textContent=e.documents.toLocaleString(),n[1].querySelector(".stat-value").textContent=e.nodes.toLocaleString(),n[2].querySelector(".stat-value").textContent=e.videos.toLocaleString(),n[3].querySelector(".stat-value").textContent=e.standards.toLocaleString()),E(()=>import("../scripts/pages/overview.js?v="+new Date().getTime()),[]).then(o=>{o.init&&o.init(!0,e)})}

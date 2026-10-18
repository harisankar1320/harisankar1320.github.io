const user = "harisankar1320";
const container = document.getElementById("repos");
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function loadRepos(){
 try{
  const r=await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100&type=public`);
  if(!r.ok) throw new Error("GitHub API unavailable");
  const repos=(await r.json()).filter(x=>!x.fork&&!x.archived&&x.name!==`${user}.github.io`).sort((a,b)=>new Date(b.pushed_at||b.updated_at)-new Date(a.pushed_at||a.updated_at)).slice(0,12);
  container.innerHTML=repos.length?repos.map(x=>`<a class="repo-card" href="${esc(x.html_url)}" target="_blank" rel="noopener"><h4>${esc(x.name.replace(/[-_]/g," "))} ↗</h4><p>${esc(x.description||"Public repository. Open on GitHub to explore the code and project details.")}</p><div class="repo-foot"><span class="repo-lang">${esc(x.language||"Repository")}</span><span>★ ${x.stargazers_count||0} · forks ${x.forks_count||0}</span></div></a>`).join(""):`<p class="loading">No public repositories returned. <a href="https://github.com/${user}?tab=repositories">Browse GitHub ↗</a></p>`;
 }catch(e){container.innerHTML=`<p class="loading">Could not load repositories right now. <a href="https://github.com/${user}?tab=repositories">View all repositories on GitHub ↗</a></p>`;}
}
const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
// Replace this placeholder with your actual LinkedIn profile URL.
const linkedinUrl="https://www.linkedin.com/";
["linkedin","linkedin2"].forEach(id=>document.getElementById(id).href=linkedinUrl);
loadRepos();

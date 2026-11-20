(()=> {
const $=id=>document.getElementById(id);
const KEY='yenn_studio_v3';
const style=document.createElement('style');
style.textContent=':root{--accent:#39ff88;--accent2:#a5ffc8}body{background-image:radial-gradient(ellipse at 50% -20%,rgba(57,255,136,.09),transparent 55%),linear-gradient(180deg,#090d0d,#0b1012 55%,#090c10)}header,nav{background:rgba(7,12,13,.97)}.logo{background:linear-gradient(135deg,#101a18,var(--accent));color:#06110b;box-shadow:0 0 18px color-mix(in srgb,var(--accent) 25%,transparent)}input[type=color]{height:48px;padding:4px;cursor:pointer}.metric{font:12px ui-monospace,monospace;color:var(--accent2)}.history-row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--line)}';
style.textContent += '.tile{position:relative;overflow:hidden;min-height:136px;padding:18px;border:1px solid color-mix(in srgb,var(--accent) 24%,var(--line));background:linear-gradient(145deg,rgba(255,255,255,.075),transparent 45%),linear-gradient(135deg,#1b2230,#111720);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 8px 22px rgba(0,0,0,.22);transition:transform .18s,border-color .18s,box-shadow .18s}.tile:active{transform:scale(.97);border-color:var(--accent);box-shadow:0 0 22px color-mix(in srgb,var(--accent) 20%,transparent)}.tile .emoji{display:grid;place-items:center;width:48px;height:48px;margin-bottom:12px;border-radius:15px;background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 22%,#202837),#171d29);border:1px solid color-mix(in srgb,var(--accent) 32%,var(--line));font-size:27px;box-shadow:0 5px 16px rgba(0,0,0,.25)}.tile b{font-size:16px;letter-spacing:.1px}.tile>span:last-child{font-size:12px;line-height:1.45}nav{display:flex;justify-content:space-around;gap:3px;padding:9px 5px calc(8px + env(safe-area-inset-bottom));border-top:1px solid color-mix(in srgb,var(--accent) 22%,var(--line));background:rgba(7,12,13,.96);backdrop-filter:blur(22px)}nav button{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:8px 2px;border-radius:14px;background:transparent;color:var(--muted);font-size:10px;transition:background .18s,color .18s}nav button strong{display:grid;place-items:center;width:35px;height:32px;border-radius:11px;font-size:21px;font-weight:500}nav button.active{color:var(--accent2);background:color-mix(in srgb,var(--accent) 10%,transparent)}nav button.active strong{background:color-mix(in srgb,var(--accent) 17%,transparent);box-shadow:0 0 16px color-mix(in srgb,var(--accent) 18%,transparent)}';
document.head.append(style);
const addSection=(html,anchor)=>{anchor.insertAdjacentHTML('beforebegin',html)};
const home=document.querySelector('#home .grid');
if(home) home.insertAdjacentHTML('afterbegin','<button class="tile" onclick="yennCommand()"><span class="emoji">⚡</span><b>Command Center</b><span>Live local workspace metrics</span></button>');
const settings=document.querySelector('#settings .card');
if(settings) settings.insertAdjacentHTML('afterbegin','<div class="card"><h2>Custom accent color</h2><p>Choose any color for the YENN interface.</p><input id="yennColor" type="color" value="#39ff88" oninput="yennSetColor(this.value)"></div>');
const ext=document.querySelector('#library .card');
if(ext) ext.insertAdjacentHTML('afterbegin','<div class="card"><h2>YENN Extensions</h2><p>Built-in themes you can apply instantly.</p><div class="item"><b>Cyber Green</b><button class="btn secondary small" onclick="yennSetColor(\'#39ff88\')">Apply</button></div><div class="item"><b>Ice Blue</b><button class="btn secondary small" onclick="yennSetColor(\'#36a8ff\')">Apply</button></div><div class="item"><b>Violet</b><button class="btn secondary small" onclick="yennSetColor(\'#a77aff\')">Apply</button></div></div>');
const projectEditor=$('projectEditor');
if(projectEditor) projectEditor.insertAdjacentHTML('beforeend','<div class="card"><h2>Visual component builder</h2><p class="sub">Insert editable HTML elements into your current project.</p><div class="toolbar"><button class="btn secondary small" onclick="yennInsert(1)">＋ Hero section</button><button class="btn secondary small" onclick="yennInsert(2)">＋ Info card</button><button class="btn secondary small" onclick="yennInsert(3)">＋ Action button</button></div><h2>Local version history</h2><div id="yennHistory" class="sub">Save a project to create a restore point.</div></div>');
const code=$('code');
if(code){const meta=document.createElement('div');meta.className='code-meta';meta.id='yennEditorMeta';meta.style.cssText='font:11px ui-monospace,monospace;color:var(--muted);padding:7px 0';code.insertAdjacentElement('afterend',meta);const update=()=>{meta.textContent=code.value.split('\n').length+' lines • '+code.value.length+' characters • local draft autosave';try{localStorage.setItem(KEY+'_draft',JSON.stringify({name:$('fileName').value,language:$('language').value,code:code.value}));}catch(e){meta.textContent+=' • storage full';}};code.addEventListener('input',update);update();try{const d=JSON.parse(localStorage.getItem(KEY+'_draft')||'null');if(d&&d.code&&!code.value){code.value=d.code;$('fileName').value=d.name||'draft.js';$('language').value=d.language||'javascript';update();}}catch(e){}}
window.yennSetColor=c=>{document.documentElement.style.setProperty('--accent',c);document.documentElement.style.setProperty('--accent2',c);try{localStorage.setItem('yenn_custom_accent',c)}catch(e){}};
try{const c=localStorage.getItem('yenn_custom_accent');if(c){window.yennSetColor(c);if($('yennColor'))$('yennColor').value=c}}catch(e){}
window.yennCommand=()=>{let d={projects:0,snippets:0};try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');d.projects=(x.projects||[]).length;d.snippets=(x.snippets||[]).length;}catch(e){}const bytes=new Blob([localStorage.getItem(KEY)||'']).size;document.getElementById('yennCommandPanel')?.remove();const panel=document.createElement('section');panel.id='yennCommandPanel';panel.className='card';panel.innerHTML='<h2>YENN Command Center</h2><p>Live local workspace metrics</p><div class="grid"><div><div class="stat">'+d.projects+'</div><div class="sub">Projects</div></div><div><div class="stat">'+d.snippets+'</div><div class="sub">Snippets</div></div><div><div class="stat">'+(bytes/1024).toFixed(1)+' KB</div><div class="sub">Workspace data</div></div></div><p class="sub">Local browser storage only. No device monitoring or cloud connection.</p>';const main=document.querySelector('main');main.prepend(panel);panel.scrollIntoView({behavior:'smooth'});};
window.yennInsert=n=>{const a=$('pHtml');if(!a)return;const parts=['<section class="hero"><h1>Welcome to my project</h1><p>A short introduction goes here.</p></section>','<article class="card"><h2>Card title</h2><p>Add information here.</p></article>','<button type="button" onclick="alert(\'Button works!\')">Click me</button>'];const i=a.value.toLowerCase().lastIndexOf('</body>');a.value=i>=0?a.value.slice(0,i)+parts[n-1]+a.value.slice(i):a.value+parts[n-1];};
const oldSave=window.saveProject;
if(typeof oldSave==='function'){window.saveProject=function(){let prior=null;try{prior=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){}oldSave();if(prior){let hist=[];try{hist=JSON.parse(localStorage.getItem(KEY+'_history')||'[]')}catch(e){}hist.unshift({at:new Date().toISOString(),workspace:prior});hist=hist.slice(0,10);try{localStorage.setItem(KEY+'_history',JSON.stringify(hist))}catch(e){}const box=$('yennHistory');if(box){box.textContent='Previous workspace versions: '+hist.length+' saved locally.';const b=document.createElement('button');b.className='btn secondary small';b.textContent='Restore previous workspace';b.onclick=()=>{if(confirm('Restore the previous workspace backup? Current workspace data will be replaced.')){localStorage.setItem(KEY,JSON.stringify(hist[0].workspace));location.reload();}};box.appendChild(b);}}}}
const ai=$('carter');
if(ai){const card=document.createElement('div');card.className='card';card.innerHTML='<h2>AI Prompt Studio</h2><p>Build a focused prompt from your task and current editor code. Copy it into ChatGPT.</p><input id="yennAiTask" placeholder="What do you want help with?"><button class="btn secondary" style="margin-top:9px" id="yennAiCopy">Create coding prompt</button>';ai.append(card);$('yennAiCopy').onclick=()=>{const prompt='Act as a patient coding tutor. Explain the solution step by step. Task: '+$('yennAiTask').value+'\n\nCurrent code:\n'+($('code')?.value||'No code attached');if(navigator.clipboard?.writeText)navigator.clipboard.writeText(prompt).then(()=>alert('Prompt copied. Paste it into ChatGPT.')).catch(()=>alert(prompt));else alert(prompt);};}

const phoneView=document.getElementById('phoneLookup');
if(phoneView){
 const input=document.getElementById('yennPhoneInput');
 const result=document.getElementById('yennPhoneResult');
 const regions={
  '205':'Central Alabama (Birmingham area)','659':'Central Alabama (Birmingham area)',
  '256':'North and east Alabama','938':'North and east Alabama','334':'Central and south Alabama',
  '212':'New York City, New York','213':'Los Angeles, California','305':'Miami, Florida',
  '312':'Chicago, Illinois','404':'Atlanta, Georgia','415':'San Francisco, California',
  '512':'Austin, Texas','617':'Boston, Massachusetts','702':'Las Vegas, Nevada',
  '713':'Houston, Texas','202':'Washington, DC','206':'Seattle, Washington',
  '303':'Denver, Colorado','602':'Phoenix, Arizona','615':'Nashville, Tennessee',
  '214':'Dallas, Texas','216':'Cleveland, Ohio','313':'Detroit, Michigan',
  '704':'Charlotte, North Carolina','801':'Salt Lake City, Utah','808':'Hawaii',
  '907':'Alaska'
 };
 const calling=[
  ['1','United States / Canada and NANP regions'],['44','United Kingdom'],['61','Australia'],
  ['64','New Zealand'],['91','India'],['81','Japan'],['82','South Korea'],
  ['49','Germany'],['33','France'],['34','Spain'],['39','Italy'],['55','Brazil'],
  ['52','Mexico'],['27','South Africa'],['971','United Arab Emirates'],
  ['966','Saudi Arabia'],['65','Singapore'],['60','Malaysia'],['63','Philippines'],
  ['62','Indonesia'],['90','Türkiye'],['7','Russia / Kazakhstan'],
  ['353','Ireland'],['31','Netherlands'],['46','Sweden'],['47','Norway'],
  ['48','Poland'],['351','Portugal'],['20','Egypt'],['234','Nigeria']
 ].sort((a,b)=>b[0].length-a[0].length);
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const lookup=()=>{
  const raw=input.value.trim();
  const digits=raw.replace(/\D/g,'');
  if(!raw||digits.length<7||digits.length>15){result.innerHTML='<p style="color:#ff8a8a">Enter a valid-looking phone number with 7–15 digits.</p>';return;}
  if(!/^[+()\d.\s-]+$/.test(raw)){result.innerHTML='<p style="color:#ff8a8a">Use digits and common phone-number separators only.</p>';return;}
  let country='Unknown from available numbering data',code='',national=digits;
  if(raw.startsWith('+')){
   const found=calling.find(([c])=>digits.startsWith(c));
   if(found){code='+'+found[0];country=found[1];national=digits.slice(found[0].length);}
  }else if(digits.length===10){
   code='+1';country='United States / Canada and NANP regions';national=digits;
  }else if(digits.length===11&&digits.startsWith('1')){
   code='+1';country='United States / Canada and NANP regions';national=digits.slice(1);
  }else{
   result.innerHTML='<p style="color:#ffcf70">For international numbers, include the + country calling code (for example, +44). Without it, the country cannot be identified reliably.</p>';return;
  }
  let region='Not available for this area code in the offline dataset';
  if(code==='+1'&&national.length===10)region=regions[national.slice(0,3)]||region;
  const shown=code?code+' '+national:'Not enough information';
  result.innerHTML='<div class="card" style="margin-top:10px"><div class="sub">LOOKUP RESULTS</div><h2>'+esc(shown)+'</h2><p><b>Country / numbering region:</b> '+esc(country)+'</p><p><b>Calling code:</b> '+esc(code||'Unknown')+'</p><p><b>Area-code region:</b> '+esc(region)+'</p><p><b>Number type:</b> Not reliably available offline</p><p><b>Live location:</b> Not available — this does not locate the phone or its owner.</p><p><b>Spam reputation:</b> Not checked — no live spam database is connected.</p><p class="sub">Results describe numbering-plan information only. They do not confirm ownership or current location.</p></div>';
 };
 document.getElementById('yennPhoneSearch').addEventListener('click',lookup);
 input.addEventListener('keydown',e=>{if(e.key==='Enter')lookup();});
 document.getElementById('yennPhoneClear').addEventListener('click',()=>{input.value='';result.textContent='Enter a number to see available numbering information.';input.focus();});
}
})();
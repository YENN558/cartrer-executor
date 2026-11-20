(()=> {
const $=id=>document.getElementById(id);
const platform=$('yennGamerPlatform');
const input=$('yennGamerTag');
const result=$('yennGamerResult');
const search=$('yennGamerSearch');
const clear=$('yennGamerClear');
if(!platform||!input||!result||!search||!clear)return;
const addLink=(parent,label,url)=>{
 const a=document.createElement('a');
 a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;
 a.style.cssText='display:inline-block;margin:6px 8px 4px 0;padding:10px 12px;border:1px solid var(--accent);border-radius:10px;color:var(--accent2);text-decoration:none';
 parent.appendChild(a);
};
const run=()=>{
 const tag=input.value.trim();
 result.replaceChildren();
 if(!tag){result.textContent='Enter a gamertag or online ID first.';input.focus();return;}
 if(tag.length>40||/[<>\u0000-\u001f]/.test(tag)){result.textContent='That entry contains unsupported characters.';return;}
 if(platform.value==='psn'&&!/^[A-Za-z0-9_-]{3,16}$/.test(tag)){
  result.textContent='PlayStation Online IDs must be 3–16 characters using letters, numbers, hyphens, or underscores.';return;
 }
 const q=encodeURIComponent(tag);
 const note=document.createElement('p');
 note.textContent='Search prepared for “'+tag+'”. Open a result and check that the profile matches the exact ID.';
 result.appendChild(note);
 if(platform.value==='xbox'){
  addLink(result,'Open Xbox profile search','https://www.bing.com/search?q='+encodeURIComponent('Xbox public profile gamertag '+tag));
  addLink(result,'Search public gamerscore & achievements','https://www.google.com/search?q='+encodeURIComponent('site:xboxgamertag.com '+tag+' gamerscore achievements'));
 }else{
  addLink(result,'Search public PlayStation profiles','https://www.google.com/search?q='+encodeURIComponent('PlayStation public profile '+tag+' trophies'));
  addLink(result,'Search public trophy records','https://www.google.com/search?q='+encodeURIComponent('site:psnprofiles.com '+tag));
 }
 const hint=document.createElement('p');
 hint.className='sub';
 hint.textContent='A missing result may mean the profile is private, not indexed, or the tag is not an exact match. YENN does not verify ownership or infer anyone’s identity.';
 result.appendChild(hint);
};
search.addEventListener('click',run);
input.addEventListener('keydown',e=>{if(e.key==='Enter')run();});
clear.addEventListener('click',()=>{input.value='';result.textContent='Choose a platform and enter a tag to search.';input.focus();});
})();
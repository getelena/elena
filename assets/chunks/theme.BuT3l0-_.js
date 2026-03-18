const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/VPLocalSearchBox.D7C5_ruE.js","assets/chunks/framework.lVAEw_NY.js","assets/chunks/Playground.BCR8FKkC.js"])))=>i.map(i=>d[i]);
import{d as v,c,r as d,n as M,o,a as U,t as E,b as g,w as f,T as ee,e as h,_,u as Fe,i as Ue,f as qe,g as fe,h as x,j as m,k as i,l as q,m as ce,p as S,q as O,s as te,v as z,x as ne,y as he,z as Re,A as We,F as C,B as V,C as R,D as se,E as b,G as ve,H as B,I as Ce,J as K,K as F,L as ae,M as Ge,N as Te,O as de,P as be,Q as Ne,R as J,S as Ke,U as Je,V as ge,W as Ve,X as Ae,Y as Ye,Z as Ze,$ as Xe,a0 as Ie,a1 as Qe,a2 as et}from"./framework.lVAEw_NY.js";const tt=v({__name:"VPBadge",props:{text:{},type:{default:"tip"}},setup(e){return(t,n)=>(o(),c("span",{class:M(["VPBadge",e.type])},[d(t.$slots,"default",{},()=>[U(E(e.text),1)])],2))}}),nt={key:0,class:"VPBackdrop"},st=v({__name:"VPBackdrop",props:{show:{type:Boolean}},setup(e){return(t,n)=>(o(),g(ee,{name:"fade"},{default:f(()=>[e.show?(o(),c("div",nt)):h("",!0)]),_:1}))}}),at=_(st,[["__scopeId","data-v-6773a3fe"]]),$=Fe;function ot(e,t){let n,s=!1;return()=>{n&&clearTimeout(n),s?n=setTimeout(e,t):(e(),(s=!0)&&setTimeout(()=>s=!1,t))}}function ue(e){return e.startsWith("/")?e:`/${e}`}function ye(e){const{pathname:t,search:n,hash:s,protocol:a}=new URL(e,"http://a.com");if(Ue(e)||e.startsWith("#")||!a.startsWith("http")||!qe(t))return e;const{site:r}=$(),l=t.endsWith("/")||t.endsWith(".html")?e:e.replace(/(?:(^\.+)\/)?.*$/,`$1${t.replace(/(\.md)?$/,r.value.cleanUrls?"":".html")}${n}${s}`);return fe(l)}function Y({correspondingLink:e=!1}={}){const{site:t,localeIndex:n,page:s,theme:a,hash:r}=$(),l=x(()=>{var u,k;return{label:(u=t.value.locales[n.value])==null?void 0:u.label,link:((k=t.value.locales[n.value])==null?void 0:k.link)||(n.value==="root"?"/":`/${n.value}/`)}});return{localeLinks:x(()=>Object.entries(t.value.locales).flatMap(([u,k])=>l.value.label===k.label?[]:{text:k.label,link:it(k.link||(u==="root"?"/":`/${u}/`),a.value.i18nRouting!==!1&&e,s.value.relativePath.slice(l.value.link.length-1),!t.value.cleanUrls)+r.value})),currentLang:l}}function it(e,t,n,s){return t?e.replace(/\/$/,"")+ue(n.replace(/(^|\/)index\.md$/,"$1").replace(/\.md$/,s?".html":"")):e}const rt={class:"NotFound"},lt={class:"code"},ct={class:"title"},dt={class:"quote"},ut={class:"action"},mt=["href","aria-label"],pt=v({__name:"NotFound",setup(e){const{theme:t}=$(),{currentLang:n}=Y();return(s,a)=>{var r,l,p,u,k;return o(),c("div",rt,[m("p",lt,E(((r=i(t).notFound)==null?void 0:r.code)??"404"),1),m("h1",ct,E(((l=i(t).notFound)==null?void 0:l.title)??"PAGE NOT FOUND"),1),a[0]||(a[0]=m("div",{class:"divider"},null,-1)),m("blockquote",dt,E(((p=i(t).notFound)==null?void 0:p.quote)??"But if you don't change your direction, and if you keep looking, you may end up where you are heading."),1),m("div",ut,[m("a",{class:"link",href:i(fe)(i(n).link),"aria-label":((u=i(t).notFound)==null?void 0:u.linkLabel)??"go to home"},E(((k=i(t).notFound)==null?void 0:k.linkText)??"Take me home"),9,mt)])])}}}),ft=_(pt,[["__scopeId","data-v-2832facb"]]);function Be(e,t){if(Array.isArray(e))return X(e);if(e==null)return[];t=ue(t);const n=Object.keys(e).sort((a,r)=>r.split("/").length-a.split("/").length).find(a=>t.startsWith(ue(a))),s=n?e[n]:[];return Array.isArray(s)?X(s):X(s.items,s.base)}function ht(e){const t=[];let n=0;for(const s in e){const a=e[s];if(a.items){n=t.push(a);continue}t[n]||t.push({items:[]}),t[n].items.push(a)}return t}function vt(e){const t=[];function n(s){for(const a of s)a.text&&a.link&&t.push({text:a.text,link:a.link,docFooterText:a.docFooterText}),a.items&&n(a.items)}return n(e),t}function me(e,t){return Array.isArray(t)?t.some(n=>me(e,n)):q(e,t.link)?!0:t.items?me(e,t.items):!1}function X(e,t){return[...e].map(n=>{const s={...n},a=s.base||t;return a&&s.link&&(s.link=a+s.link),s.items&&(s.items=X(s.items,a)),s})}function D(){const{frontmatter:e,page:t,theme:n}=$(),s=ce("(min-width: 960px)"),a=S(!1),r=x(()=>{const N=n.value.sidebar,A=t.value.relativePath;return N?Be(N,A):[]}),l=S(r.value);O(r,(N,A)=>{JSON.stringify(N)!==JSON.stringify(A)&&(l.value=r.value)});const p=x(()=>e.value.sidebar!==!1&&l.value.length>0&&e.value.layout!=="home"),u=x(()=>k?e.value.aside==null?n.value.aside==="left":e.value.aside==="left":!1),k=x(()=>e.value.layout==="home"?!1:e.value.aside!=null?!!e.value.aside:n.value.aside!==!1),L=x(()=>p.value&&s.value),y=x(()=>p.value?ht(l.value):[]);function w(){a.value=!0}function P(){a.value=!1}function T(){a.value?P():w()}return{isOpen:a,sidebar:l,sidebarGroups:y,hasSidebar:p,hasAside:k,leftAside:u,isSidebarEnabled:L,open:w,close:P,toggle:T}}function bt(e,t){let n;te(()=>{n=e.value?document.activeElement:void 0}),z(()=>{window.addEventListener("keyup",s)}),ne(()=>{window.removeEventListener("keyup",s)});function s(a){a.key==="Escape"&&e.value&&(t(),n==null||n.focus())}}function gt(e){const{page:t,hash:n}=$(),s=S(!1),a=x(()=>e.value.collapsed!=null),r=x(()=>!!e.value.link),l=S(!1),p=()=>{l.value=q(t.value.relativePath,e.value.link)};O([t,e,n],p),z(p);const u=x(()=>l.value?!0:e.value.items?me(t.value.relativePath,e.value.items):!1),k=x(()=>!!(e.value.items&&e.value.items.length));te(()=>{s.value=!!(a.value&&e.value.collapsed)}),he(()=>{(l.value||u.value)&&(s.value=!1)});function L(){a.value&&(s.value=!s.value)}return{collapsed:s,collapsible:a,isLink:r,isActiveLink:l,hasActiveLink:u,hasChildren:k,toggle:L}}function yt(){const{hasSidebar:e}=D(),t=ce("(min-width: 960px)"),n=ce("(min-width: 1280px)");return{isAsideEnabled:x(()=>!n.value&&!t.value?!1:e.value?n.value:t.value)}}const kt=/\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/,pe=[];function He(e){return typeof e.outline=="object"&&!Array.isArray(e.outline)&&e.outline.label||e.outlineTitle||"On this page"}function ke(e){const t=[...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")].filter(n=>n.id&&n.hasChildNodes()).map(n=>{const s=Number(n.tagName[1]);return{element:n,title:_t(n),link:"#"+n.id,level:s}});return xt(t,e)}function _t(e){let t="";for(const n of e.childNodes)if(n.nodeType===1){if(kt.test(n.className))continue;t+=n.textContent}else n.nodeType===3&&(t+=n.textContent);return t.trim()}function xt(e,t){if(t===!1)return[];const n=(typeof t=="object"&&!Array.isArray(t)?t.level:t)||2,[s,a]=typeof n=="number"?[n,n]:n==="deep"?[2,6]:n;return Lt(e,s,a)}function wt(e,t){const{isAsideEnabled:n}=yt(),s=ot(r,100);let a=null;z(()=>{requestAnimationFrame(r),window.addEventListener("scroll",s)}),Re(()=>{l(location.hash)}),ne(()=>{window.removeEventListener("scroll",s)});function r(){if(!n.value)return;const p=window.scrollY,u=window.innerHeight,k=document.body.offsetHeight,L=Math.abs(p+u-k)<1,y=pe.map(({element:P,link:T})=>({link:T,top:$t(P)})).filter(({top:P})=>!Number.isNaN(P)).sort((P,T)=>P.top-T.top);if(!y.length){l(null);return}if(p<1){l(null);return}if(L){l(y[y.length-1].link);return}let w=null;for(const{link:P,top:T}of y){if(T>p+We()+4)break;w=P}l(w)}function l(p){a&&a.classList.remove("active"),p==null?a=null:a=e.value.querySelector(`a[href="${decodeURIComponent(p)}"]`);const u=a;u?(u.classList.add("active"),t.value.style.top=u.offsetTop+39+"px",t.value.style.opacity="1"):(t.value.style.top="33px",t.value.style.opacity="0")}}function $t(e){let t=0;for(;e!==document.body;){if(e===null)return NaN;t+=e.offsetTop,e=e.offsetParent}return t}function Lt(e,t,n){pe.length=0;const s=[],a=[];return e.forEach(r=>{const l={...r,children:[]};let p=a[a.length-1];for(;p&&p.level>=l.level;)a.pop(),p=a[a.length-1];if(l.element.classList.contains("ignore-header")||p&&"shouldIgnore"in p){a.push({level:l.level,shouldIgnore:!0});return}l.level>n||l.level<t||(pe.push({element:l.element,link:l.link}),p?p.children.push(l):s.push(l),a.push(l))}),s}const St=["href","title"],Pt=v({__name:"VPDocOutlineItem",props:{headers:{},root:{type:Boolean}},setup(e){function t({target:n}){const s=n.href.split("#")[1],a=document.getElementById(decodeURIComponent(s));a==null||a.focus({preventScroll:!0})}return(n,s)=>{const a=R("VPDocOutlineItem",!0);return o(),c("ul",{class:M(["VPDocOutlineItem",e.root?"root":"nested"])},[(o(!0),c(C,null,V(e.headers,({children:r,link:l,title:p})=>(o(),c("li",null,[m("a",{class:"outline-link",href:l,onClick:t,title:p},E(p),9,St),r!=null&&r.length?(o(),g(a,{key:0,headers:r},null,8,["headers"])):h("",!0)]))),256))],2)}}}),Oe=_(Pt,[["__scopeId","data-v-38e72ac9"]]),Mt={class:"content"},Et={"aria-level":"2",class:"outline-title",id:"doc-outline-aria-label",role:"heading"},Ct=v({__name:"VPDocAsideOutline",setup(e){const{frontmatter:t,theme:n}=$(),s=ve([]);se(()=>{s.value=ke(t.value.outline??n.value.outline)});const a=S(),r=S();return wt(a,r),(l,p)=>(o(),c("nav",{"aria-labelledby":"doc-outline-aria-label",class:M(["VPDocAsideOutline",{"has-outline":s.value.length>0}]),ref_key:"container",ref:a},[m("div",Mt,[m("div",{class:"outline-marker",ref_key:"marker",ref:r},null,512),m("div",Et,E(i(He)(i(n))),1),b(Oe,{headers:s.value,root:!0},null,8,["headers"])])],2))}}),Tt=_(Ct,[["__scopeId","data-v-08de8106"]]),Nt={class:"VPDocAsideCarbonAds"},Vt=v({__name:"VPDocAsideCarbonAds",props:{carbonAds:{}},setup(e){const t=()=>null;return(n,s)=>(o(),c("div",Nt,[b(i(t),{"carbon-ads":e.carbonAds},null,8,["carbon-ads"])]))}}),At={class:"VPDocAside"},It=v({__name:"VPDocAside",setup(e){const{theme:t}=$();return(n,s)=>(o(),c("div",At,[d(n.$slots,"aside-top",{},void 0,!0),d(n.$slots,"aside-outline-before",{},void 0,!0),b(Tt),d(n.$slots,"aside-outline-after",{},void 0,!0),s[0]||(s[0]=m("div",{class:"spacer"},null,-1)),d(n.$slots,"aside-ads-before",{},void 0,!0),i(t).carbonAds?(o(),g(Vt,{key:0,"carbon-ads":i(t).carbonAds},null,8,["carbon-ads"])):h("",!0),d(n.$slots,"aside-ads-after",{},void 0,!0),d(n.$slots,"aside-bottom",{},void 0,!0)]))}}),Bt=_(It,[["__scopeId","data-v-ad4eda49"]]);function Ht(){const{theme:e,page:t}=$();return x(()=>{const{text:n="Edit this page",pattern:s=""}=e.value.editLink||{};let a;return typeof s=="function"?a=s(t.value):a=s.replace(/:path/g,t.value.filePath),{url:a,text:n}})}function Ot(){const{page:e,theme:t,frontmatter:n}=$();return x(()=>{var k,L,y,w,P,T,N,A;const s=Be(t.value.sidebar,e.value.relativePath),a=vt(s),r=zt(a,I=>I.link.replace(/[?#].*$/,"")),l=r.findIndex(I=>q(e.value.relativePath,I.link)),p=((k=t.value.docFooter)==null?void 0:k.prev)===!1&&!n.value.prev||n.value.prev===!1,u=((L=t.value.docFooter)==null?void 0:L.next)===!1&&!n.value.next||n.value.next===!1;return{prev:p?void 0:{text:(typeof n.value.prev=="string"?n.value.prev:typeof n.value.prev=="object"?n.value.prev.text:void 0)??((y=r[l-1])==null?void 0:y.docFooterText)??((w=r[l-1])==null?void 0:w.text),link:(typeof n.value.prev=="object"?n.value.prev.link:void 0)??((P=r[l-1])==null?void 0:P.link)},next:u?void 0:{text:(typeof n.value.next=="string"?n.value.next:typeof n.value.next=="object"?n.value.next.text:void 0)??((T=r[l+1])==null?void 0:T.docFooterText)??((N=r[l+1])==null?void 0:N.text),link:(typeof n.value.next=="object"?n.value.next.link:void 0)??((A=r[l+1])==null?void 0:A.link)}}})}function zt(e,t){const n=new Set;return e.filter(s=>{const a=t(s);return n.has(a)?!1:n.add(a)})}const H=v({__name:"VPLink",props:{tag:{},href:{},noIcon:{type:Boolean},target:{},rel:{}},setup(e){const t=e,n=x(()=>t.tag??(t.href?"a":"span")),s=x(()=>t.href&&Ce.test(t.href)||t.target==="_blank");return(a,r)=>(o(),g(B(n.value),{class:M(["VPLink",{link:e.href,"vp-external-link-icon":s.value,"no-icon":e.noIcon}]),href:e.href?i(ye)(e.href):void 0,target:e.target??(s.value?"_blank":void 0),rel:e.rel??(s.value?"noreferrer":void 0)},{default:f(()=>[d(a.$slots,"default")]),_:3},8,["class","href","target","rel"]))}}),Dt={class:"VPLastUpdated"},jt=["datetime"],Ft=v({__name:"VPDocFooterLastUpdated",setup(e){const{theme:t,page:n,lang:s}=$(),a=x(()=>new Date(n.value.lastUpdated)),r=x(()=>a.value.toISOString()),l=S("");return z(()=>{te(()=>{var p,u,k;l.value=new Intl.DateTimeFormat((u=(p=t.value.lastUpdated)==null?void 0:p.formatOptions)!=null&&u.forceLocale?s.value:void 0,((k=t.value.lastUpdated)==null?void 0:k.formatOptions)??{dateStyle:"short",timeStyle:"short"}).format(a.value)})}),(p,u)=>{var k;return o(),c("p",Dt,[U(E(((k=i(t).lastUpdated)==null?void 0:k.text)||i(t).lastUpdatedText||"Last updated")+": ",1),m("time",{datetime:r.value},E(l.value),9,jt)])}}}),Ut=_(Ft,[["__scopeId","data-v-48cd5f24"]]),qt={key:0,class:"VPDocFooter"},Rt={key:0,class:"edit-info"},Wt={key:0,class:"edit-link"},Gt={key:1,class:"last-updated"},Kt={key:1,class:"prev-next","aria-labelledby":"doc-footer-aria-label"},Jt={class:"pager"},Yt=["innerHTML"],Zt=["innerHTML"],Xt={class:"pager"},Qt=["innerHTML"],en=["innerHTML"],tn=v({__name:"VPDocFooter",setup(e){const{theme:t,page:n,frontmatter:s}=$(),a=Ht(),r=Ot(),l=x(()=>t.value.editLink&&s.value.editLink!==!1),p=x(()=>n.value.lastUpdated),u=x(()=>l.value||p.value||r.value.prev||r.value.next);return(k,L)=>{var y,w,P,T;return u.value?(o(),c("footer",qt,[d(k.$slots,"doc-footer-before",{},void 0,!0),l.value||p.value?(o(),c("div",Rt,[l.value?(o(),c("div",Wt,[b(H,{class:"edit-link-button",href:i(a).url,"no-icon":!0},{default:f(()=>[L[0]||(L[0]=m("span",{class:"vpi-square-pen edit-link-icon"},null,-1)),U(" "+E(i(a).text),1)]),_:1},8,["href"])])):h("",!0),p.value?(o(),c("div",Gt,[b(Ut)])):h("",!0)])):h("",!0),(y=i(r).prev)!=null&&y.link||(w=i(r).next)!=null&&w.link?(o(),c("nav",Kt,[L[1]||(L[1]=m("span",{class:"visually-hidden",id:"doc-footer-aria-label"},"Pager",-1)),m("div",Jt,[(P=i(r).prev)!=null&&P.link?(o(),g(H,{key:0,class:"pager-link prev",href:i(r).prev.link},{default:f(()=>{var N;return[m("span",{class:"desc",innerHTML:((N=i(t).docFooter)==null?void 0:N.prev)||"Previous page"},null,8,Yt),m("span",{class:"title",innerHTML:i(r).prev.text},null,8,Zt)]}),_:1},8,["href"])):h("",!0)]),m("div",Xt,[(T=i(r).next)!=null&&T.link?(o(),g(H,{key:0,class:"pager-link next",href:i(r).next.link},{default:f(()=>{var N;return[m("span",{class:"desc",innerHTML:((N=i(t).docFooter)==null?void 0:N.next)||"Next page"},null,8,Qt),m("span",{class:"title",innerHTML:i(r).next.text},null,8,en)]}),_:1},8,["href"])):h("",!0)])])):h("",!0)])):h("",!0)}}}),nn=_(tn,[["__scopeId","data-v-fd37d457"]]),sn={class:"container"},an={class:"aside-container"},on={class:"aside-content"},rn={class:"content"},ln={class:"content-container"},cn={class:"main"},dn=v({__name:"VPDoc",setup(e){const{theme:t}=$(),n=K(),{hasSidebar:s,hasAside:a,leftAside:r}=D(),l=x(()=>n.path.replace(/[./]+/g,"_").replace(/_html$/,""));return(p,u)=>{const k=R("Content");return o(),c("div",{class:M(["VPDoc",{"has-sidebar":i(s),"has-aside":i(a)}])},[d(p.$slots,"doc-top",{},void 0,!0),m("div",sn,[i(a)?(o(),c("div",{key:0,class:M(["aside",{"left-aside":i(r)}])},[u[0]||(u[0]=m("div",{class:"aside-curtain"},null,-1)),m("div",an,[m("div",on,[b(Bt,null,{"aside-top":f(()=>[d(p.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":f(()=>[d(p.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":f(()=>[d(p.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(p.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(p.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(p.$slots,"aside-ads-after",{},void 0,!0)]),_:3})])])],2)):h("",!0),m("div",rn,[m("div",ln,[d(p.$slots,"doc-before",{},void 0,!0),m("main",cn,[b(k,{class:M(["vp-doc",[l.value,i(t).externalLinkIcon&&"external-link-icon-enabled"]])},null,8,["class"])]),b(nn,null,{"doc-footer-before":f(()=>[d(p.$slots,"doc-footer-before",{},void 0,!0)]),_:3}),d(p.$slots,"doc-after",{},void 0,!0)])])]),d(p.$slots,"doc-bottom",{},void 0,!0)],2)}}}),un=_(dn,[["__scopeId","data-v-65558c5f"]]),mn=v({__name:"VPButton",props:{tag:{},size:{default:"medium"},theme:{default:"brand"},text:{},href:{},target:{},rel:{}},setup(e){const t=e,n=x(()=>t.href&&Ce.test(t.href)),s=x(()=>t.tag||(t.href?"a":"button"));return(a,r)=>(o(),g(B(s.value),{class:M(["VPButton",[e.size,e.theme]]),href:e.href?i(ye)(e.href):void 0,target:t.target??(n.value?"_blank":void 0),rel:t.rel??(n.value?"noreferrer":void 0)},{default:f(()=>[U(E(e.text),1)]),_:1},8,["class","href","target","rel"]))}}),pn=_(mn,[["__scopeId","data-v-55b96887"]]),fn=["src","alt"],hn=v({inheritAttrs:!1,__name:"VPImage",props:{image:{},alt:{}},setup(e){return(t,n)=>{const s=R("VPImage",!0);return e.image?(o(),c(C,{key:0},[typeof e.image=="string"||"src"in e.image?(o(),c("img",F({key:0,class:"VPImage"},typeof e.image=="string"?t.$attrs:{...e.image,...t.$attrs},{src:i(fe)(typeof e.image=="string"?e.image:e.image.src),alt:e.alt??(typeof e.image=="string"?"":e.image.alt||"")}),null,16,fn)):(o(),c(C,{key:1},[b(s,F({class:"dark",image:e.image.dark,alt:e.image.alt},t.$attrs),null,16,["image","alt"]),b(s,F({class:"light",image:e.image.light,alt:e.image.alt},t.$attrs),null,16,["image","alt"])],64))],64)):h("",!0)}}}),Q=_(hn,[["__scopeId","data-v-7f7ad277"]]),vn={class:"container"},bn={class:"main"},gn={class:"heading"},yn=["innerHTML"],kn=["innerHTML"],_n=["innerHTML"],xn={key:0,class:"actions"},wn={key:0,class:"image"},$n={class:"image-container"},Ln=v({__name:"VPHero",props:{name:{},text:{},tagline:{},image:{},actions:{}},setup(e){const t=ae("hero-image-slot-exists");return(n,s)=>(o(),c("div",{class:M(["VPHero",{"has-image":e.image||i(t)}])},[m("div",vn,[m("div",bn,[d(n.$slots,"home-hero-info-before",{},void 0,!0),d(n.$slots,"home-hero-info",{},()=>[m("h1",gn,[e.name?(o(),c("span",{key:0,innerHTML:e.name,class:"name clip"},null,8,yn)):h("",!0),e.text?(o(),c("span",{key:1,innerHTML:e.text,class:"text"},null,8,kn)):h("",!0)]),e.tagline?(o(),c("p",{key:0,innerHTML:e.tagline,class:"tagline"},null,8,_n)):h("",!0)],!0),d(n.$slots,"home-hero-info-after",{},void 0,!0),e.actions?(o(),c("div",xn,[(o(!0),c(C,null,V(e.actions,a=>(o(),c("div",{key:a.link,class:"action"},[b(pn,{tag:"a",size:"medium",theme:a.theme,text:a.text,href:a.link,target:a.target,rel:a.rel},null,8,["theme","text","href","target","rel"])]))),128))])):h("",!0),d(n.$slots,"home-hero-actions-after",{},void 0,!0)]),e.image||i(t)?(o(),c("div",wn,[m("div",$n,[s[0]||(s[0]=m("div",{class:"image-bg"},null,-1)),d(n.$slots,"home-hero-image",{},()=>[e.image?(o(),g(Q,{key:0,class:"image-src",image:e.image},null,8,["image"])):h("",!0)],!0)])])):h("",!0)])],2))}}),Sn=_(Ln,[["__scopeId","data-v-22cd4ec7"]]),Pn=v({__name:"VPHomeHero",setup(e){const{frontmatter:t}=$();return(n,s)=>i(t).hero?(o(),g(Sn,{key:0,class:"VPHomeHero",name:i(t).hero.name,text:i(t).hero.text,tagline:i(t).hero.tagline,image:i(t).hero.image,actions:i(t).hero.actions},{"home-hero-info-before":f(()=>[d(n.$slots,"home-hero-info-before")]),"home-hero-info":f(()=>[d(n.$slots,"home-hero-info")]),"home-hero-info-after":f(()=>[d(n.$slots,"home-hero-info-after")]),"home-hero-actions-after":f(()=>[d(n.$slots,"home-hero-actions-after")]),"home-hero-image":f(()=>[d(n.$slots,"home-hero-image")]),_:3},8,["name","text","tagline","image","actions"])):h("",!0)}}),Mn={class:"box"},En={key:0,class:"icon"},Cn=["innerHTML"],Tn=["innerHTML"],Nn=["innerHTML"],Vn={key:4,class:"link-text"},An={class:"link-text-value"},In=v({__name:"VPFeature",props:{icon:{},title:{},details:{},link:{},linkText:{},rel:{},target:{}},setup(e){return(t,n)=>(o(),g(H,{class:"VPFeature",href:e.link,rel:e.rel,target:e.target,"no-icon":!0,tag:e.link?"a":"div"},{default:f(()=>[m("article",Mn,[typeof e.icon=="object"&&e.icon.wrap?(o(),c("div",En,[b(Q,{image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])])):typeof e.icon=="object"?(o(),g(Q,{key:1,image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])):e.icon?(o(),c("div",{key:2,class:"icon",innerHTML:e.icon},null,8,Cn)):h("",!0),m("h2",{class:"title",innerHTML:e.title},null,8,Tn),e.details?(o(),c("p",{key:3,class:"details",innerHTML:e.details},null,8,Nn)):h("",!0),e.linkText?(o(),c("div",Vn,[m("p",An,[U(E(e.linkText)+" ",1),n[0]||(n[0]=m("span",{class:"vpi-arrow-right link-text-icon"},null,-1))])])):h("",!0)])]),_:1},8,["href","rel","target","tag"]))}}),Bn=_(In,[["__scopeId","data-v-f370ec94"]]),Hn={key:0,class:"VPFeatures"},On={class:"container"},zn={class:"items"},Dn=v({__name:"VPFeatures",props:{features:{}},setup(e){const t=e,n=x(()=>{const s=t.features.length;if(s){if(s===2)return"grid-2";if(s===3)return"grid-3";if(s%3===0)return"grid-6";if(s>3)return"grid-4"}else return});return(s,a)=>e.features?(o(),c("div",Hn,[m("div",On,[m("div",zn,[(o(!0),c(C,null,V(e.features,r=>(o(),c("div",{key:r.title,class:M(["item",[n.value]])},[b(Bn,{icon:r.icon,title:r.title,details:r.details,link:r.link,"link-text":r.linkText,rel:r.rel,target:r.target},null,8,["icon","title","details","link","link-text","rel","target"])],2))),128))])])])):h("",!0)}}),jn=_(Dn,[["__scopeId","data-v-269de76d"]]),Fn=v({__name:"VPHomeFeatures",setup(e){const{frontmatter:t}=$();return(n,s)=>i(t).features?(o(),g(jn,{key:0,class:"VPHomeFeatures",features:i(t).features},null,8,["features"])):h("",!0)}}),Un=v({__name:"VPHomeContent",setup(e){const{width:t}=Ge({initialWidth:0,includeScrollbar:!1});return(n,s)=>(o(),c("div",{class:"vp-doc container",style:Te(i(t)?{"--vp-offset":`calc(50% - ${i(t)/2}px)`}:{})},[d(n.$slots,"default",{},void 0,!0)],4))}}),qn=_(Un,[["__scopeId","data-v-24c2bbcf"]]),Rn=v({__name:"VPHome",setup(e){const{frontmatter:t,theme:n}=$();return(s,a)=>{const r=R("Content");return o(),c("div",{class:M(["VPHome",{"external-link-icon-enabled":i(n).externalLinkIcon}])},[d(s.$slots,"home-hero-before",{},void 0,!0),b(Pn,null,{"home-hero-info-before":f(()=>[d(s.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(s.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(s.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(s.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(s.$slots,"home-hero-image",{},void 0,!0)]),_:3}),d(s.$slots,"home-hero-after",{},void 0,!0),d(s.$slots,"home-features-before",{},void 0,!0),b(Fn),d(s.$slots,"home-features-after",{},void 0,!0),i(t).markdownStyles!==!1?(o(),g(qn,{key:0},{default:f(()=>[b(r)]),_:1})):(o(),g(r,{key:1}))],2)}}}),Wn=_(Rn,[["__scopeId","data-v-9de749f6"]]),Gn={},Kn={class:"VPPage"};function Jn(e,t){const n=R("Content");return o(),c("div",Kn,[d(e.$slots,"page-top"),b(n),d(e.$slots,"page-bottom")])}const Yn=_(Gn,[["render",Jn]]),Zn=v({__name:"VPContent",setup(e){const{page:t,frontmatter:n}=$(),{hasSidebar:s}=D();return(a,r)=>(o(),c("div",{class:M(["VPContent",{"has-sidebar":i(s),"is-home":i(n).layout==="home"}]),id:"VPContent"},[i(t).isNotFound?d(a.$slots,"not-found",{key:0},()=>[b(ft)],!0):i(n).layout==="page"?(o(),g(Yn,{key:1},{"page-top":f(()=>[d(a.$slots,"page-top",{},void 0,!0)]),"page-bottom":f(()=>[d(a.$slots,"page-bottom",{},void 0,!0)]),_:3})):i(n).layout==="home"?(o(),g(Wn,{key:2},{"home-hero-before":f(()=>[d(a.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":f(()=>[d(a.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(a.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(a.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(a.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(a.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":f(()=>[d(a.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":f(()=>[d(a.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":f(()=>[d(a.$slots,"home-features-after",{},void 0,!0)]),_:3})):i(n).layout&&i(n).layout!=="doc"?(o(),g(B(i(n).layout),{key:3})):(o(),g(un,{key:4},{"doc-top":f(()=>[d(a.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":f(()=>[d(a.$slots,"doc-bottom",{},void 0,!0)]),"doc-footer-before":f(()=>[d(a.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":f(()=>[d(a.$slots,"doc-before",{},void 0,!0)]),"doc-after":f(()=>[d(a.$slots,"doc-after",{},void 0,!0)]),"aside-top":f(()=>[d(a.$slots,"aside-top",{},void 0,!0)]),"aside-outline-before":f(()=>[d(a.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(a.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(a.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(a.$slots,"aside-ads-after",{},void 0,!0)]),"aside-bottom":f(()=>[d(a.$slots,"aside-bottom",{},void 0,!0)]),_:3}))],2))}}),Xn=_(Zn,[["__scopeId","data-v-be667660"]]),Qn={class:"container"},es=["innerHTML"],ts=["innerHTML"],ns=v({__name:"VPFooter",setup(e){const{theme:t,frontmatter:n}=$(),{hasSidebar:s}=D();return(a,r)=>i(t).footer&&i(n).footer!==!1?(o(),c("footer",{key:0,class:M(["VPFooter",{"has-sidebar":i(s)}])},[m("div",Qn,[i(t).footer.message?(o(),c("p",{key:0,class:"message",innerHTML:i(t).footer.message},null,8,es)):h("",!0),i(t).footer.copyright?(o(),c("p",{key:1,class:"copyright",innerHTML:i(t).footer.copyright},null,8,ts)):h("",!0)])],2)):h("",!0)}}),ss=_(ns,[["__scopeId","data-v-9076f32b"]]);function as(){const{theme:e,frontmatter:t}=$(),n=ve([]),s=x(()=>n.value.length>0);return se(()=>{n.value=ke(t.value.outline??e.value.outline)}),{headers:n,hasLocalNav:s}}const os={class:"menu-text"},is={class:"header"},rs={class:"outline"},ls=v({__name:"VPLocalNavOutlineDropdown",props:{headers:{},navHeight:{}},setup(e){const t=e,{theme:n}=$(),s=S(!1),a=S(0),r=S(),l=S();function p(y){var w;(w=r.value)!=null&&w.contains(y.target)||(s.value=!1)}O(s,y=>{if(y){document.addEventListener("click",p);return}document.removeEventListener("click",p)}),de("Escape",()=>{s.value=!1}),se(()=>{s.value=!1});function u(){s.value=!s.value,a.value=window.innerHeight+Math.min(window.scrollY-t.navHeight,0)}function k(y){y.target.classList.contains("outline-link")&&(l.value&&(l.value.style.transition="none"),be(()=>{s.value=!1}))}function L(){s.value=!1,window.scrollTo({top:0,left:0,behavior:"smooth"})}return(y,w)=>(o(),c("div",{class:"VPLocalNavOutlineDropdown",style:Te({"--vp-vh":a.value+"px"}),ref_key:"main",ref:r},[e.headers.length>0?(o(),c("button",{key:0,onClick:u,class:M({open:s.value})},[m("span",os,E(i(He)(i(n))),1),w[0]||(w[0]=m("span",{class:"vpi-chevron-right icon"},null,-1))],2)):(o(),c("button",{key:1,onClick:L},E(i(n).returnToTopLabel||"Return to top"),1)),b(ee,{name:"flyout"},{default:f(()=>[s.value?(o(),c("div",{key:0,ref_key:"items",ref:l,class:"items",onClick:k},[m("div",is,[m("a",{class:"top-link",href:"#",onClick:L},E(i(n).returnToTopLabel||"Return to top"),1)]),m("div",rs,[b(Oe,{headers:e.headers},null,8,["headers"])])],512)):h("",!0)]),_:1})],4))}}),cs=_(ls,[["__scopeId","data-v-9aaeddb2"]]),ds={class:"container"},us=["aria-expanded"],ms={class:"menu-text"},ps=v({__name:"VPLocalNav",props:{open:{type:Boolean}},emits:["open-menu"],setup(e){const{theme:t,frontmatter:n}=$(),{hasSidebar:s}=D(),{headers:a}=as(),{y:r}=Ne(),l=S(0);z(()=>{l.value=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vp-nav-height"))}),se(()=>{a.value=ke(n.value.outline??t.value.outline)});const p=x(()=>a.value.length===0),u=x(()=>p.value&&!s.value),k=x(()=>({VPLocalNav:!0,"has-sidebar":s.value,empty:p.value,fixed:u.value}));return(L,y)=>i(n).layout!=="home"&&(!u.value||i(r)>=l.value)?(o(),c("div",{key:0,class:M(k.value)},[m("div",ds,[i(s)?(o(),c("button",{key:0,class:"menu","aria-expanded":e.open,"aria-controls":"VPSidebarNav",onClick:y[0]||(y[0]=w=>L.$emit("open-menu"))},[y[1]||(y[1]=m("span",{class:"vpi-align-left menu-icon"},null,-1)),m("span",ms,E(i(t).sidebarMenuLabel||"Menu"),1)],8,us)):h("",!0),b(cs,{headers:i(a),navHeight:l.value},null,8,["headers","navHeight"])])],2)):h("",!0)}}),fs=_(ps,[["__scopeId","data-v-28f77836"]]);function hs(){const e=S(!1);function t(){e.value=!0,window.addEventListener("resize",a)}function n(){e.value=!1,window.removeEventListener("resize",a)}function s(){e.value?n():t()}function a(){window.outerWidth>=768&&n()}const r=K();return O(()=>r.path,n),{isScreenOpen:e,openScreen:t,closeScreen:n,toggleScreen:s}}const vs={},bs={class:"VPSwitch",type:"button",role:"switch"},gs={class:"check"},ys={key:0,class:"icon"};function ks(e,t){return o(),c("button",bs,[m("span",gs,[e.$slots.default?(o(),c("span",ys,[d(e.$slots,"default",{},void 0,!0)])):h("",!0)])])}const _s=_(vs,[["render",ks],["__scopeId","data-v-9e07a4e8"]]),xs=v({__name:"VPSwitchAppearance",setup(e){const{isDark:t,theme:n}=$(),s=ae("toggle-appearance",()=>{t.value=!t.value}),a=S("");return he(()=>{a.value=t.value?n.value.lightModeSwitchTitle||"Switch to light theme":n.value.darkModeSwitchTitle||"Switch to dark theme"}),(r,l)=>(o(),g(_s,{title:a.value,class:"VPSwitchAppearance","aria-checked":i(t),onClick:i(s)},{default:f(()=>[...l[0]||(l[0]=[m("span",{class:"vpi-sun sun"},null,-1),m("span",{class:"vpi-moon moon"},null,-1)])]),_:1},8,["title","aria-checked","onClick"]))}}),_e=_(xs,[["__scopeId","data-v-8d88ccc6"]]),ws={key:0,class:"VPNavBarAppearance"},$s=v({__name:"VPNavBarAppearance",setup(e){const{site:t}=$();return(n,s)=>i(t).appearance&&i(t).appearance!=="force-dark"&&i(t).appearance!=="force-auto"?(o(),c("div",ws,[b(_e)])):h("",!0)}}),Ls=_($s,[["__scopeId","data-v-ed47076c"]]),xe=S();let ze=!1,le=0;function Ss(e){const t=S(!1);if(J){!ze&&Ps(),le++;const n=O(xe,s=>{var a,r,l;s===e.el.value||(a=e.el.value)!=null&&a.contains(s)?(t.value=!0,(r=e.onFocus)==null||r.call(e)):(t.value=!1,(l=e.onBlur)==null||l.call(e))});ne(()=>{n(),le--,le||Ms()})}return Ke(t)}function Ps(){document.addEventListener("focusin",De),ze=!0,xe.value=document.activeElement}function Ms(){document.removeEventListener("focusin",De)}function De(){xe.value=document.activeElement}const Es={class:"VPMenuLink"},Cs=["innerHTML"],Ts=v({__name:"VPMenuLink",props:{item:{}},setup(e){const{page:t}=$();return(n,s)=>(o(),c("div",Es,[b(H,{class:M({active:i(q)(i(t).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon},{default:f(()=>[m("span",{innerHTML:e.item.text},null,8,Cs)]),_:1},8,["class","href","target","rel","no-icon"])]))}}),oe=_(Ts,[["__scopeId","data-v-2ceef82b"]]),Ns={class:"VPMenuGroup"},Vs={key:0,class:"title"},As=v({__name:"VPMenuGroup",props:{text:{},items:{}},setup(e){return(t,n)=>(o(),c("div",Ns,[e.text?(o(),c("p",Vs,E(e.text),1)):h("",!0),(o(!0),c(C,null,V(e.items,s=>(o(),c(C,null,["link"in s?(o(),g(oe,{key:0,item:s},null,8,["item"])):h("",!0)],64))),256))]))}}),Is=_(As,[["__scopeId","data-v-6405ffc7"]]),Bs={class:"VPMenu"},Hs={key:0,class:"items"},Os=v({__name:"VPMenu",props:{items:{}},setup(e){return(t,n)=>(o(),c("div",Bs,[e.items?(o(),c("div",Hs,[(o(!0),c(C,null,V(e.items,s=>(o(),c(C,{key:JSON.stringify(s)},["link"in s?(o(),g(oe,{key:0,item:s},null,8,["item"])):"component"in s?(o(),g(B(s.component),F({key:1,ref_for:!0},s.props),null,16)):(o(),g(Is,{key:2,text:s.text,items:s.items},null,8,["text","items"]))],64))),128))])):h("",!0),d(t.$slots,"default",{},void 0,!0)]))}}),zs=_(Os,[["__scopeId","data-v-3069ed14"]]),Ds=["aria-expanded","aria-label"],js={key:0,class:"text"},Fs=["innerHTML"],Us={key:1,class:"vpi-more-horizontal icon"},qs={class:"menu"},Rs=v({__name:"VPFlyout",props:{icon:{},button:{},label:{},items:{}},setup(e){const t=S(!1),n=S();Ss({el:n,onBlur:s});function s(){t.value=!1}return(a,r)=>(o(),c("div",{class:"VPFlyout",ref_key:"el",ref:n,onMouseenter:r[1]||(r[1]=l=>t.value=!0),onMouseleave:r[2]||(r[2]=l=>t.value=!1)},[m("button",{type:"button",class:"button","aria-haspopup":"true","aria-expanded":t.value,"aria-label":e.label,onClick:r[0]||(r[0]=l=>t.value=!t.value)},[e.button||e.icon?(o(),c("span",js,[e.icon?(o(),c("span",{key:0,class:M([e.icon,"option-icon"])},null,2)):h("",!0),e.button?(o(),c("span",{key:1,innerHTML:e.button},null,8,Fs)):h("",!0),r[3]||(r[3]=m("span",{class:"vpi-chevron-down text-icon"},null,-1))])):(o(),c("span",Us))],8,Ds),m("div",qs,[b(zs,{items:e.items},{default:f(()=>[d(a.$slots,"default",{},void 0,!0)]),_:3},8,["items"])])],544))}}),we=_(Rs,[["__scopeId","data-v-67e3cf3d"]]),Ws=["href","aria-label","innerHTML"],Gs=v({__name:"VPSocialLink",props:{icon:{},link:{},ariaLabel:{}},setup(e){const t=e,n=S();z(async()=>{var r;await be();const a=(r=n.value)==null?void 0:r.children[0];a instanceof HTMLElement&&a.className.startsWith("vpi-social-")&&(getComputedStyle(a).maskImage||getComputedStyle(a).webkitMaskImage)==="none"&&a.style.setProperty("--icon",`url('https://api.iconify.design/simple-icons/${t.icon}.svg')`)});const s=x(()=>typeof t.icon=="object"?t.icon.svg:`<span class="vpi-social-${t.icon}"></span>`);return(a,r)=>(o(),c("a",{ref_key:"el",ref:n,class:"VPSocialLink no-icon",href:e.link,"aria-label":e.ariaLabel??(typeof e.icon=="string"?e.icon:""),target:"_blank",rel:"noopener",innerHTML:s.value},null,8,Ws))}}),Ks=_(Gs,[["__scopeId","data-v-b59f4c10"]]),Js={class:"VPSocialLinks"},Ys=v({__name:"VPSocialLinks",props:{links:{}},setup(e){return(t,n)=>(o(),c("div",Js,[(o(!0),c(C,null,V(e.links,({link:s,icon:a,ariaLabel:r})=>(o(),g(Ks,{key:s,icon:a,link:s,ariaLabel:r},null,8,["icon","link","ariaLabel"]))),128))]))}}),$e=_(Ys,[["__scopeId","data-v-19693a76"]]),Zs={key:0,class:"group translations"},Xs={class:"trans-title"},Qs={key:1,class:"group"},ea={class:"item appearance"},ta={class:"label"},na={class:"appearance-action"},sa={key:2,class:"group"},aa={class:"item social-links"},oa=v({__name:"VPNavBarExtra",setup(e){const{site:t,theme:n}=$(),{localeLinks:s,currentLang:a}=Y({correspondingLink:!0}),r=x(()=>s.value.length&&a.value.label||t.value.appearance||n.value.socialLinks);return(l,p)=>r.value?(o(),g(we,{key:0,class:"VPNavBarExtra",label:"extra navigation"},{default:f(()=>[i(s).length&&i(a).label?(o(),c("div",Zs,[m("p",Xs,E(i(a).label),1),(o(!0),c(C,null,V(i(s),u=>(o(),g(oe,{key:u.link,item:u},null,8,["item"]))),128))])):h("",!0),i(t).appearance&&i(t).appearance!=="force-dark"&&i(t).appearance!=="force-auto"?(o(),c("div",Qs,[m("div",ea,[m("p",ta,E(i(n).darkModeSwitchLabel||"Appearance"),1),m("div",na,[b(_e)])])])):h("",!0),i(n).socialLinks?(o(),c("div",sa,[m("div",aa,[b($e,{class:"social-links-list",links:i(n).socialLinks},null,8,["links"])])])):h("",!0)]),_:1})):h("",!0)}}),ia=_(oa,[["__scopeId","data-v-18a1ccdc"]]),ra=["aria-expanded"],la=v({__name:"VPNavBarHamburger",props:{active:{type:Boolean}},emits:["click"],setup(e){return(t,n)=>(o(),c("button",{type:"button",class:M(["VPNavBarHamburger",{active:e.active}]),"aria-label":"mobile navigation","aria-expanded":e.active,"aria-controls":"VPNavScreen",onClick:n[0]||(n[0]=s=>t.$emit("click"))},[...n[1]||(n[1]=[m("span",{class:"container"},[m("span",{class:"top"}),m("span",{class:"middle"}),m("span",{class:"bottom"})],-1)])],10,ra))}}),ca=_(la,[["__scopeId","data-v-3b890d0d"]]),da=["innerHTML"],ua=v({__name:"VPNavBarMenuLink",props:{item:{}},setup(e){const{page:t}=$();return(n,s)=>(o(),g(H,{class:M({VPNavBarMenuLink:!0,active:i(q)(i(t).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,tabindex:"0"},{default:f(()=>[m("span",{innerHTML:e.item.text},null,8,da)]),_:1},8,["class","href","target","rel","no-icon"]))}}),ma=_(ua,[["__scopeId","data-v-7c90280e"]]),pa=v({__name:"VPNavBarMenuGroup",props:{item:{}},setup(e){const t=e,{page:n}=$(),s=r=>"component"in r?!1:"link"in r?q(n.value.relativePath,r.link,!!t.item.activeMatch):r.items.some(s),a=x(()=>s(t.item));return(r,l)=>(o(),g(we,{class:M({VPNavBarMenuGroup:!0,active:i(q)(i(n).relativePath,e.item.activeMatch,!!e.item.activeMatch)||a.value}),button:e.item.text,items:e.item.items},null,8,["class","button","items"]))}}),fa={key:0,"aria-labelledby":"main-nav-aria-label",class:"VPNavBarMenu"},ha=v({__name:"VPNavBarMenu",setup(e){const{theme:t}=$();return(n,s)=>i(t).nav?(o(),c("nav",fa,[s[0]||(s[0]=m("span",{id:"main-nav-aria-label",class:"visually-hidden"}," Main Navigation ",-1)),(o(!0),c(C,null,V(i(t).nav,a=>(o(),c(C,{key:JSON.stringify(a)},["link"in a?(o(),g(ma,{key:0,item:a},null,8,["item"])):"component"in a?(o(),g(B(a.component),F({key:1,ref_for:!0},a.props),null,16)):(o(),g(pa,{key:2,item:a},null,8,["item"]))],64))),128))])):h("",!0)}}),va=_(ha,[["__scopeId","data-v-8808d389"]]);function ba(e){const{localeIndex:t,theme:n}=$();function s(a){var T,N,A;const r=a.split("."),l=(T=n.value.search)==null?void 0:T.options,p=l&&typeof l=="object",u=p&&((A=(N=l.locales)==null?void 0:N[t.value])==null?void 0:A.translations)||null,k=p&&l.translations||null;let L=u,y=k,w=e;const P=r.pop();for(const I of r){let j=null;const W=w==null?void 0:w[I];W&&(j=w=W);const ie=y==null?void 0:y[I];ie&&(j=y=ie);const re=L==null?void 0:L[I];re&&(j=L=re),W||(w=j),ie||(y=j),re||(L=j)}return(L==null?void 0:L[P])??(y==null?void 0:y[P])??(w==null?void 0:w[P])??""}return s}const ga=["aria-label"],ya={class:"DocSearch-Button-Container"},ka={class:"DocSearch-Button-Placeholder"},Le=v({__name:"VPNavBarSearchButton",setup(e){const n=ba({button:{buttonText:"Search",buttonAriaLabel:"Search"}});return(s,a)=>(o(),c("button",{type:"button",class:"DocSearch DocSearch-Button","aria-label":i(n)("button.buttonAriaLabel")},[m("span",ya,[a[0]||(a[0]=m("span",{class:"vp-icon DocSearch-Search-Icon"},null,-1)),m("span",ka,E(i(n)("button.buttonText")),1)]),a[1]||(a[1]=m("span",{class:"DocSearch-Button-Keys"},[m("kbd",{class:"DocSearch-Button-Key"}),m("kbd",{class:"DocSearch-Button-Key"},"K")],-1))],8,ga))}}),_a={class:"VPNavBarSearch"},xa={id:"local-search"},wa={key:1,id:"docsearch"},$a=v({__name:"VPNavBarSearch",setup(e){const t=Je(()=>ge(()=>import("./VPLocalSearchBox.D7C5_ruE.js"),__vite__mapDeps([0,1]))),n=()=>null,{theme:s}=$(),a=S(!1),r=S(!1);z(()=>{});function l(){a.value||(a.value=!0,setTimeout(p,16))}function p(){const y=new Event("keydown");y.key="k",y.metaKey=!0,window.dispatchEvent(y),setTimeout(()=>{document.querySelector(".DocSearch-Modal")||p()},16)}function u(y){const w=y.target,P=w.tagName;return w.isContentEditable||P==="INPUT"||P==="SELECT"||P==="TEXTAREA"}const k=S(!1);de("k",y=>{(y.ctrlKey||y.metaKey)&&(y.preventDefault(),k.value=!0)}),de("/",y=>{u(y)||(y.preventDefault(),k.value=!0)});const L="local";return(y,w)=>{var P;return o(),c("div",_a,[i(L)==="local"?(o(),c(C,{key:0},[k.value?(o(),g(i(t),{key:0,onClose:w[0]||(w[0]=T=>k.value=!1)})):h("",!0),m("div",xa,[b(Le,{onClick:w[1]||(w[1]=T=>k.value=!0)})])],64)):i(L)==="algolia"?(o(),c(C,{key:1},[a.value?(o(),g(i(n),{key:0,algolia:((P=i(s).search)==null?void 0:P.options)??i(s).algolia,onVnodeBeforeMount:w[2]||(w[2]=T=>r.value=!0)},null,8,["algolia"])):h("",!0),r.value?h("",!0):(o(),c("div",wa,[b(Le,{onClick:l})]))],64)):h("",!0)])}}}),La=v({__name:"VPNavBarSocialLinks",setup(e){const{theme:t}=$();return(n,s)=>i(t).socialLinks?(o(),g($e,{key:0,class:"VPNavBarSocialLinks",links:i(t).socialLinks},null,8,["links"])):h("",!0)}}),Sa=_(La,[["__scopeId","data-v-1bb4678a"]]),Pa=["href","rel","target"],Ma=["innerHTML"],Ea={key:2},Ca=v({__name:"VPNavBarTitle",setup(e){const{site:t,theme:n}=$(),{hasSidebar:s}=D(),{currentLang:a}=Y(),r=x(()=>{var u;return typeof n.value.logoLink=="string"?n.value.logoLink:(u=n.value.logoLink)==null?void 0:u.link}),l=x(()=>{var u;return typeof n.value.logoLink=="string"||(u=n.value.logoLink)==null?void 0:u.rel}),p=x(()=>{var u;return typeof n.value.logoLink=="string"||(u=n.value.logoLink)==null?void 0:u.target});return(u,k)=>(o(),c("div",{class:M(["VPNavBarTitle",{"has-sidebar":i(s)}])},[m("a",{class:"title",href:r.value??i(ye)(i(a).link),rel:l.value,target:p.value},[d(u.$slots,"nav-bar-title-before",{},void 0,!0),i(n).logo?(o(),g(Q,{key:0,class:"logo",image:i(n).logo},null,8,["image"])):h("",!0),i(n).siteTitle?(o(),c("span",{key:1,innerHTML:i(n).siteTitle},null,8,Ma)):i(n).siteTitle===void 0?(o(),c("span",Ea,E(i(t).title),1)):h("",!0),d(u.$slots,"nav-bar-title-after",{},void 0,!0)],8,Pa)],2))}}),Ta=_(Ca,[["__scopeId","data-v-e9cc5a3b"]]),Na={class:"items"},Va={class:"title"},Aa=v({__name:"VPNavBarTranslations",setup(e){const{theme:t}=$(),{localeLinks:n,currentLang:s}=Y({correspondingLink:!0});return(a,r)=>i(n).length&&i(s).label?(o(),g(we,{key:0,class:"VPNavBarTranslations",icon:"vpi-languages",label:i(t).langMenuLabel||"Change language"},{default:f(()=>[m("div",Na,[m("p",Va,E(i(s).label),1),(o(!0),c(C,null,V(i(n),l=>(o(),g(oe,{key:l.link,item:l},null,8,["item"]))),128))])]),_:1},8,["label"])):h("",!0)}}),Ia=_(Aa,[["__scopeId","data-v-a94aa585"]]),Ba={class:"wrapper"},Ha={class:"container"},Oa={class:"title"},za={class:"content"},Da={class:"content-body"},ja=v({__name:"VPNavBar",props:{isScreenOpen:{type:Boolean}},emits:["toggle-screen"],setup(e){const t=e,{y:n}=Ne(),{hasSidebar:s}=D(),{frontmatter:a}=$(),r=S({});return he(()=>{r.value={"has-sidebar":s.value,home:a.value.layout==="home",top:n.value===0,"screen-open":t.isScreenOpen}}),(l,p)=>(o(),c("div",{class:M(["VPNavBar",r.value])},[m("div",Ba,[m("div",Ha,[m("div",Oa,[b(Ta,null,{"nav-bar-title-before":f(()=>[d(l.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(l.$slots,"nav-bar-title-after",{},void 0,!0)]),_:3})]),m("div",za,[m("div",Da,[d(l.$slots,"nav-bar-content-before",{},void 0,!0),b($a,{class:"search"}),b(va,{class:"menu"}),b(Ia,{class:"translations"}),b(Ls,{class:"appearance"}),b(Sa,{class:"social-links"}),b(ia,{class:"extra"}),d(l.$slots,"nav-bar-content-after",{},void 0,!0),b(ca,{class:"hamburger",active:e.isScreenOpen,onClick:p[0]||(p[0]=u=>l.$emit("toggle-screen"))},null,8,["active"])])])])]),p[1]||(p[1]=m("div",{class:"divider"},[m("div",{class:"divider-line"})],-1))],2))}}),Fa=_(ja,[["__scopeId","data-v-3ab73e7b"]]),Ua={key:0,class:"VPNavScreenAppearance"},qa={class:"text"},Ra=v({__name:"VPNavScreenAppearance",setup(e){const{site:t,theme:n}=$();return(s,a)=>i(t).appearance&&i(t).appearance!=="force-dark"&&i(t).appearance!=="force-auto"?(o(),c("div",Ua,[m("p",qa,E(i(n).darkModeSwitchLabel||"Appearance"),1),b(_e)])):h("",!0)}}),Wa=_(Ra,[["__scopeId","data-v-37fe674d"]]),Ga=["innerHTML"],Ka=v({__name:"VPNavScreenMenuLink",props:{item:{}},setup(e){const t=ae("close-screen");return(n,s)=>(o(),g(H,{class:"VPNavScreenMenuLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:i(t)},{default:f(()=>[m("span",{innerHTML:e.item.text},null,8,Ga)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),Ja=_(Ka,[["__scopeId","data-v-bc15f849"]]),Ya=["innerHTML"],Za=v({__name:"VPNavScreenMenuGroupLink",props:{item:{}},setup(e){const t=ae("close-screen");return(n,s)=>(o(),g(H,{class:"VPNavScreenMenuGroupLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:i(t)},{default:f(()=>[m("span",{innerHTML:e.item.text},null,8,Ya)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),je=_(Za,[["__scopeId","data-v-d3602131"]]),Xa={class:"VPNavScreenMenuGroupSection"},Qa={key:0,class:"title"},eo=v({__name:"VPNavScreenMenuGroupSection",props:{text:{},items:{}},setup(e){return(t,n)=>(o(),c("div",Xa,[e.text?(o(),c("p",Qa,E(e.text),1)):h("",!0),(o(!0),c(C,null,V(e.items,s=>(o(),g(je,{key:s.text,item:s},null,8,["item"]))),128))]))}}),to=_(eo,[["__scopeId","data-v-2b3547d3"]]),no=["aria-controls","aria-expanded"],so=["innerHTML"],ao=["id"],oo={key:0,class:"item"},io={key:1,class:"item"},ro={key:2,class:"group"},lo=v({__name:"VPNavScreenMenuGroup",props:{text:{},items:{}},setup(e){const t=e,n=S(!1),s=x(()=>`NavScreenGroup-${t.text.replace(" ","-").toLowerCase()}`);function a(){n.value=!n.value}return(r,l)=>(o(),c("div",{class:M(["VPNavScreenMenuGroup",{open:n.value}])},[m("button",{class:"button","aria-controls":s.value,"aria-expanded":n.value,onClick:a},[m("span",{class:"button-text",innerHTML:e.text},null,8,so),l[0]||(l[0]=m("span",{class:"vpi-plus button-icon"},null,-1))],8,no),m("div",{id:s.value,class:"items"},[(o(!0),c(C,null,V(e.items,p=>(o(),c(C,{key:JSON.stringify(p)},["link"in p?(o(),c("div",oo,[b(je,{item:p},null,8,["item"])])):"component"in p?(o(),c("div",io,[(o(),g(B(p.component),F({ref_for:!0},p.props,{"screen-menu":""}),null,16))])):(o(),c("div",ro,[b(to,{text:p.text,items:p.items},null,8,["text","items"])]))],64))),128))],8,ao)],2))}}),co=_(lo,[["__scopeId","data-v-a847b428"]]),uo={key:0,class:"VPNavScreenMenu"},mo=v({__name:"VPNavScreenMenu",setup(e){const{theme:t}=$();return(n,s)=>i(t).nav?(o(),c("nav",uo,[(o(!0),c(C,null,V(i(t).nav,a=>(o(),c(C,{key:JSON.stringify(a)},["link"in a?(o(),g(Ja,{key:0,item:a},null,8,["item"])):"component"in a?(o(),g(B(a.component),F({key:1,ref_for:!0},a.props,{"screen-menu":""}),null,16)):(o(),g(co,{key:2,text:a.text||"",items:a.items},null,8,["text","items"]))],64))),128))])):h("",!0)}}),po=v({__name:"VPNavScreenSocialLinks",setup(e){const{theme:t}=$();return(n,s)=>i(t).socialLinks?(o(),g($e,{key:0,class:"VPNavScreenSocialLinks",links:i(t).socialLinks},null,8,["links"])):h("",!0)}}),fo={class:"list"},ho=v({__name:"VPNavScreenTranslations",setup(e){const{localeLinks:t,currentLang:n}=Y({correspondingLink:!0}),s=S(!1);function a(){s.value=!s.value}return(r,l)=>i(t).length&&i(n).label?(o(),c("div",{key:0,class:M(["VPNavScreenTranslations",{open:s.value}])},[m("button",{class:"title",onClick:a},[l[0]||(l[0]=m("span",{class:"vpi-languages icon lang"},null,-1)),U(" "+E(i(n).label)+" ",1),l[1]||(l[1]=m("span",{class:"vpi-chevron-down icon chevron"},null,-1))]),m("ul",fo,[(o(!0),c(C,null,V(i(t),p=>(o(),c("li",{key:p.link,class:"item"},[b(H,{class:"link",href:p.link},{default:f(()=>[U(E(p.text),1)]),_:2},1032,["href"])]))),128))])],2)):h("",!0)}}),vo=_(ho,[["__scopeId","data-v-b9dac79b"]]),bo={class:"container"},go=v({__name:"VPNavScreen",props:{open:{type:Boolean}},setup(e){const t=S(null),n=Ve(J?document.body:null);return(s,a)=>(o(),g(ee,{name:"fade",onEnter:a[0]||(a[0]=r=>n.value=!0),onAfterLeave:a[1]||(a[1]=r=>n.value=!1)},{default:f(()=>[e.open?(o(),c("div",{key:0,class:"VPNavScreen",ref_key:"screen",ref:t,id:"VPNavScreen"},[m("div",bo,[d(s.$slots,"nav-screen-content-before",{},void 0,!0),b(mo,{class:"menu"}),b(vo,{class:"translations"}),b(Wa,{class:"appearance"}),b(po,{class:"social-links"}),d(s.$slots,"nav-screen-content-after",{},void 0,!0)])],512)):h("",!0)]),_:3}))}}),yo=_(go,[["__scopeId","data-v-e26a33f1"]]),ko={key:0,class:"VPNav"},_o=v({__name:"VPNav",setup(e){const{isScreenOpen:t,closeScreen:n,toggleScreen:s}=hs(),{frontmatter:a}=$(),r=x(()=>a.value.navbar!==!1);return Ae("close-screen",n),te(()=>{J&&document.documentElement.classList.toggle("hide-nav",!r.value)}),(l,p)=>r.value?(o(),c("header",ko,[b(Fa,{"is-screen-open":i(t),onToggleScreen:i(s)},{"nav-bar-title-before":f(()=>[d(l.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(l.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":f(()=>[d(l.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":f(()=>[d(l.$slots,"nav-bar-content-after",{},void 0,!0)]),_:3},8,["is-screen-open","onToggleScreen"]),b(yo,{open:i(t)},{"nav-screen-content-before":f(()=>[d(l.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":f(()=>[d(l.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3},8,["open"])])):h("",!0)}}),xo=_(_o,[["__scopeId","data-v-2807570c"]]),wo=["role","tabindex"],$o={key:1,class:"items"},Lo=v({__name:"VPSidebarItem",props:{item:{},depth:{}},setup(e){const t=e,{collapsed:n,collapsible:s,isLink:a,isActiveLink:r,hasActiveLink:l,hasChildren:p,toggle:u}=gt(x(()=>t.item)),k=x(()=>p.value?"section":"div"),L=x(()=>a.value?"a":"div"),y=x(()=>p.value?t.depth+2===7?"p":`h${t.depth+2}`:"p"),w=x(()=>a.value?void 0:"button"),P=x(()=>[[`level-${t.depth}`],{collapsible:s.value},{collapsed:n.value},{"is-link":a.value},{"is-active":r.value},{"has-active":l.value}]);function T(A){"key"in A&&A.key!=="Enter"||!t.item.link&&u()}function N(){t.item.link&&u()}return(A,I)=>{const j=R("VPSidebarItem",!0);return o(),g(B(k.value),{class:M(["VPSidebarItem",P.value])},{default:f(()=>[e.item.text?(o(),c("div",F({key:0,class:"item",role:w.value},Ye(e.item.items?{click:T,keydown:T}:{},!0),{tabindex:e.item.items&&0}),[I[1]||(I[1]=m("div",{class:"indicator"},null,-1)),e.item.link?(o(),g(H,{key:0,tag:L.value,class:"link",href:e.item.link,rel:e.item.rel,target:e.item.target},{default:f(()=>[(o(),g(B(y.value),{class:"text",innerHTML:e.item.text},null,8,["innerHTML"]))]),_:1},8,["tag","href","rel","target"])):(o(),g(B(y.value),{key:1,class:"text",innerHTML:e.item.text},null,8,["innerHTML"])),e.item.collapsed!=null&&e.item.items&&e.item.items.length?(o(),c("div",{key:2,class:"caret",role:"button","aria-label":"toggle section",onClick:N,onKeydown:Ze(N,["enter"]),tabindex:"0"},[...I[0]||(I[0]=[m("span",{class:"vpi-chevron-right caret-icon"},null,-1)])],32)):h("",!0)],16,wo)):h("",!0),e.item.items&&e.item.items.length?(o(),c("div",$o,[e.depth<5?(o(!0),c(C,{key:0},V(e.item.items,W=>(o(),g(j,{key:W.text,item:W,depth:e.depth+1},null,8,["item","depth"]))),128)):h("",!0)])):h("",!0)]),_:1},8,["class"])}}}),So=_(Lo,[["__scopeId","data-v-72d39c88"]]),Po=v({__name:"VPSidebarGroup",props:{items:{}},setup(e){const t=S(!0);let n=null;return z(()=>{n=setTimeout(()=>{n=null,t.value=!1},300)}),Xe(()=>{n!=null&&(clearTimeout(n),n=null)}),(s,a)=>(o(!0),c(C,null,V(e.items,r=>(o(),c("div",{key:r.text,class:M(["group",{"no-transition":t.value}])},[b(So,{item:r,depth:0},null,8,["item"])],2))),128))}}),Mo=_(Po,[["__scopeId","data-v-384522e4"]]),Eo={class:"nav",id:"VPSidebarNav","aria-labelledby":"sidebar-aria-label",tabindex:"-1"},Co=v({__name:"VPSidebar",props:{open:{type:Boolean}},setup(e){const{sidebarGroups:t,hasSidebar:n}=D(),s=e,a=S(null),r=Ve(J?document.body:null);O([s,a],()=>{var p;s.open?(r.value=!0,(p=a.value)==null||p.focus()):r.value=!1},{immediate:!0,flush:"post"});const l=S(0);return O(t,()=>{l.value+=1},{deep:!0}),(p,u)=>i(n)?(o(),c("aside",{key:0,class:M(["VPSidebar",{open:e.open}]),ref_key:"navEl",ref:a,onClick:u[0]||(u[0]=Ie(()=>{},["stop"]))},[u[2]||(u[2]=m("div",{class:"curtain"},null,-1)),m("nav",Eo,[u[1]||(u[1]=m("span",{class:"visually-hidden",id:"sidebar-aria-label"}," Sidebar Navigation ",-1)),d(p.$slots,"sidebar-nav-before",{},void 0,!0),(o(),g(Mo,{items:i(t),key:l.value},null,8,["items"])),d(p.$slots,"sidebar-nav-after",{},void 0,!0)])],2)):h("",!0)}}),To=_(Co,[["__scopeId","data-v-789d6e2a"]]),No=v({__name:"VPSkipLink",setup(e){const{theme:t}=$(),n=K(),s=S();O(()=>n.path,()=>s.value.focus());function a({target:r}){const l=document.getElementById(decodeURIComponent(r.hash).slice(1));if(l){const p=()=>{l.removeAttribute("tabindex"),l.removeEventListener("blur",p)};l.setAttribute("tabindex","-1"),l.addEventListener("blur",p),l.focus(),window.scrollTo(0,0)}}return(r,l)=>(o(),c(C,null,[m("span",{ref_key:"backToTop",ref:s,tabindex:"-1"},null,512),m("a",{href:"#VPContent",class:"VPSkipLink visually-hidden",onClick:a},E(i(t).skipToContentLabel||"Skip to content"),1)],64))}}),Vo=_(No,[["__scopeId","data-v-90482f3f"]]),Ao=v({__name:"Layout",setup(e){const{isOpen:t,open:n,close:s}=D(),a=K();O(()=>a.path,s),bt(t,s);const{frontmatter:r}=$(),l=Qe(),p=x(()=>!!l["home-hero-image"]);return Ae("hero-image-slot-exists",p),(u,k)=>{const L=R("Content");return i(r).layout!==!1?(o(),c("div",{key:0,class:M(["Layout",i(r).pageClass])},[d(u.$slots,"layout-top",{},void 0,!0),b(Vo),b(at,{class:"backdrop",show:i(t),onClick:i(s)},null,8,["show","onClick"]),b(xo,null,{"nav-bar-title-before":f(()=>[d(u.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(u.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":f(()=>[d(u.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":f(()=>[d(u.$slots,"nav-bar-content-after",{},void 0,!0)]),"nav-screen-content-before":f(()=>[d(u.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":f(()=>[d(u.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3}),b(fs,{open:i(t),onOpenMenu:i(n)},null,8,["open","onOpenMenu"]),b(To,{open:i(t)},{"sidebar-nav-before":f(()=>[d(u.$slots,"sidebar-nav-before",{},void 0,!0)]),"sidebar-nav-after":f(()=>[d(u.$slots,"sidebar-nav-after",{},void 0,!0)]),_:3},8,["open"]),b(Xn,null,{"page-top":f(()=>[d(u.$slots,"page-top",{},void 0,!0)]),"page-bottom":f(()=>[d(u.$slots,"page-bottom",{},void 0,!0)]),"not-found":f(()=>[d(u.$slots,"not-found",{},void 0,!0)]),"home-hero-before":f(()=>[d(u.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":f(()=>[d(u.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(u.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(u.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(u.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(u.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":f(()=>[d(u.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":f(()=>[d(u.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":f(()=>[d(u.$slots,"home-features-after",{},void 0,!0)]),"doc-footer-before":f(()=>[d(u.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":f(()=>[d(u.$slots,"doc-before",{},void 0,!0)]),"doc-after":f(()=>[d(u.$slots,"doc-after",{},void 0,!0)]),"doc-top":f(()=>[d(u.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":f(()=>[d(u.$slots,"doc-bottom",{},void 0,!0)]),"aside-top":f(()=>[d(u.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":f(()=>[d(u.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":f(()=>[d(u.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(u.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(u.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(u.$slots,"aside-ads-after",{},void 0,!0)]),_:3}),b(ss),d(u.$slots,"layout-bottom",{},void 0,!0)],2)):(o(),g(L,{key:1}))}}}),Io=_(Ao,[["__scopeId","data-v-96e0de72"]]),Bo={Layout:Io,enhanceApp:({app:e})=>{e.component("Badge",tt)}},Ho=500,Z="data-folded";function Oo(e){J&&z(()=>{O(()=>e.path,()=>be(()=>zo()),{immediate:!0})})}function zo(){document.querySelectorAll('div[class*="language-"]').forEach(e=>{if(e.querySelector(".codeblock-fold-btn"))return;const t=e.querySelector("pre");if(!t||t.scrollHeight<=Ho)return;e.setAttribute(Z,"");const n=document.createElement("button");n.className="codeblock-fold-btn",n.type="button",n.textContent="Show more",n.addEventListener("click",()=>{e.hasAttribute(Z)?(e.removeAttribute(Z),n.textContent="Show less"):(e.setAttribute(Z,""),n.textContent="Show more",e.scrollIntoView({block:"nearest"}))}),e.appendChild(n)})}const Do={},jo={class:"pg-loading-skeleton"};function Fo(e,t){return o(),c("div",jo,[...t[0]||(t[0]=[et('<div class="pg-editor pg-editor-loading"><div class="pg-editor-tabs"><button class="pg-editor-tab active">HTML</button><button class="pg-editor-tab">CSS</button><button class="pg-editor-tab">JS</button></div><div class="pg-editor-container"></div></div><div class="pg-preview"><div class="pg-preview-header"><span class="pg-preview-title">Preview</span></div><div class="pg-preview-iframe"></div></div>',2)])])}const Se=_(Do,[["render",Fo]]),Uo={class:"pg-sidebar-nav"},qo={class:"pg-sidebar-heading"},Ro={class:"pg-sidebar-items"},Wo={class:"item"},Go=["href","onClick"],Ko={class:"text"},Jo={__name:"PlaygroundSidebar",props:{examples:{type:Array,required:!0},currentId:{type:String,default:""},open:{type:Boolean,default:!1}},emits:["select","toggle"],setup(e,{emit:t}){const n=t;return(s,a)=>(o(),c(C,null,[m("div",{class:M(["pg-sidebar-backdrop",{open:e.open}]),onClick:a[0]||(a[0]=r=>n("toggle"))},null,2),m("aside",{class:M(["pg-sidebar",{open:e.open}])},[m("nav",Uo,[(o(!0),c(C,null,V(e.examples,r=>(o(),c("div",{key:r.category,class:"pg-sidebar-group"},[m("p",qo,E(r.category),1),m("div",Ro,[(o(!0),c(C,null,V(r.items,l=>(o(),c("div",{key:l.id,class:M(["pg-sidebar-item",{"is-active":e.currentId===l.id}])},[m("div",Wo,[a[1]||(a[1]=m("div",{class:"indicator"},null,-1)),m("a",{class:"link",href:"#"+l.id,onClick:Ie(p=>n("select",l.id),["prevent"])},[m("p",Ko,E(l.title),1)],8,Go)])],2))),128))])]))),128))])],2)],64))}},Yo={id:"hello-world",title:"Hello World",js:`import { Elena, html } from "@elenajs/core";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /** @attribute @type {String} */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}

MyGreeting.define();`,html:'<my-greeting name="Elena"></my-greeting>'},Zo={id:"composite-component",title:"Composite Component",js:`import { Elena } from "@elenajs/core";

export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /** @attribute @type {"column" | "row"} */
  direction = "column";
}

MyStack.define();`,css:`@scope (my-stack) {
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[direction="row"] {
    flex-direction: row;
  }
}`,html:`<my-stack>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>

<br/>

<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>`},Xo={id:"primitive-component",title:"Primitive Component",js:`import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /** @attribute @type {"default" | "primary" | "danger"} */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();`,css:`@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-button-bg: #eaecf0;
    --my-button-text: #172b4d;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    color: var(--my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :scope:hover {
    filter: brightness(0.95);
  }

  .my-button:active {
    opacity: 0.7;
  }

  .my-button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  :scope[variant="primary"] {
    --my-button-bg: #5a44d4;
    --my-button-text: #fff;
  }

  :scope[variant="danger"] {
    --my-button-bg: #d44444;
    --my-button-text: #fff;
  }
}`,html:`<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`},Qo={id:"declarative-component",title:"Declarative Component",js:`import { Elena } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static shadow = "open";
}

MyButton.define();`,html:`<my-button>
  <template shadowrootmode="open">
    <style>
      /* In production, these would live in a separate 
         stylesheet loaded via <link> in the template. */
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #5a44d4;
        color: #fff;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.9);
      }
      button:active {
        opacity: 0.7;
      }
      button:focus {
        outline: 2px solid #5a44d4;
        outline-offset: 1px;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Click me
</my-button>

<my-button>
  <template shadowrootmode="open">
    <style>
      /* In production, these would live in a separate 
         stylesheet loaded via <link> in the template. */
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #eaecf0;
        color: #172b4d;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.95);
      }
      button:active {
        opacity: 0.7;
      }
      button:focus {
        outline: 2px solid #5a44d4;
        outline-offset: 1px;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Cancel
</my-button>`},ei={id:"string-props",title:"String Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  /** @attribute @type {"info" | "success" | "warning" | "error"} */
  variant = "info";

  render() {
    return html\`
      <span class="my-badge">
        \${this.text}
      </span>
    \`;
  }
}

MyBadge.define();`,css:`@scope (my-badge) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-badge-bg: #5a44d4;
    --my-badge-text: #fff;
    display: inline-block;
  }

  :scope:not([hydrated]),
  .my-badge:is(span) {
    font-family: system-ui, sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem 0.3rem;
    border-radius: 9999px;
    background: var(--my-badge-bg);
    color: var(--my-badge-text);
    display: inline-flex;
  }

  :scope[variant="success"] {
    --my-badge-bg: #5B7F24;
    --my-badge-text: #fff;
  }

  :scope[variant="warning"] {
    --my-badge-bg: #FBC828;
    --my-badge-text: #292A2E;
  }

  :scope[variant="error"] {
    --my-badge-bg: #d44444;
    --my-badge-text: #fff;
  }
}`,html:`<my-badge variant="info">Info</my-badge>
<my-badge variant="success">Success</my-badge>
<my-badge variant="warning">Warning</my-badge>
<my-badge variant="error">Error</my-badge>`},ti={id:"boolean-props",title:"Boolean Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCheckbox extends Elena(HTMLElement) {
  static tagName = "my-checkbox";
  static props = ["checked", "disabled", "label"];
  static events = ["change"];

  /** @attribute @type {Boolean} */
  checked = false;

  /** @attribute @type {Boolean} */
  disabled = false;

  /** @attribute @type {String} */
  label = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", () => {
      this.checked = !this.checked;
    });
  }

  render() {
    return html\`
      <label>
        <input type="checkbox"
          \${this.checked ? "checked" : ""}
          \${this.disabled ? "disabled" : ""}
        />
          \${this.label}
      </label>
    \`;
  }
}

MyCheckbox.define();`,css:`@scope (my-checkbox) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    user-select: none;
  }

  label {
    -webkit-user-select: none;
    user-select: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9375rem;
    margin-block-end: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    inline-size: 1.125rem;
    block-size: 1.125rem;
    border: 2px solid #929396;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: grid;
    place-content: center;
    flex-shrink: 0;
    transition: background 0.05s, border-color 0.05s;
  }

  input[type="checkbox"]::before {
    content: "";
    inline-size: 0.75rem;
    block-size: 0.75rem;
    clip-path: polygon(10% 50%, 0 63%, 48% 100%, 100% 14%, 88% 0%, 48% 74%);
    background: #fff;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background: #5a44d4;
    border-color: #5a44d4
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  input[type="checkbox"]:disabled {
    opacity: 0.5;
    background: #a5a9af;
    color: #a5a9af;
  }

  :scope[disabled] {
    color: #a5a9af;
  }
}`,html:`<my-checkbox label="Unchecked"></my-checkbox>
<my-checkbox checked label="Checked"></my-checkbox>
<my-checkbox disabled label="Disabled"></my-checkbox>`},ni={id:"number-props",title:"Number Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step", "max"];

  /** @attribute @type {Number} */
  count = 0;

  /** @attribute @type {Number} */
  step = 1;

  /** @attribute @type {Number} */
  max = Infinity;

  increment() {
    this.count = Math.min(this.max, this.count + this.step);
  }

  decrement() {
    this.count = Math.max(0, this.count - this.step);
  }

  render() {
    return html\`
      <!-- Please note this isn’t accessible! -->
      <div class="my-counter">
        <button 
          class="decrement"
          onclick="this.closest('my-counter').decrement()">
            –
        </button>
        <span class="value">\${this.count}</span>
        <button
          class="increment"
          onclick="this.closest('my-counter').increment()">
            +
        </button>
      </div>
    \`;
  }
}
MyCounter.define();`,css:`@scope (my-counter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: inline-block;
  }

  .my-counter {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-family: system-ui, sans-serif;
    border: 2px solid #929396;
    background: #fdfeff;
    color: #172b4d;
    border-radius: 6px;
  }

  .my-counter button {
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    color: #75767A;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-counter button:first-of-type {
    border-inline-end: 1px solid #c2c4c9;
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;
  }

  .my-counter button:last-of-type {
    border-inline-start: 1px solid #c2c4c9;
    border-start-end-radius: 6px;
    border-end-end-radius: 6px;
  }

  .my-counter button:hover {
    filter: brightness(0.95);
  }

  .my-counter button:active {
    opacity: 0.7;
  }

  .my-counter button:focus {
    outline: 2px solid #5a44d4;
  }

  .my-counter .value {
    padding: 0.5rem 0.75rem;
    min-inline-size: 1.5rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }
}`,html:`<my-counter></my-counter>
<my-counter count="10" step="5" max="95"></my-counter>`},si={id:"array-object-props",title:"Array/Object Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = ["items", "heading"];

  /** @attribute @type {Array} */
  items = [];

  /** @attribute @type {String} */
  heading = "List";

  render() {
    return html\`
      <div class="my-list">
        <h3>\${this.heading}</h3>
        <ul>
          \${this.items.map(item => html\`<li>\${item}</li>\`)}
        </ul>
      </div>
    \`;
  }
}

MyList.define();`,html:`<my-list
  heading="Fruits"
  items='["Apple", "Banana", "Cherry", "Date"]'
></my-list>`},ai={id:"conditional-rendering",title:"Conditional Rendering",js:`import { Elena, html, nothing } from "@elenajs/core";

export default class MyAlert extends Elena(HTMLElement) {
  static tagName = "my-alert";
  static props = ["variant", "dismissible"];

  /** @attribute @type {"info" | "warning" | "error"} */
  variant = "info";

  /** @attribute @type {Boolean} */
  dismissible = false;

  render() {
    const close = this.dismissible
      ? html\`<button onclick="this.closest('my-alert').remove()">×</button>\`
      : nothing;

    const icon = html\`<span class="icon">&#9888;</span>\`;

    return html\`
      <div class="my-alert" role="alert">
        \${icon}
        <span class="message">\${this.text}</span>
        \${close}
      </div>
    \`;
  }
}

MyAlert.define();`,css:`@scope (my-alert) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-alert-bg: #cdedff;
    --my-alert-border: #3182ce;
  }

  :scope:not([hydrated]),
  .my-alert {
    margin-block-end: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    min-block-size: 1.5rem;
    border-inline-start: 3px solid var(--my-alert-border);
    background: var(--my-alert-bg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :scope:not([hydrated]) {
    padding-inline-start: 2.5rem;
  }

  .icon {
    font-size: 1rem;
    inline-size: 1rem;
  }

  .message {
    flex: 1;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    opacity: 0.6;
  }

  button:hover {
    opacity: 1;
  }

  button:focus {
    outline: 2px solid #5a44d4;
  }

  :scope[variant="warning"] {
    --my-alert-bg: #ffedc2;
    --my-alert-border: #e7af20;
  }

  :scope[variant="error"] {
    --my-alert-bg: #fed7d7;
    --my-alert-border: #e53e3e;
  }
}`,html:`<my-alert variant="error">Something went wrong!</my-alert>
<my-alert variant="info">This is an informational message.</my-alert>
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>`},oi={id:"list-rendering",title:"List Rendering",js:`import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = [{ name: "todos", reflect: false }];

  /** @type {Array} */
  todos = [
    { text: "Learn Elena", done: true },
    { text: "Build a component", done: false },
    { text: "Ship it", done: false },
  ];

  toggle(index) {
    this.todos[index].done = !this.todos[index].done;
    this.requestUpdate();
  }

  render() {
    const total = this.todos.length;
    const done = this.todos.filter(t => t.done).length;

    return html\`
      <div class="my-list">
        <p class="summary">\${done} of \${total} completed</p>
        <ul>
          \${this.todos.map(
            (todo, i) => html\`
              <li class="\${todo.done ? "done" : ""}">
                \${todo.text}
              </li>
          \`)}
        </ul>
      </div>
    \`;
  }
}

MyList.define();`,css:`@scope (my-list) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
  }

  .my-list {
    font-family: system-ui, sans-serif;
    max-inline-size: 300px;
  }

  .summary {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.5rem;
    display: block;
  }

  ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0;
    border-block-end: 1px solid #edf2f7;
  }

  li.done {
    text-decoration: line-through;
    color: #a0aec0;
  }
}`,html:"<my-list></my-list>"},ii={id:"unsafe-html",title:"unsafeHTML",js:`import { Elena, html, unsafeHTML } from "@elenajs/core";

export default class MyIcon extends Elena(HTMLElement) {
  static tagName = "my-icon";
  static props = ["name"];

  /** @attribute @type {String} */
  name = "star";

  get icons() {
    return {
      star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
      heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>',
      check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M4 13l5 5L20 7"/></svg>',
    };
  }

  render() {
    const svg = this.icons[this.name] || this.icons.star;

    return html\`
      <span class="my-icon">\${unsafeHTML(svg)}</span>
    \`;
  }
}

MyIcon.define();`,css:`@scope (my-icon) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: inline-flex;
    vertical-align: middle;
    color: #4a5568;
  }

  .my-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 3rem;
  }

  svg {
    inline-size: 100%;
    block-size: 100%;
  }
}`,html:`<my-icon name="heart" style="color: #e53e3e"></my-icon>
<my-icon name="star" style="color: #ecc94b"></my-icon>
<my-icon name="check" style="color: #48bb78"></my-icon>`},ri={id:"element-ref",title:"Element Ref",js:`import { Elena, html } from "@elenajs/core";

export default class MyInput extends Elena(HTMLElement) {
  static tagName = "my-input";
  static props = ["label"];
  static element = "input";

  /** @attribute @type {String} */
  label = "";

  firstUpdated() {
    this.element.addEventListener("input", () => {
      this.querySelector(".hint").textContent =
        "Characters: " + this.element.value.length;
    });
  }

  updated() {
    this.element.focus();
  }

  render() {
    return html\`
      <div class="my-input">
        <label for="input">\${this.label}</label>
        <input id="input" type="text" placeholder="Start typing..." />
        <small class="hint">Characters: 0</small>
      </div>
    \`;
  }
}

MyInput.define();`,css:`@scope (my-input) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    margin-block-end: 0.75rem;
  }

  .my-input {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    font-weight: 600;
    color: #4a5568;
    display: block;
  }

  .hint {
    color: #898f97;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-input input {
  all: unset;
  padding: 0.5rem;
  border: 1px solid #a5a9af;
  border-radius: 4px;
  display: block;
}

my-input input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:'<my-input label="Character counter"></my-input>'},li={id:"delegated-events",title:"Delegated Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click", "focus", "blur"];

  /** @attribute @type {"default" | "primary"} */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();

// Now we can listen on the host element
document.querySelectorAll("my-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("log").textContent +=
      "Clicked: " + btn.text + "\\n";
  });
});`,css:`@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-button-bg: #eaecf0;
    display: inline-block;
    cursor: pointer;
    color: #172b4d;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    display: inline-flex;
  }

  .my-button:hover {
    filter: brightness(0.95);
  }

  .my-button:active {
    opacity: 0.7;
  }

  .my-button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  :scope[variant="primary"] {
    --my-button-bg: #5a44d4;
    color: #fff;
  }
}

#log {
  font-family: ui-monospace, monospace;
  background: #f7fafc;
  padding: 0.75rem;
  border-radius: 4px;
  margin-block-start: 1rem;
  min-block-size: 3rem;
  white-space: pre;
}`,html:`<my-button>Say Hello</my-button>
<my-button variant="primary">Say World</my-button>

<pre id="log"></pre>`},ci={id:"custom-events",title:"Custom Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyRating extends Elena(HTMLElement) {
  static tagName = "my-rating";
  static props = [{ name: "value", reflect: false }];

  /** @type {Number} */
  value = 0;

  rate(stars) {
    this.value = stars;
    this.dispatchEvent(new CustomEvent("rate", {
      bubbles: true,
      detail: { value: stars } 
    }));
  }

  render() {
    return html\`
      <div class="my-rating">
        \${[1, 2, 3, 4, 5].map(
          stars => html\`
          <button
            class="star \${stars <= this.value ? "active" : ""}"
            onclick="this.closest('my-rating').rate(\${stars})">
              \${stars <= this.value ? "★" : "☆"}
          </button>\`
        )}
      </div>
    \`;
  }
}

MyRating.define();

// Now we can listen on the host element
document.querySelector("my-rating").addEventListener("rate", e => {
  document.getElementById("output").textContent =
    "You rated: " + e.detail.value + " star(s)";
});`,css:`@scope (my-rating) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: inline-block; }

  .my-rating {
    display: inline-flex;
    gap: 0.125rem;
  }

  .star {
    font-size: 2rem;
    cursor: pointer;
    color: #b9c3ce;
    padding: 0.125rem;
    display: inline-flex;
  }

  .star.active,
  .star:hover,
  .star:focus {
    color: #ffb300;
  }
}`,html:`<my-rating></my-rating>

<p id="output">Click a star to rate.</p>`},di={id:"manual-listeners",title:"Manual Listeners",js:`import { Elena, html } from "@elenajs/core";

export default class MyKeyLogger extends Elena(HTMLElement) {
  static tagName = "my-key-logger";
  static props = [{ name: "keys", reflect: false }];

  /** @type {Array} */
  keys = [];

  connectedCallback() {
    super.connectedCallback();
    this._onKeyDown = e => {
      this.keys = [...this.keys.slice(-100), e.key];
    };
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this._onKeyDown);
    this.focus();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKeyDown);
  }

  clear() {
    this.keys = [];
  }

  render() {
    return html\`
      <div class="my-key-logger">
        <p class="hint">Press any key while focused here:</p>
        <div class="keys">
          \${this.keys.length
            ? this.keys.map(k => html\`<kbd>\${k}</kbd>\`)
            : html\`<span class="empty">No keys pressed yet</span>\`
          }
        </div>
        <button class="clear" onclick="this.closest('my-key-logger').clear()">Clear</button>
      </div>
    \`;
  }
}

MyKeyLogger.define();`,css:`@scope (my-key-logger) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    outline: none;
  }

  :scope:focus-within .my-key-logger {
    border-color: #5a44d4;
  }

  .my-key-logger {
    font-family: system-ui, sans-serif;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    display: block;
  }

  .hint {
    color: #718096;
    margin: 0 0 0.75rem;
    display: block;
  }

  .keys {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-block-size: 2rem;
    align-items: center;
  }

  kbd {
    font-family: ui-monospace, monospace;
    padding: 0.25rem 0.5rem;
    background: #edf2f7;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    display: inline-flex;
  }

  .empty {
    color: #a0aec0;
  }

  button.clear {
    margin-block-start: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: #eaecf0;
    color: #172b4d;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
  }

  button.clear:hover {
    filter: brightness(0.95);
  }

  button.clear:active {
    opacity: 0.7;
  }
}`,html:"<my-key-logger></my-key-logger>"},ui={id:"will-update",title:"willUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyFilter extends Elena(HTMLElement) {
  static tagName = "my-filter";
  static props = [
    { name: "items", reflect: false },
    { name: "search", reflect: false }
  ];
  static element = "input";

  /** @type {Array} */
  items = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Tomato"];

  /** @attribute @type {String} */
  search = "";

  willUpdate() {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  updated() {
    this.element.value = this.search;
    this.element.focus();
    this.element.selectionStart = this.element.selectionEnd = this.search.length;
  }

  render() {
    return html\`
      <div class="my-filter">
        <input type="text" placeholder="Filter fruits" oninput="this.closest('my-filter').search = this.value" />
        <ul>
          \${this.filtered.length > 0
            ? this.filtered.map(item => html\`<li>\${item}</li>\`)
            : html\`<li class="empty">No results</li>\`}
        </ul>
        <small>\${this.filtered.length} of \${this.items.length} shown</small>
      </div>
    \`;
  }
}

MyFilter.define();`,css:`@scope (my-filter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .my-filter {
    font-family: system-ui, sans-serif;
    max-inline-size: 250px;
  }

  ul {
    display: block;
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    background: #f7fafc;
    border: 1px solid #e9ecee;
    border-block-start: 0;
    border-end-start-radius: 4px;
    border-end-end-radius: 4px;
  }

  li {
    display: block;
    padding: 0.5rem 1rem;
  }

  li.empty {
    color: #718096;
  }

  small {
    margin-block-start: 1rem;
    display: block;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-filter input {
  all: unset;
  inline-size: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #a5a9af;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

my-filter input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:"<my-filter></my-filter>"},mi={id:"first-updated",title:"firstUpdated",js:`import { Elena, html } from "@elenajs/core";

export default class MyCard extends Elena(HTMLElement) {
  static tagName = "my-card";
  static element = ".card";

  firstUpdated() {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      this.querySelector(".size").textContent =
        \`\${Math.round(width)} × \${Math.round(height)}px\`;
    });
    observer.observe(this.element);
  }

  render() {
    return html\`
      <div class="card">
        <h2>Hello, Elena</h2>
        <p>firstUpdated() runs once after the first render. Use it to set up observers, third-party libraries, or anything that needs a real DOM element.</p>
        <small class="size">Measuring...</small>
      </div>
    \`;
  }
}

MyCard.define();`,css:`@scope (my-card) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .card {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a202c;
    display: block;
  }

  p {
    color: #4a5568;
    line-height: 1.5;
    display: block;
  }

  .size {
    color: #00963e;
  }
}`,html:"<my-card></my-card>"},pi={id:"request-update",title:"requestUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyTags extends Elena(HTMLElement) {
  static element = "input"
  static tagName = "my-tags";
  static props = [{ name: "tags", reflect: false }];

  /** @type {Array} */
  tags = ["Elena", "Web Components"];

  async addTag(value) {
    if (value.trim()) {
      this.tags.push(value.trim());
      this.requestUpdate();
      await this.updateComplete;
      this.querySelector("input").focus();
    }
  }

  removeTag(index) {
    this.tags.splice(index, 1);
    this.requestUpdate();
  }

  updated() {
    this.element.focus();
  }

  render() {
    return html\`
      <div class="my-tags">
        <input 
          type="text"
          placeholder="Add tag + Enter"
          onkeydown="if(event.key==='Enter'){this.closest('my-tags').addTag(this.value);this.value='';}"
        />
        <div class="list">
          \${this.tags.map(
            (tag, i) => html\`
              <span class="tag">
                \${tag}
                <button
                  class="remove"
                  onclick="this.closest('my-tags').removeTag(\${i})">
                    ×
                </button>
              </span>
            \`
          )}
        </div>
      </div>
    \`;
  }
}

MyTags.define();`,css:`@scope (my-tags) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .list {
    font-family: ui-monospace, monospace;
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-block-start: 0.5rem;
    min-block-size: 1.75rem;
  }

  .tag {
    padding: 0.35rem 0.45rem 0.35rem 0.75rem;
    background: #ede9ff;
    color: #5a44d4;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  .remove {
    cursor: pointer;
    border-radius: 6px;
    padding: 0.1rem 0.3rem;
    opacity: 0.6;
  }

  .remove:hover {
    opacity: 1;
  }

  .remove:active {
    transform: translateY(1px);
  }

  .remove:focus {
    outline: 2px solid #5a44d4;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-tags input {
  all: unset;
  inline-size: 100%;
  padding: 0.5rem;
  border: 1px solid #a5a9af;
  font-family: system-ui, sans-serif;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

my-tags input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:"<my-tags></my-tags>"},fi={id:"css-custom-properties",title:"CSS Custom Properties",js:`import { Elena, html } from "@elenajs/core";

/**
 * @cssprop [--my-button-bg] - Background color.
 * @cssprop [--my-button-text] - Text color.
 * @cssprop [--my-button-radius] - Border radius.
 * @cssprop [--my-button-font] - Font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static events = ["click"];

  render() {
    return html\`
      <button class="my-button">\${this.text}</button>
    \`;
  }
}

MyButton.define();`,css:`@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    /* Public theming API (with default values set) */
    --_my-button-font: var(--my-button-font, system-ui, sans-serif);
    --_my-button-radius: var(--my-button-radius, 6px);
    --_my-button-text: var(--my-button-text, #172b4d);
    --_my-button-bg: var(--my-button-bg, #eaecf0);

    border-radius: var(--_my-button-radius);
    display: inline-block;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {

    /* Internal theming API references (usage) */
    border-radius: var(--_my-button-radius);
    background: var(--_my-button-bg);
    color: var(--_my-button-text);
    font-family: var(--_my-button-font);

    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    display: inline-flex;
  }

  :scope:hover {
    filter: brightness(0.9);
  }

  :scope:active {
    transform: translateY(1px);
    opacity: 0.9;
  }

  :scope:focus-within {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }
}`,html:`<!-- Default styling -->
<my-button>Default</my-button>

<!-- Override CSS custom properties from the consumer side -->
<my-button style="--my-button-bg: #5a44d4; --my-button-text: white">Purple</my-button>

<my-button style="--my-button-bg: #d44444; --my-button-text: white; --my-button-radius: 9999px">
  Rounded Red
</my-button>

<!-- Or override via a CSS class -->
<style>
  .brand-theme {
    --my-button-bg: #f95b1f;
    --my-button-text: white;
    --my-button-font: Georgia, serif;
    --my-button-radius: 0;
  }
</style>
<my-button class="brand-theme">Brand Theme</my-button>`},hi={id:"baseline-support",title:"Baseline Support",js:`/** 
 * This “Baseline Support” web component is based on 
 * the official <baseline-status> custom element
 * (https://github.com/web-platform-dx/baseline-status),
 * but rebuilt using @elenajs/core instead.
 */
import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

const API_URL = "https://api.webstatus.dev/v1/features/";

const BASELINE_DEFS = {
  widely: {
    title: "Widely available",
    description:
      "This feature is well established and works across many devices and browser versions.",
  },
  newly: {
    title: "Newly available",
    description:
      "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
  },
  limited: {
    title: "Limited availability",
    description:
      "This feature is not available across all browsers. Please refer to the table below for details.",
  },
  no_data: {
    title: "Unknown availability",
    description: "This feature doesn’t have status data in Baseline yet.",
  },
};

const BASELINE_ICONS = {
  widely: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-widely-front)" d="m18 8 2 2-2 2-2-2z"/><path fill="var(--baseline-icon-widely-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/><path fill="var(--baseline-icon-widely-back)" d="m28 2-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/></svg>\`,
  newly: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-newly-back)" d="m10 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm16 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4-4 2 2-2 2-2-2zM6 4l2 2-2 2-2-2z"/><path fill="var(--baseline-icon-newly-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
  limited: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-limited-front)" d="m10 0 6 6-2 2-6-6zm12 12-2 2 6 6 2-2zm4-12 2 2-18 18-2-2z"/><path fill="var(--baseline-icon-limited-back)" d="m8 2 2 2-6 6 6 6-2 2-8-8zm20 0 8 8-8 8-2-2 6-6-6-6z"/></svg>\`,
  no_data: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-no_data)" d="m18 8 2 2-2 2-2-2zm10-6-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/><path fill="var(--baseline-icon-no_data)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
};

const BROWSER_ICONS = {
  chrome: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 260 260"><circle cx="128" cy="128" r="64" fill="#fff"/><path fill="#34a853" d="M96 183.4A63.7 63.7 0 0 1 72.6 160L17.2 64A128 128 0 0 0 128 256l55.4-96A64 64 0 0 1 96 183.4Z"/><path fill="#fbbc04" d="M192 128a63.7 63.7 0 0 1-8.6 32L128 256A128 128 0 0 0 238.9 64h-111a64 64 0 0 1 64 64Z"/><circle cx="128" cy="128" r="52" fill="#1a73e8"/><path fill="#ea4335" d="M96 72.6a63.7 63.7 0 0 1 32-8.6h110.8a128 128 0 0 0-221.7 0l55.5 96A64 64 0 0 1 96 72.6Z"/></svg>\`,
  edge: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="a"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#0c59a4" d="M18.416 15.18a7.485 7.485 0 0 1-.845.375 8.121 8.121 0 0 1-2.86.51c-3.77 0-7.053-2.59-7.053-5.92a2.51 2.51 0 0 1 1.307-2.176c-3.41.143-4.287 3.697-4.287 5.777 0 5.897 5.427 6.487 6.598 6.487.63 0 1.578-.184 2.152-.367l.103-.032a10.224 10.224 0 0 0 5.307-4.207.319.319 0 0 0-.422-.447Z"/><path fill="#0078d4" d="M8.423 19.229a6.31 6.31 0 0 1-1.809-1.698A6.43 6.43 0 0 1 8.965 7.97c.255-.12.677-.327 1.243-.319a2.582 2.582 0 0 1 2.048 1.036c.32.431.497.953.502 1.49 0-.016 1.953-6.343-6.375-6.343-3.498 0-6.375 3.315-6.375 6.232-.014 1.54.316 3.065.964 4.462a10.2 10.2 0 0 0 12.464 5.34 6.015 6.015 0 0 1-5.005-.638h-.008Z"/><path fill="#2fc2df" d="M12.145 11.857c-.072.08-.271.2-.271.447 0 .207.135.414.382.582 1.14.796 3.3.685 3.307.685a4.75 4.75 0 0 0 2.415-.662A4.893 4.893 0 0 0 20.4 8.694c.024-1.785-.637-2.972-.9-3.498C17.802 1.896 14.16 0 10.2 0A10.2 10.2 0 0 0 0 10.057c.04-2.909 2.933-5.26 6.375-5.26.28 0 1.873.024 3.347.797a5.786 5.786 0 0 1 2.463 2.335c.486.845.573 1.92.573 2.35 0 .431-.215 1.06-.621 1.587l.008-.008Z"/></g></svg>\`,
  firefox: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="M"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath><path id="N" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3q1 3.4-.4 6.7c-1.1 2.5-4 5-8.4 4.8a10 10 0 0 1-9.8-8C-.1 10 0 9.7 0 9v1.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/><path id="O" d="M10.2 8.6c0 .3-.9 1.1-1.2 1.1-2.9 0-3.4 1.7-3.4 1.7A4 4 0 0 0 8 14.7h.2l.3.2 1.3.2c5.1.2 6.1-5.9 2.4-7.7q1.4 0 2.5.6-.7-1.2-1.9-1.8a5 5 0 0 0-2.6-.7H10q-1.5 0-2.8 1l.7.7c.6.7 2.4 1.3 2.4 1.4"/></defs><g clip-path="url(#M)"><path fill="#ff8c00" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3c-1.2-2.7-3.2-3.8-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5q-1.6 0-2.8 1l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3L.2 9 0 10.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5m-1.1.6"/><use fill="#ff563b" href="#N"/><use fill="#960e18" opacity=".25" href="#N"/><path fill="#ffd000" d="M14.7 8q-.3-.6-.9-1.1a5 5 0 0 1-.4-6.9 7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8"/><use fill="#7059ff" href="#O"/><use fill="#7716a8" opacity=".4" href="#O"/><path fill="#ffb039" d="m6.6 6.2.2.2q-.4-1.2 0-2.5-1.5.7-2.5 1.9s1.5 0 2.3.4"/><path fill="#ff5634" d="M0 10.8c.9 4.5 5.1 8 9.9 8a8.5 8.5 0 0 0 8.7-11.4c.4 2.3-.8 4.5-2.7 6A8 8 0 0 1 8 14.7l-.1-.1c-2.1-1-3-2.9-2.8-4.5q-.7 0-1.5-.4c-.8-.4-.7-.6-1-1A4 4 0 0 1 4.5 8a4 4 0 0 1 1.9.4 5 5 0 0 0 3.8.1S8.5 8 7.8 7.2L7 6.6l-.3-.2-.2-.2c-.8-.4-2.2-.4-2.3-.4-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3S-.1 10 0 10.7"/><path fill="#ff3647" d="M13.8 6.9q.6.4 1 1.2h.1c2.3 2.1 1.1 5 1 5.3q3.2-2.4 2.7-6c-1.1-2.8-3-4-4.7-6.4l-.2-.4-.1-.2-.2-.4c-.4.2-2.8 3.8.4 6.9"/><path fill="#ff5634" d="m15 8.2-.2-.1h-.1q-1.1-.9-2.5-.7a4 4 0 0 1-2.4 7.7L8.5 15l-.3-.2H8c.7.4 4.3 1.6 8-1.3 0-.2 1.2-3.2-1-5.2"/><path fill="#ffb039" d="M5.6 11.4S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1a5 5 0 0 1-3.8-.2A4 4 0 0 0 4.5 8a4 4 0 0 0-1.9.5q.4.7 1 1.1.8.5 1.5.4c-.2 1.6.7 3.5 2.8 4.5H8a4 4 0 0 1-2.4-3.2"/><path fill="#fff44f" opacity=".3" d="M19.7 6.8c-.5-1-1.4-2.1-2-2.5a10 10 0 0 1 1 3c-1.2-2.7-3.2-3.9-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8q-1.1-.7-2.5-.6a4 4 0 0 1-2.4 7.7l-1.3-.2-.3-.2H8l-.1-.1H8a4 4 0 0 1-2.4-3.2S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1s-1.8-.8-2.4-1.5L7 6.5l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2A8 8 0 0 0 .4 8.3L.3 9l-.2 1.4q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/></g></svg>\`,
  safari: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><defs><clipPath id="clip0_1510_9490"><rect width="20.4" height="20.4" fill="white" transform="translate(0.000488281)"/></clipPath></defs><g clip-path="url(#clip0_1510_9490)"><path d="M19.8586 9.72878C19.8586 11.0041 19.6088 12.2669 19.1234 13.4451C18.6381 14.6233 17.9267 15.6939 17.0298 16.5956C16.133 17.4974 15.0683 18.2127 13.8965 18.7008C12.7248 19.1888 11.4689 19.44 10.2005 19.44C7.63906 19.44 5.1825 18.4168 3.37126 16.5956C1.56002 14.7744 0.54248 12.3043 0.54248 9.72878C0.54248 7.15321 1.56002 4.68313 3.37126 2.86192C5.1825 1.04072 7.63906 0.0175788 10.2005 0.0175781C11.4689 0.017578 12.7248 0.268767 13.8965 0.7568C15.0683 1.24483 16.133 1.96016 17.0298 2.86192C17.9267 3.76369 18.6381 4.83424 19.1234 6.01246C19.6088 7.19068 19.8586 8.45349 19.8586 9.72878Z" fill="#e0e0e0" stroke="#CDCDCD" stroke-width="0.351543" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.1018 9.72868C19.1018 12.1024 18.164 14.379 16.4947 16.0575C14.8254 17.7359 12.5613 18.6789 10.2006 18.6789C7.83982 18.6789 5.57575 17.7359 3.90644 16.0575C2.23713 14.379 1.29932 12.1024 1.29932 9.72868C1.29932 7.35493 2.23713 5.0784 3.90644 3.39991C5.57575 1.72141 7.83982 0.778442 10.2006 0.778442C12.5613 0.778442 14.8254 1.72141 16.4947 3.39991C18.164 5.0784 19.1018 7.35493 19.1018 9.72868Z" fill="#12aef1"/><path d="M11.218 10.8003L9.18286 8.65724L16.4024 3.77393L11.218 10.8003Z" fill="#FF5150"/><path d="M11.2181 10.8003L9.18291 8.65723L3.99854 15.6836L11.2181 10.8003Z" fill="#F1F1F1"/><path opacity="0.243" d="M3.99854 15.6836L11.2181 10.8003L16.4025 3.77393L3.99854 15.6836Z" fill="black"/></g></svg>\`,
};

const SUPPORT_ICONS = {
  available: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c4.9 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10-10A10 10 0 0 0 .6 2.3z"/><path fill="currentColor" d="m11.3 8.1-5 5-3-3 1-1 2 2 4-4z"/></svg>\`,
  no: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c5 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10.1-10A10 10 0 0 0 .5 2.3z"/><path fill="currentColor" d="m10.3 8.1-2 2 2 2-1 1-2-2-2 2-1-1 2-2-2-2 1-1 2 2 2-2z"/></svg>\`,
  unknown: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none" viewBox="0 0 17 21"><path fill="currentColor" d="M7.2 12.3H6l.1-1q0-.4.3-.7l.7-.8 1-1.1.1-.8q0-.4-.2-.7 0-.3-.4-.5l-.8-.2-.7.1-.5.5q-.2.2-.2.7H4.2q0-.8.3-1.3.4-.5 1-.7.6-.3 1.3-.3t1.4.3.9.8.3 1.3q0 .6-.2 1l-.6 1-.8.8q-.4.3-.5.7zm-1.3 2 .2-.5.5-.2q.4 0 .6.2l.1.5-.1.5-.6.2-.5-.2z"/><path fill="currentColor" d="M1.3 3.3a8.8 8.8 0 0 1 14.3 6.9 8.8 8.8 0 0 1-14.3 6.9l-.8 1a10 10 0 0 0 16.3-7.9A10 10 0 0 0 .5 2.3z"/></svg>\`,
};

const CHEVRON_ICON = \`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="none" viewBox="0 0 11 7"><path fill="currentColor" d="M5.5 6.5.3 1.2l.9-1 4.3 4.4L9.8.3l1 1z"/></svg>\`;

/**
 * Displays the Baseline browser support status for a web platform feature.
 * Fetches data from the web-features API and renders an expandable widget
 * with browser support icons, status badges, and descriptions.
 *
 * @displayName Baseline Status
 * @status alpha
 *
 * @cssprop [--baseline-font] - Overrides the default font family.
 * @cssprop [--baseline-color-widely] - Overrides the "widely available" accent color.
 * @cssprop [--baseline-color-newly] - Overrides the "newly available" accent color.
 * @cssprop [--baseline-color-limited] - Overrides the "limited availability" accent color.
 * @cssprop [--baseline-color-no-data] - Overrides the "unknown" accent color.
 */
export default class BaselineSupport extends Elena(HTMLElement) {
  static tagName = "baseline-support";
  static props = ["featureid"];
  static element = "details";
  static shadow = "open";
  static styles = \`
    :host {
      --baseline-color-limited: light-dark(#ea8600, #f09418);
      --baseline-color-newly: light-dark(#1a73e8, #4185ff);
      --baseline-color-widely: light-dark(#1e8e3e, #24a446);
      --baseline-color-no_data: light-dark(#707070, #868686);
      --baseline-color-outline: light-dark(#d9d9d9, #d9d9d9);
      --baseline-color-link: light-dark(#1a73e8, #5aa1ff);
      --baseline-icon-limited-front: light-dark(#f09409, #f09409);
      --baseline-icon-limited-back: light-dark(#c6c6c6, #565656);
      --baseline-icon-widely-front: light-dark(#1ea446, #1ea446);
      --baseline-icon-widely-back: light-dark(#c4eed0, #125225);
      --baseline-icon-newly-front: light-dark(#1b6ef3, #4185ff);
      --baseline-icon-newly-back: light-dark(#a8c7fa, #2d509e);
      --baseline-icon-no_data: light-dark(#909090, #666666);

      all: unset;
      box-sizing: border-box;
      color: inherit;
      display: block;
      border: solid 1px var(--baseline-color-outline);
      border-radius: 8px;
      inline-size: 100%;
      padding: 16px 24px 0 24px;
      max-inline-size: 800px;
      margin-block-end: 1rem;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-style: normal;
    }

    .name {
      font-weight: normal;
      font-size: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    a,
    a:active,
    a:visited {
      color: var(--baseline-color-link);
    }

    ::slotted(*) {
      color: grey;
      font-style: italic;
      font-size: 80%;
    }

    .baseline-title {
      gap: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
    }

    .baseline-title {
      flex: 1;
    }

    .baseline-title div:first-child {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .baseline-badge {
      background: #3367d6;
      color: #fff;
      font-size: 11px;
      padding: 0 4px;
      border-radius: 2px;
      text-transform: uppercase;
      line-height: 20px;
      margin-inline: 0.5rem;
      white-space: nowrap;
    }

    .baseline-browsers {
      font-size: 0;
      max-inline-size: 200px;
      display: flex;
      gap: 16px;
    }

    .baseline-browsers span {
      white-space: nowrap;
    }

    .support-no_data {
      color: var(--baseline-color-no_data);
    }

    .support-unavailable {
      color: var(--baseline-color-limited);
    }

    .support-newly {
      color: var(--baseline-color-newly);
    }

    .support-widely,
    .support-available {
      color: var(--baseline-color-widely);
    }

    details > summary .open-icon {
      inline-size: 10px;
      block-size: 20px;
      margin-inline-start: auto;
      color: inherit;
    }

    @media (min-width: 420px) {
      details > summary .open-icon {
        margin-inline-start: 48px;
      }
    }

    details > summary .open-icon svg {
      transition: transform 0.3s;
    }

    details[open] summary .open-icon svg {
      transform: rotate(180deg);
    }

    summary {
      display: flex;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      padding: 16px 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .signals-badge,
    .signals-badge:visited,
    .signals-badge:active {
      text-decoration: none;
      background: transparent;
      color: inherit;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 12px;
      border: 1px solid var(--baseline-color-outline);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      line-height: 1.4;
    }

    .signals-badge:hover {
      background: light-dark(#f5f5f5, #333);
    }
  \`;

  /**
   * The web-features feature ID (e.g. "grid", "dialog").
   *
   * @attribute
   * @type {string}
   */
  featureid = "";

  /** @internal */
  _data = null;
  /** @internal */
  _loading = true;
  /** @internal */
  _error = false;
  /** @internal */
  _status = "no_data";
  /** @internal */
  _name = "";
  /** @internal */
  _date = "";
  /** @internal */
  _abortController = null;

  /**
   * @internal
   */
  attributeChangedCallback(prop, oldValue, newValue) {
    super.attributeChangedCallback(prop, oldValue, newValue);

    if (prop === "featureid" && this._hydrated && oldValue !== newValue && newValue) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  firstUpdated() {
    if (this.featureid) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  /**
   * @internal
   */
  willUpdate() {
    if (this._data) {
      this._status = this._data.baseline?.status || "no_data";
      this._name = this._data.name || this.featureid;

      if (this._data.baseline?.low_date) {
        this._date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(new Date(this._data.baseline.low_date));
      } else {
        this._date = "";
      }
    } else {
      this._status = "no_data";
      this._name = this.featureid || "Unknown feature";
      this._date = "";
    }

    this.setAttribute("status", this._status);
  }

  /**
   * @internal
   */
  async _fetchData() {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    this._loading = true;
    this._error = false;
    this._data = null;
    this.requestUpdate();

    try {
      const res = await fetch(API_URL + this.featureid, {
        signal: this._abortController.signal,
        cache: "force-cache",
      });

      if (!res.ok) {
        throw new Error(\`HTTP \${res.status}\`);
      }

      this._data = await res.json();
    } catch (e) {
      if (e.name !== "AbortError") {
        this._error = true;
      }
    }

    this._loading = false;
    this._abortController = null;
    this.requestUpdate();
  }

  /**
   * @internal
   */
  _checkAvailability(implementations) {
    return implementations.every(impl => impl?.status === "available");
  }

  /**
   * @internal
   */
  _getDescription() {
    const status = this._status;
    const date = this._date;

    if (status === "newly" && date) {
      return \`Since \${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.\`;
    }

    if (status === "widely" && date) {
      return \`This feature is well established and works across many devices and browser versions. It’s been available across browsers since \${date}.\`;
    }

    return BASELINE_DEFS[status].description;
  }

  /**
   * @internal
   */
  renderBaselineIcon(status) {
    return unsafeHTML(\`<span class="baseline-icon">\${BASELINE_ICONS[status]}</span>\`);
  }

  /**
   * @internal
   */
  renderSupportIcon(status, implementations) {
    const allAvailable = this._checkAvailability(implementations);
    const support = status === "limited" ? (allAvailable ? "available" : "unavailable") : status;
    const iconKey =
      support === "newly" || support === "widely"
        ? "available"
        : support === "unavailable"
          ? "no"
          : support === "no_data"
            ? "unknown"
            : support;

    return unsafeHTML(
      \`<span class="support-icon support-\${support}">\${SUPPORT_ICONS[iconKey] || SUPPORT_ICONS.unknown}</span>\`
    );
  }

  /**
   * @internal
   */
  renderBrowsers() {
    const status = this._status;
    const impl = this._data?.browser_implementations || {};

    return html\`
      <div class="baseline-browsers">
        <span>\${unsafeHTML(BROWSER_ICONS.chrome)} \${this.renderSupportIcon(status, [impl.chrome, impl.chrome_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.edge)} \${this.renderSupportIcon(status, [impl.edge])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.firefox)} \${this.renderSupportIcon(status, [impl.firefox, impl.firefox_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.safari)} \${this.renderSupportIcon(status, [impl.safari, impl.safari_ios])}</span>
      </div>
    \`;
  }

  /**
   * @internal
   */
  render() {
    const status = this._status;
    const def = BASELINE_DEFS[status];
    const title = this._loading ? "Loading..." : def.title;
    const preTitle =
      status === "limited" || status === "no_data" ? nothing : html\`<strong>Baseline</strong>\`;
    const year = status === "newly" && this._date ? this._date.split(" ")[1] : "";
    const badge =
      status === "newly" ? html\`<span class="baseline-badge">newly available</span>\` : nothing;

    const upvote = this._data?.developer_signals;
    const upvoteButton = upvote?.link
      ? html\`<a class="signals-badge" href="\${upvote.link}" target="_top">👍 \${upvote.upvotes || 0}</a>\`
      : nothing;

    const learnMore =
      status !== "no_data" && this._data?.feature_id
        ? html\`<p><a href="https://github.com/web-platform-dx/web-features/blob/main/features/\${this._data.feature_id}.yml" target="_top" class="baseline-link">Learn more</a></p>\`
        : nothing;

    return html\`
      <div class="name">\${this._name} \${upvoteButton}</div>
      <details>
        <summary>
          \${this.renderBaselineIcon(status)}
          <div class="baseline-title">
            <div class="baseline-title-row">\${preTitle} \${title} \${year}</div>
            \${this.renderBrowsers()}
          </div>
          <span class="open-icon">\${unsafeHTML(CHEVRON_ICON)}</span>
        </summary>
        <p class="baseline-description">\${this._getDescription()}</p>
        \${learnMore}
      </details>
    \`;
  }
}

BaselineSupport.define();`,html:`<baseline-support featureid="autonomous-custom-elements"></baseline-support>
<baseline-support featureid="cascade-layers"></baseline-support>
<baseline-support featureid="scope"></baseline-support>
<baseline-support featureid="declarative-shadow-dom"></baseline-support>
<baseline-support featureid="anchor-positioning"></baseline-support>`},vi={id:"mixins",title:"Mixins",js:`import { Elena, html } from "@elenajs/core";

const Draggable = superclass => class extends superclass {
  #offsetX = 0;
  #offsetY = 0;

  connectedCallback() {
    super.connectedCallback();
    this.style.position = "absolute";
    this.style.cursor = "grab";

    const pos = e => e.touches?.[0] ?? e;

    const onStart = e => {
      const { clientX, clientY } = pos(e);
      const rect = this.getBoundingClientRect();

      this.#offsetX = clientX - rect.left;
      this.#offsetY = clientY - rect.top;

      this.style.cursor = "grabbing";

      const onMove = e => {
        const { clientX, clientY } = pos(e);
        this.style.left = clientX - this.#offsetX + "px";
        this.style.top = clientY - this.#offsetY + "px";
      };

      const onUp = () => {
        this.style.cursor = "grab";

        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("touchend", onUp);
    };

    this.addEventListener("mousedown", onStart);
    this.addEventListener("touchstart", onStart, { passive: true });
  }
};

export default class MyDraggable extends Draggable(Elena(HTMLElement)) {
  static tagName = "my-draggable";

  render() {
    return html\`
      <div class="my-draggable">
        Drag me!
      </div>
    \`;
  }
}

MyDraggable.define();`,css:`@scope (my-draggable) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    user-select: none;
  }

  .my-draggable {
    -webkit-user-select: none;
    user-select: none;
    touch-action: none;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    background: #5a44d4;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
}`,html:`<div style="position: relative; height: calc(100vh - 2.5rem); border: 2px dashed #e2e8f0; border-radius: 8px;">
  <my-draggable style="left: 40px; top: 40px;"></my-draggable>
</div>`},bi={id:"shadow-dom",title:"Shadow DOM",js:`import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  // Shadow DOM styles are fully isolated
  static shadow = "open";
  static styles = \`
    :host {
      display: inline-block;
    }
    .badge {
      font-family: system-ui, sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: var(--badge-bg, #eaecf0);
      color: var(--badge-text, #172b4d);
    }
    :host([variant="success"]) {
      --badge-bg: #5B7F24;
      --badge-text: #fff;
    }
    :host([variant="error"]) {
      --badge-bg: #d44444;
      --badge-text: #fff;
    }
  \`;

  /** @attribute @type {"default" | "success" | "error"} */
  variant = "default";

  render() {
    return html\`
      <span class="badge">
        \${this.text}
      </span>
    \`;
  }
}
MyBadge.define();`,css:`/* Most external styles cannot reach into Shadow DOM.
   CSS custom properties still pierce the boundary for theming. */

/* This will NOT affect the badge (Shadow DOM blocks it) */
* {
  color: red !important;
}`,html:`<span>This span IS affected by the global style (color: red !important;)</span>

<br/><br/>

<my-badge>Default</my-badge>
<my-badge variant="success">Success</my-badge>
<my-badge variant="error">Error</my-badge>

<br/>

<p>
  The badges above are protected by Shadow DOM. The global style has no effect on them.
</p>`},G=[{category:"Basics",items:[Xo,Zo,Qo,Yo]},{category:"Props",items:[ei,ti,ni,si]},{category:"Templates",items:[ai,oi,ii,ri]},{category:"Events",items:[li,ci,di]},{category:"Lifecycle",items:[ui,mi,pi]},{category:"Styling",items:[fi]},{category:"Advanced",items:[vi,bi,hi]}],gi=`function t(t,e,s){if(e="boolean"===t&&"boolean"!=typeof e?null!==e:e,!s)return e;if("toAttribute"===s)switch(t){case"object":case"array":return null===e?null:JSON.stringify(e);case"boolean":return e?"":null;case"number":return null===e?null:e;default:return""===e?null:e}else switch(t){case"object":case"array":if(!e)return e;try{return JSON.parse(e)}catch{return console.warn("░█ [ELENA]: Invalid JSON: "+e),null}case"boolean":return e;case"number":return null!==e?+e:e;default:return e??""}}function e(t,e,s){t?null===s?t.removeAttribute(e):t.setAttribute(e,s):console.warn("░█ [ELENA]: Cannot sync attrs.")}const s={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function n(t){return Array.isArray(t)?t.map(t=>i(t)).join(""):i(t)}function i(t){return t?.t?String(t):(e=String(t??""),String(e).replace(/[&<>"']/g,t=>s[t]));var e}function r(t,...e){let s;return{t:!0,strings:t,values:e,toString:()=>(void 0===s&&(s=t.reduce((t,s,i)=>t+s+n(e[i]),"")),s)}}function o(t){return{t:!0,toString:()=>t??""}}const h=Object.freeze({t:!0,toString:()=>""}),c=t=>Array.isArray(t)?t.some(t=>t?.t):t?.t,u=t=>Array.isArray(t)?t.map(t=>String(t??"")).join(""):String(t??"");function l(t){return t.replace(/>\\n\\s*/g,">").replace(/\\n\\s*</g,"<").replace(/\\n\\s*/g," ")}const a=new WeakMap,f="e"+Math.random().toString(36).slice(2,6);function d(t,e,s){return!function(t,e,s){if(t.i!==e||!t.o)return!1;for(let e=0;e<s.length;e++){const n=s[e],i=Array.isArray(n)?u(n):n;if(i!==t.h[e]){if(c(n)||!t.o[e])return!1;t.h[e]=i,t.o[e].textContent=u(n)}}return!0}(t,e,s)&&(function(t,e,s){let i=a.get(e);if(!i){const t=Array.from(e,l);i={processedStrings:t,template:s.length>0?p(t,s.length):null},a.set(e,i)}if(i.template)t.o=function(t,e,s){const i=e.content.cloneNode(!0),r=document.createTreeWalker(i,NodeFilter.SHOW_COMMENT),o=new Array(s.length),h=[];let l;for(;l=r.nextNode();)l.data===f&&h.push(l);for(let t=0;t<h.length;t++){const e=s[t];if(c(e)){const s=document.createElement("template");s.innerHTML=n(e),h[t].parentNode.replaceChild(s.content,h[t])}else{const s=document.createTextNode(u(e));h[t].parentNode.replaceChild(s,h[t]),o[t]=s}}return t.replaceChildren(i),o}(t,i.template,s);else{const e=s.map(t=>n(t)),r=i.processedStrings.reduce((t,s,n)=>t+s+(e[n]??""),"").replace(/>\\s+</g,"><").trim(),o=document.createElement("template");o.innerHTML=r,y(t,o.content.childNodes),t.o=new Array(s.length)}t.i=e,t.h=s.map(t=>Array.isArray(t)?u(t):t)}(t,e,s),!0)}function p(t,e){const s=\`\\x3c!--\${f}--\\x3e\`,n=t.reduce((t,n,i)=>t+n.replace(/>\\s+</g,"><")+(i<e?s:""),"").trim(),i=document.createElement("template");i.innerHTML=n;const r=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT);let o=0;for(;r.nextNode();)r.currentNode.data===f&&o++;return o===e?i:null}function y(t,e){const s=Array.from(t.childNodes),n=Array.from(e),i=Math.max(s.length,n.length);for(let e=0;e<i;e++){const i=s[e],r=n[e];i?r?i.nodeType!==r.nodeType||i.nodeType===Node.ELEMENT_NODE&&i.tagName!==r.tagName?t.replaceChild(r,i):i.nodeType===Node.TEXT_NODE?i.textContent!==r.textContent&&(i.textContent=r.textContent):i.nodeType===Node.ELEMENT_NODE&&(g(i,r),y(i,r.childNodes)):t.removeChild(i):t.appendChild(r)}}function g(t,e){for(let s=t.attributes.length-1;s>=0;s--){const{name:n}=t.attributes[s];e.hasAttribute(n)||t.removeAttribute(n)}for(let s=0;s<e.attributes.length;s++){const{name:n,value:i}=e.attributes[s];t.getAttribute(n)!==i&&t.setAttribute(n,i)}}class m extends Event{constructor(t,e){super(t,{bubbles:!0,composed:!0,...e})}}const b=new WeakSet;function w(s){return class extends s{element=null;attributeChangedCallback(e,s,n){super.attributeChangedCallback?.(e,s,n),"text"!==e?(this.u=!0,function(e,s,n,i){if(n!==i){const n=typeof e[s];"undefined"===n&&console.warn(\`░█ [ELENA]: Prop "\${s}" has no default.\`);const r=t(n,i,"toProp");e[s]=r}}(this,e,s,n),this.u=!1,this.l&&s!==n&&!this.p&&this.m()):this.text=n??""}static get observedAttributes(){if(this.A)return this.A;const t=this.S||(this.props||[]).map(t=>"string"==typeof t?t:t.name);return this.A=[...t,"text"],this.A}connectedCallback(){super.connectedCallback?.(),this.N(),this._(),this.v(),this.C(),this.willUpdate(),this.L(),this.k(),this.O(),this.P(),this.l||(this.l=!0,this.setAttribute("hydrated",""),this.firstUpdated()),this.updated()}N(){const s=this.constructor;if(b.has(s))return;const n=new Set,i=[];if(s.props){for(const t of s.props)"string"==typeof t?i.push(t):(i.push(t.name),!1===t.reflect&&n.add(t.name));i.includes("text")&&console.warn('░█ [ELENA]: "text" is reserved.'),function(s,n,i){for(const r of n){const n=!i||!i.has(r);Object.defineProperty(s,r,{configurable:!0,enumerable:!0,get(){return this.j?this.j.get(r):void 0},set(s){if(this.j||(this.j=new Map),s!==this.j.get(r)&&(this.j.set(r,s),this.isConnected))if(n){if(!this.u){const n=t(typeof s,s,"toAttribute");e(this,r,n)}}else this.l&&!this.p&&this.m()}})}}(s.prototype,i,n)}var r;s.S=i,s.M=n,s.U=s.events||null,s.q=(r=s.element)?t=>t.querySelector(r):t=>t.firstElementChild,b.add(s)}_(){this.u=!0;for(const t of this.constructor.S)if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}this.u=!1}v(){this.l||void 0!==this.F||(this.text=this.textContent.trim())}get J(){return this.R??this.shadowRoot??this}C(){const t=this.constructor;if(!t.shadow)return;(this.R??this.shadowRoot)||(this.R=this.attachShadow({mode:t.shadow}));const e=this.R??this.shadowRoot;if(t.styles){if(!t.I){const e=Array.isArray(t.styles)?t.styles:[t.styles];t.I=e.map(t=>{if("string"==typeof t){const e=new CSSStyleSheet;return e.replaceSync(t),e}return t})}e.adoptedStyleSheets=t.I}}L(){const t=this.render();if(t&&t.strings){const e=this.J,s=d(e,t.strings,t.values);this.l&&s&&(this.element=this.constructor.q(e))}}k(){if(!this.element){const t=this.J;this.element=this.constructor.q(t),this.element||(this.constructor.element&&console.warn("░█ [ELENA]: Element not found."),this.element=t.firstElementChild)}}O(){if(this.j){const s=this.constructor.M;for(const[n,i]of this.j){if(s.has(n))continue;const r=t(typeof i,i,"toAttribute");(null!==r||this.hasAttribute(n))&&e(this,n,r)}}}P(){const t=this.constructor.U;if(!this.W&&t?.length)if(this.element){this.W=!0;for(const e of t)this.element.addEventListener(e,this),this[e]=(...t)=>this.element[e](...t)}else console.warn("░█ [ELENA]: Cannot add events.")}render(){}willUpdate(){}firstUpdated(){}updated(){}adoptedCallback(){super.adoptedCallback?.()}disconnectedCallback(){if(super.disconnectedCallback?.(),this.W){this.W=!1;for(const t of this.constructor.U)this.element?.removeEventListener(t,this)}}handleEvent(t){this.constructor.U?.includes(t.type)&&(t.stopPropagation(),this.dispatchEvent(new m(t.type,{cancelable:!0})))}get text(){return this.F??""}set text(t){const e=this.F;this.F=t,this.l&&e!==t&&!this.p&&this.m()}static define(){var t,e;this.tagName?(t=this.tagName,e=this,"undefined"!=typeof window&&"customElements"in window&&(window.customElements.get(t)||window.customElements.define(t,e))):console.warn("░█ [ELENA]: define() without a tagName.")}m(){this.p||this.$||(this.$=!0,this.D=new Promise(t=>{this.T=t}),queueMicrotask(()=>{try{this.B()}catch(t){console.error("░█ [ELENA]:",t)}}))}B(){this.$=!1;const t=this.T;this.T=null;try{try{this.willUpdate(),this.p=!0,this.L()}finally{this.p=!1}this.updated()}finally{this.D=null,t()}}get updateComplete(){return this.D?this.D:Promise.resolve()}requestUpdate(){this.l&&!this.p&&this.m()}}}export{w as Elena,m as ElenaEvent,r as html,h as nothing,o as unsafeHTML};
//# sourceMappingURL=bundle.js.map
`,yi=gi.replace(/\/\/# sourceMappingURL=.*$/m,"").trim(),ki=`data:text/javascript;charset=utf-8,${encodeURIComponent(yi)}`,_i=JSON.stringify({imports:{"@elenajs/core":ki}});function Si(e,t,n){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="importmap">${_i}<\/script>
<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 1rem;
  color: #1a1a1a;
}
${t}
</style>
</head>
<body>
${n}
<script>
window.addEventListener("error", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    e.message + "\\n" + (e.filename ? "at " + e.filename + ":" + e.lineno : "") +
    "</pre>";
});
window.addEventListener("unhandledrejection", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    (e.reason?.message || String(e.reason)) +
    "</pre>";
});
<\/script>
<script type="module">
${e}
<\/script>
</body>
</html>`}function Pe(e,t){for(const n of e){const s=n.items.find(a=>a.id===t);if(s)return s}return null}function Me(){return typeof window>"u"?null:window.location.hash.slice(1)||null}function Ee(e){typeof window>"u"||history.replaceState(null,"","#"+e)}function Pi(e,t){let n;return function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)}}const xi={class:"pg-layout"},wi={class:"pg-main"},$i={__name:"PlaygroundWrapper",setup(e){const t=ve(null),n=S(!1),s=S(!1),a=S("");function r(p){const u=Pe(G,p);u&&(a.value=u.id,Ee(u.id),s.value=!1)}function l(){const p=Me();p&&p!==a.value&&r(p)}return z(async()=>{var y,w,P;const p=Me(),u=((w=(y=G[0])==null?void 0:y.items[0])==null?void 0:w.id)||"primitive-component",k=Pe(G,p||u)||((P=G[0])==null?void 0:P.items[0]);a.value=(k==null?void 0:k.id)||"",p||Ee(a.value),window.addEventListener("hashchange",l);const L=await ge(()=>import("./Playground.BCR8FKkC.js"),__vite__mapDeps([2,1]));t.value=L.default}),ne(()=>{window.removeEventListener("hashchange",l)}),(p,u)=>(o(),c("div",xi,[b(Jo,{examples:i(G),"current-id":a.value,open:s.value,onSelect:r,onToggle:u[0]||(u[0]=k=>s.value=!s.value)},null,8,["examples","current-id","open"]),m("div",wi,[(o(),g(B(t.value||Se),{"current-id":a.value,onPreviewReady:u[1]||(u[1]=k=>n.value=!0),onToggleSidebar:u[2]||(u[2]=k=>s.value=!s.value)},null,40,["current-id"])),b(ee,{name:"pg-unload"},{default:f(()=>[t.value&&!n.value?(o(),g(Se,{key:0,class:"pg-loading-overlay"})):h("",!0)]),_:1})])]))}},Mi={extends:Bo,setup(){Oo(K())},enhanceApp({app:e}){if(e.component("Playground",$i),typeof window<"u"){let t=!1;document.addEventListener("pointerenter",n=>{if(t)return;n.target.closest('a[href*="/playground"]')&&(t=!0,ge(()=>import("./Playground.BCR8FKkC.js"),__vite__mapDeps([2,1])))},!0)}}};export{Mi as R,ba as c,Pi as d,G as e,Pe as f,Si as g,$ as u};

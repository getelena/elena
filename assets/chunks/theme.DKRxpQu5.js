const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/VPLocalSearchBox.CimADH3Z.js","assets/chunks/framework.B54d1gGw.js","assets/chunks/Playground.bpIGICNi.js"])))=>i.map(i=>d[i]);
import{d as v,c as l,r as d,n as P,o,a as q,t as E,b as g,w as f,T as ae,e as h,_ as y,u as Je,i as Ke,f as Ye,g as ge,h as $,j as u,k as r,l as J,m as me,p as S,q as U,s as oe,v as R,x as ie,y as ye,z as Xe,A as Ze,F as C,B as I,C as K,D as re,E as b,G as ke,H as j,I as Be,J as X,K as G,L as le,M as Qe,N as _e,O as pe,P as $e,Q as He,R as Z,S as et,U as tt,V as fe,W as Oe,X as ze,Y as nt,Z as st,$ as at,a0 as De,a1 as ot,a2 as it,a3 as rt}from"./framework.B54d1gGw.js";const lt=v({__name:"VPBadge",props:{text:{},type:{default:"tip"}},setup(e){return(t,n)=>(o(),l("span",{class:P(["VPBadge",e.type])},[d(t.$slots,"default",{},()=>[q(E(e.text),1)])],2))}}),ct={key:0,class:"VPBackdrop"},dt=v({__name:"VPBackdrop",props:{show:{type:Boolean}},setup(e){return(t,n)=>(o(),g(ae,{name:"fade"},{default:f(()=>[e.show?(o(),l("div",ct)):h("",!0)]),_:1}))}}),ut=y(dt,[["__scopeId","data-v-1adab161"]]),L=Je;function mt(e,t){let n,s=!1;return()=>{n&&clearTimeout(n),s?n=setTimeout(e,t):(e(),(s=!0)&&setTimeout(()=>s=!1,t))}}function he(e){return e.startsWith("/")?e:`/${e}`}function xe(e){const{pathname:t,search:n,hash:s,protocol:a}=new URL(e,"http://a.com");if(Ke(e)||e.startsWith("#")||!a.startsWith("http")||!Ye(t))return e;const{site:i}=L(),c=t.endsWith("/")||t.endsWith(".html")?e:e.replace(/(?:(^\.+)\/)?.*$/,`$1${t.replace(/(\.md)?$/,i.value.cleanUrls?"":".html")}${n}${s}`);return ge(c)}function Q({correspondingLink:e=!1}={}){const{site:t,localeIndex:n,page:s,theme:a,hash:i}=L(),c=$(()=>{var p,k;return{label:(p=t.value.locales[n.value])==null?void 0:p.label,link:((k=t.value.locales[n.value])==null?void 0:k.link)||(n.value==="root"?"/":`/${n.value}/`)}});return{localeLinks:$(()=>Object.entries(t.value.locales).flatMap(([p,k])=>c.value.label===k.label?[]:{text:k.label,link:pt(k.link||(p==="root"?"/":`/${p}/`),a.value.i18nRouting!==!1&&e,s.value.relativePath.slice(c.value.link.length-1),!t.value.cleanUrls)+i.value})),currentLang:c}}function pt(e,t,n,s){return t?e.replace(/\/$/,"")+he(n.replace(/(^|\/)index\.md$/,"$1").replace(/\.md$/,s?".html":"")):e}const ft={class:"NotFound"},ht={class:"code"},vt={class:"title"},bt={class:"quote"},gt={class:"action"},yt=["href","aria-label"],kt=v({__name:"NotFound",setup(e){const{theme:t}=L(),{currentLang:n}=Q();return(s,a)=>{var i,c,m,p,k;return o(),l("div",ft,[u("p",ht,E(((i=r(t).notFound)==null?void 0:i.code)??"404"),1),u("h1",vt,E(((c=r(t).notFound)==null?void 0:c.title)??"PAGE NOT FOUND"),1),a[0]||(a[0]=u("div",{class:"divider"},null,-1)),u("blockquote",bt,E(((m=r(t).notFound)==null?void 0:m.quote)??"But if you don't change your direction, and if you keep looking, you may end up where you are heading."),1),u("div",gt,[u("a",{class:"link",href:r(ge)(r(n).link),"aria-label":((p=r(t).notFound)==null?void 0:p.linkLabel)??"go to home"},E(((k=r(t).notFound)==null?void 0:k.linkText)??"Take me home"),9,yt)])])}}}),_t=y(kt,[["__scopeId","data-v-0fcf2e21"]]);function je(e,t){if(Array.isArray(e))return ne(e);if(e==null)return[];t=he(t);const n=Object.keys(e).sort((a,i)=>i.split("/").length-a.split("/").length).find(a=>t.startsWith(he(a))),s=n?e[n]:[];return Array.isArray(s)?ne(s):ne(s.items,s.base)}function $t(e){const t=[];let n=0;for(const s in e){const a=e[s];if(a.items){n=t.push(a);continue}t[n]||t.push({items:[]}),t[n].items.push(a)}return t}function xt(e){const t=[];function n(s){for(const a of s)a.text&&a.link&&t.push({text:a.text,link:a.link,docFooterText:a.docFooterText}),a.items&&n(a.items)}return n(e),t}function ve(e,t){return Array.isArray(t)?t.some(n=>ve(e,n)):J(e,t.link)?!0:t.items?ve(e,t.items):!1}function ne(e,t){return[...e].map(n=>{const s={...n},a=s.base||t;return a&&s.link&&(s.link=a+s.link),s.items&&(s.items=ne(s.items,a)),s})}function W(){const{frontmatter:e,page:t,theme:n}=L(),s=me("(min-width: 960px)"),a=S(!1),i=$(()=>{const V=n.value.sidebar,B=t.value.relativePath;return V?je(V,B):[]}),c=S(i.value);U(i,(V,B)=>{JSON.stringify(V)!==JSON.stringify(B)&&(c.value=i.value)});const m=$(()=>e.value.sidebar!==!1&&c.value.length>0&&e.value.layout!=="home"),p=$(()=>k?e.value.aside==null?n.value.aside==="left":e.value.aside==="left":!1),k=$(()=>e.value.layout==="home"?!1:e.value.aside!=null?!!e.value.aside:n.value.aside!==!1),w=$(()=>m.value&&s.value),_=$(()=>m.value?$t(c.value):[]);function x(){a.value=!0}function M(){a.value=!1}function T(){a.value?M():x()}return{isOpen:a,sidebar:c,sidebarGroups:_,hasSidebar:m,hasAside:k,leftAside:p,isSidebarEnabled:w,open:x,close:M,toggle:T}}function wt(e,t){let n;oe(()=>{n=e.value?document.activeElement:void 0}),R(()=>{window.addEventListener("keyup",s)}),ie(()=>{window.removeEventListener("keyup",s)});function s(a){a.key==="Escape"&&e.value&&(t(),n==null||n.focus())}}function Lt(e){const{page:t,hash:n}=L(),s=S(!1),a=$(()=>e.value.collapsed!=null),i=$(()=>!!e.value.link),c=S(!1),m=()=>{c.value=J(t.value.relativePath,e.value.link)};U([t,e,n],m),R(m);const p=$(()=>c.value?!0:e.value.items?ve(t.value.relativePath,e.value.items):!1),k=$(()=>!!(e.value.items&&e.value.items.length));oe(()=>{s.value=!!(a.value&&e.value.collapsed)}),ye(()=>{(c.value||p.value)&&(s.value=!1)});function w(){a.value&&(s.value=!s.value)}return{collapsed:s,collapsible:a,isLink:i,isActiveLink:c,hasActiveLink:p,hasChildren:k,toggle:w}}function St(){const{hasSidebar:e}=W(),t=me("(min-width: 960px)"),n=me("(min-width: 1280px)");return{isAsideEnabled:$(()=>!n.value&&!t.value?!1:e.value?n.value:t.value)}}const Pt=/\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/,be=[];function Fe(e){return typeof e.outline=="object"&&!Array.isArray(e.outline)&&e.outline.label||e.outlineTitle||"On this page"}function we(e){const t=[...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")].filter(n=>n.id&&n.hasChildNodes()).map(n=>{const s=Number(n.tagName[1]);return{element:n,title:Mt(n),link:"#"+n.id,level:s}});return Et(t,e)}function Mt(e){let t="";for(const n of e.childNodes)if(n.nodeType===1){if(Pt.test(n.className))continue;t+=n.textContent}else n.nodeType===3&&(t+=n.textContent);return t.trim()}function Et(e,t){if(t===!1)return[];const n=(typeof t=="object"&&!Array.isArray(t)?t.level:t)||2,[s,a]=typeof n=="number"?[n,n]:n==="deep"?[2,6]:n;return Nt(e,s,a)}function Ct(e,t){const{isAsideEnabled:n}=St(),s=mt(i,100);let a=null;R(()=>{requestAnimationFrame(i),window.addEventListener("scroll",s)}),Xe(()=>{c(location.hash)}),ie(()=>{window.removeEventListener("scroll",s)});function i(){if(!n.value)return;const m=window.scrollY,p=window.innerHeight,k=document.body.offsetHeight,w=Math.abs(m+p-k)<1,_=be.map(({element:M,link:T})=>({link:T,top:Tt(M)})).filter(({top:M})=>!Number.isNaN(M)).sort((M,T)=>M.top-T.top);if(!_.length){c(null);return}if(m<1){c(null);return}if(w){c(_[_.length-1].link);return}let x=null;for(const{link:M,top:T}of _){if(T>m+Ze()+4)break;x=M}c(x)}function c(m){a&&a.classList.remove("active"),m==null?a=null:a=e.value.querySelector(`a[href="${decodeURIComponent(m)}"]`);const p=a;p?(p.classList.add("active"),t.value.style.top=p.offsetTop+39+"px",t.value.style.opacity="1"):(t.value.style.top="33px",t.value.style.opacity="0")}}function Tt(e){let t=0;for(;e!==document.body;){if(e===null)return NaN;t+=e.offsetTop,e=e.offsetParent}return t}function Nt(e,t,n){be.length=0;const s=[],a=[];return e.forEach(i=>{const c={...i,children:[]};let m=a[a.length-1];for(;m&&m.level>=c.level;)a.pop(),m=a[a.length-1];if(c.element.classList.contains("ignore-header")||m&&"shouldIgnore"in m){a.push({level:c.level,shouldIgnore:!0});return}c.level>n||c.level<t||(be.push({element:c.element,link:c.link}),m?m.children.push(c):s.push(c),a.push(c))}),s}const Vt=["href","title"],At=v({__name:"VPDocOutlineItem",props:{headers:{},root:{type:Boolean}},setup(e){function t({target:n}){const s=n.href.split("#")[1],a=document.getElementById(decodeURIComponent(s));a==null||a.focus({preventScroll:!0})}return(n,s)=>{const a=K("VPDocOutlineItem",!0);return o(),l("ul",{class:P(["VPDocOutlineItem",e.root?"root":"nested"])},[(o(!0),l(C,null,I(e.headers,({children:i,link:c,title:m})=>(o(),l("li",null,[u("a",{class:"outline-link",href:c,onClick:t,title:m},E(m),9,Vt),i!=null&&i.length?(o(),g(a,{key:0,headers:i},null,8,["headers"])):h("",!0)]))),256))],2)}}}),Ue=y(At,[["__scopeId","data-v-2a3128a2"]]),It={class:"content"},Bt={"aria-level":"2",class:"outline-title",id:"doc-outline-aria-label",role:"heading"},Ht=v({__name:"VPDocAsideOutline",setup(e){const{frontmatter:t,theme:n}=L(),s=ke([]);re(()=>{s.value=we(t.value.outline??n.value.outline)});const a=S(),i=S();return Ct(a,i),(c,m)=>(o(),l("nav",{"aria-labelledby":"doc-outline-aria-label",class:P(["VPDocAsideOutline",{"has-outline":s.value.length>0}]),ref_key:"container",ref:a},[u("div",It,[u("div",{class:"outline-marker",ref_key:"marker",ref:i},null,512),u("div",Bt,E(r(Fe)(r(n))),1),b(Ue,{headers:s.value,root:!0},null,8,["headers"])])],2))}}),Ot=y(Ht,[["__scopeId","data-v-2bc98192"]]),zt={class:"VPDocAsideCarbonAds"},Dt=v({__name:"VPDocAsideCarbonAds",props:{carbonAds:{}},setup(e){const t=()=>null;return(n,s)=>(o(),l("div",zt,[b(r(t),{"carbon-ads":e.carbonAds},null,8,["carbon-ads"])]))}}),jt={class:"VPDocAside"},Ft=v({__name:"VPDocAside",setup(e){const{theme:t}=L();return(n,s)=>(o(),l("div",jt,[d(n.$slots,"aside-top",{},void 0,!0),d(n.$slots,"aside-outline-before",{},void 0,!0),b(Ot),d(n.$slots,"aside-outline-after",{},void 0,!0),s[0]||(s[0]=u("div",{class:"spacer"},null,-1)),d(n.$slots,"aside-ads-before",{},void 0,!0),r(t).carbonAds?(o(),g(Dt,{key:0,"carbon-ads":r(t).carbonAds},null,8,["carbon-ads"])):h("",!0),d(n.$slots,"aside-ads-after",{},void 0,!0),d(n.$slots,"aside-bottom",{},void 0,!0)]))}}),Ut=y(Ft,[["__scopeId","data-v-b9e18809"]]);function Rt(){const{theme:e,page:t}=L();return $(()=>{const{text:n="Edit this page",pattern:s=""}=e.value.editLink||{};let a;return typeof s=="function"?a=s(t.value):a=s.replace(/:path/g,t.value.filePath),{url:a,text:n}})}function qt(){const{page:e,theme:t,frontmatter:n}=L();return $(()=>{var k,w,_,x,M,T,V,B;const s=je(t.value.sidebar,e.value.relativePath),a=xt(s),i=Wt(a,H=>H.link.replace(/[?#].*$/,"")),c=i.findIndex(H=>J(e.value.relativePath,H.link)),m=((k=t.value.docFooter)==null?void 0:k.prev)===!1&&!n.value.prev||n.value.prev===!1,p=((w=t.value.docFooter)==null?void 0:w.next)===!1&&!n.value.next||n.value.next===!1;return{prev:m?void 0:{text:(typeof n.value.prev=="string"?n.value.prev:typeof n.value.prev=="object"?n.value.prev.text:void 0)??((_=i[c-1])==null?void 0:_.docFooterText)??((x=i[c-1])==null?void 0:x.text),link:(typeof n.value.prev=="object"?n.value.prev.link:void 0)??((M=i[c-1])==null?void 0:M.link)},next:p?void 0:{text:(typeof n.value.next=="string"?n.value.next:typeof n.value.next=="object"?n.value.next.text:void 0)??((T=i[c+1])==null?void 0:T.docFooterText)??((V=i[c+1])==null?void 0:V.text),link:(typeof n.value.next=="object"?n.value.next.link:void 0)??((B=i[c+1])==null?void 0:B.link)}}})}function Wt(e,t){const n=new Set;return e.filter(s=>{const a=t(s);return n.has(a)?!1:n.add(a)})}const z=v({__name:"VPLink",props:{tag:{},href:{},noIcon:{type:Boolean},target:{},rel:{}},setup(e){const t=e,n=$(()=>t.tag??(t.href?"a":"span")),s=$(()=>t.href&&Be.test(t.href)||t.target==="_blank");return(a,i)=>(o(),g(j(n.value),{class:P(["VPLink",{link:e.href,"vp-external-link-icon":s.value,"no-icon":e.noIcon}]),href:e.href?r(xe)(e.href):void 0,target:e.target??(s.value?"_blank":void 0),rel:e.rel??(s.value?"noreferrer":void 0)},{default:f(()=>[d(a.$slots,"default")]),_:3},8,["class","href","target","rel"]))}}),Gt={class:"VPLastUpdated"},Jt=["datetime"],Kt=v({__name:"VPDocFooterLastUpdated",setup(e){const{theme:t,page:n,lang:s}=L(),a=$(()=>new Date(n.value.lastUpdated)),i=$(()=>a.value.toISOString()),c=S("");return R(()=>{oe(()=>{var m,p,k;c.value=new Intl.DateTimeFormat((p=(m=t.value.lastUpdated)==null?void 0:m.formatOptions)!=null&&p.forceLocale?s.value:void 0,((k=t.value.lastUpdated)==null?void 0:k.formatOptions)??{dateStyle:"short",timeStyle:"short"}).format(a.value)})}),(m,p)=>{var k;return o(),l("p",Gt,[q(E(((k=r(t).lastUpdated)==null?void 0:k.text)||r(t).lastUpdatedText||"Last updated")+": ",1),u("time",{datetime:i.value},E(c.value),9,Jt)])}}}),Yt=y(Kt,[["__scopeId","data-v-111efe82"]]),Xt={key:0,class:"VPDocFooter"},Zt={key:0,class:"edit-info"},Qt={key:0,class:"edit-link"},en={key:1,class:"last-updated"},tn={key:1,class:"prev-next","aria-labelledby":"doc-footer-aria-label"},nn={class:"pager"},sn=["innerHTML"],an=["innerHTML"],on={class:"pager"},rn=["innerHTML"],ln=["innerHTML"],cn=v({__name:"VPDocFooter",setup(e){const{theme:t,page:n,frontmatter:s}=L(),a=Rt(),i=qt(),c=$(()=>t.value.editLink&&s.value.editLink!==!1),m=$(()=>n.value.lastUpdated),p=$(()=>c.value||m.value||i.value.prev||i.value.next);return(k,w)=>{var _,x,M,T;return p.value?(o(),l("footer",Xt,[d(k.$slots,"doc-footer-before",{},void 0,!0),c.value||m.value?(o(),l("div",Zt,[c.value?(o(),l("div",Qt,[b(z,{class:"edit-link-button",href:r(a).url,"no-icon":!0},{default:f(()=>[w[0]||(w[0]=u("span",{class:"vpi-square-pen edit-link-icon"},null,-1)),q(" "+E(r(a).text),1)]),_:1},8,["href"])])):h("",!0),m.value?(o(),l("div",en,[b(Yt)])):h("",!0)])):h("",!0),(_=r(i).prev)!=null&&_.link||(x=r(i).next)!=null&&x.link?(o(),l("nav",tn,[w[1]||(w[1]=u("span",{class:"visually-hidden",id:"doc-footer-aria-label"},"Pager",-1)),u("div",nn,[(M=r(i).prev)!=null&&M.link?(o(),g(z,{key:0,class:"pager-link prev",href:r(i).prev.link},{default:f(()=>{var V;return[u("span",{class:"desc",innerHTML:((V=r(t).docFooter)==null?void 0:V.prev)||"Previous page"},null,8,sn),u("span",{class:"title",innerHTML:r(i).prev.text},null,8,an)]}),_:1},8,["href"])):h("",!0)]),u("div",on,[(T=r(i).next)!=null&&T.link?(o(),g(z,{key:0,class:"pager-link next",href:r(i).next.link},{default:f(()=>{var V;return[u("span",{class:"desc",innerHTML:((V=r(t).docFooter)==null?void 0:V.next)||"Next page"},null,8,rn),u("span",{class:"title",innerHTML:r(i).next.text},null,8,ln)]}),_:1},8,["href"])):h("",!0)])])):h("",!0)])):h("",!0)}}}),dn=y(cn,[["__scopeId","data-v-97e088ac"]]),un={class:"container"},mn={class:"aside-container"},pn={class:"aside-content"},fn={class:"content"},hn={class:"content-container"},vn={class:"main"},bn=v({__name:"VPDoc",setup(e){const{theme:t}=L(),n=X(),{hasSidebar:s,hasAside:a,leftAside:i}=W(),c=$(()=>n.path.replace(/[./]+/g,"_").replace(/_html$/,""));return(m,p)=>{const k=K("Content");return o(),l("div",{class:P(["VPDoc",{"has-sidebar":r(s),"has-aside":r(a)}])},[d(m.$slots,"doc-top",{},void 0,!0),u("div",un,[r(a)?(o(),l("div",{key:0,class:P(["aside",{"left-aside":r(i)}])},[p[0]||(p[0]=u("div",{class:"aside-curtain"},null,-1)),u("div",mn,[u("div",pn,[b(Ut,null,{"aside-top":f(()=>[d(m.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":f(()=>[d(m.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":f(()=>[d(m.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(m.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(m.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(m.$slots,"aside-ads-after",{},void 0,!0)]),_:3})])])],2)):h("",!0),u("div",fn,[u("div",hn,[d(m.$slots,"doc-before",{},void 0,!0),u("main",vn,[b(k,{class:P(["vp-doc",[c.value,r(t).externalLinkIcon&&"external-link-icon-enabled"]])},null,8,["class"])]),b(dn,null,{"doc-footer-before":f(()=>[d(m.$slots,"doc-footer-before",{},void 0,!0)]),_:3}),d(m.$slots,"doc-after",{},void 0,!0)])])]),d(m.$slots,"doc-bottom",{},void 0,!0)],2)}}}),gn=y(bn,[["__scopeId","data-v-f3c1b613"]]),yn=v({__name:"VPButton",props:{tag:{},size:{default:"medium"},theme:{default:"brand"},text:{},href:{},target:{},rel:{}},setup(e){const t=e,n=$(()=>t.href&&Be.test(t.href)),s=$(()=>t.tag||(t.href?"a":"button"));return(a,i)=>(o(),g(j(s.value),{class:P(["VPButton",[e.size,e.theme]]),href:e.href?r(xe)(e.href):void 0,target:t.target??(n.value?"_blank":void 0),rel:t.rel??(n.value?"noreferrer":void 0)},{default:f(()=>[q(E(e.text),1)]),_:1},8,["class","href","target","rel"]))}}),kn=y(yn,[["__scopeId","data-v-af2c2a42"]]),_n=["src","alt"],$n=v({inheritAttrs:!1,__name:"VPImage",props:{image:{},alt:{}},setup(e){return(t,n)=>{const s=K("VPImage",!0);return e.image?(o(),l(C,{key:0},[typeof e.image=="string"||"src"in e.image?(o(),l("img",G({key:0,class:"VPImage"},typeof e.image=="string"?t.$attrs:{...e.image,...t.$attrs},{src:r(ge)(typeof e.image=="string"?e.image:e.image.src),alt:e.alt??(typeof e.image=="string"?"":e.image.alt||"")}),null,16,_n)):(o(),l(C,{key:1},[b(s,G({class:"dark",image:e.image.dark,alt:e.image.alt},t.$attrs),null,16,["image","alt"]),b(s,G({class:"light",image:e.image.light,alt:e.image.alt},t.$attrs),null,16,["image","alt"])],64))],64)):h("",!0)}}}),se=y($n,[["__scopeId","data-v-4f08cb8c"]]),xn={class:"container"},wn={class:"main"},Ln={class:"heading"},Sn=["innerHTML"],Pn=["innerHTML"],Mn=["innerHTML"],En={key:0,class:"actions"},Cn={key:0,class:"image"},Tn={class:"image-container"},Nn=v({__name:"VPHero",props:{name:{},text:{},tagline:{},image:{},actions:{}},setup(e){const t=le("hero-image-slot-exists");return(n,s)=>(o(),l("div",{class:P(["VPHero",{"has-image":e.image||r(t)}])},[u("div",xn,[u("div",wn,[d(n.$slots,"home-hero-info-before",{},void 0,!0),d(n.$slots,"home-hero-info",{},()=>[u("h1",Ln,[e.name?(o(),l("span",{key:0,innerHTML:e.name,class:"name clip"},null,8,Sn)):h("",!0),e.text?(o(),l("span",{key:1,innerHTML:e.text,class:"text"},null,8,Pn)):h("",!0)]),e.tagline?(o(),l("p",{key:0,innerHTML:e.tagline,class:"tagline"},null,8,Mn)):h("",!0)],!0),d(n.$slots,"home-hero-info-after",{},void 0,!0),e.actions?(o(),l("div",En,[(o(!0),l(C,null,I(e.actions,a=>(o(),l("div",{key:a.link,class:"action"},[b(kn,{tag:"a",size:"medium",theme:a.theme,text:a.text,href:a.link,target:a.target,rel:a.rel},null,8,["theme","text","href","target","rel"])]))),128))])):h("",!0),d(n.$slots,"home-hero-actions-after",{},void 0,!0)]),e.image||r(t)?(o(),l("div",Cn,[u("div",Tn,[s[0]||(s[0]=u("div",{class:"image-bg"},null,-1)),d(n.$slots,"home-hero-image",{},()=>[e.image?(o(),g(se,{key:0,class:"image-src",image:e.image},null,8,["image"])):h("",!0)],!0)])])):h("",!0)])],2))}}),Vn=y(Nn,[["__scopeId","data-v-0a0965d4"]]),An=v({__name:"VPHomeHero",setup(e){const{frontmatter:t}=L();return(n,s)=>r(t).hero?(o(),g(Vn,{key:0,class:"VPHomeHero",name:r(t).hero.name,text:r(t).hero.text,tagline:r(t).hero.tagline,image:r(t).hero.image,actions:r(t).hero.actions},{"home-hero-info-before":f(()=>[d(n.$slots,"home-hero-info-before")]),"home-hero-info":f(()=>[d(n.$slots,"home-hero-info")]),"home-hero-info-after":f(()=>[d(n.$slots,"home-hero-info-after")]),"home-hero-actions-after":f(()=>[d(n.$slots,"home-hero-actions-after")]),"home-hero-image":f(()=>[d(n.$slots,"home-hero-image")]),_:3},8,["name","text","tagline","image","actions"])):h("",!0)}}),In={class:"box"},Bn={key:0,class:"icon"},Hn=["innerHTML"],On=["innerHTML"],zn=["innerHTML"],Dn={key:4,class:"link-text"},jn={class:"link-text-value"},Fn=v({__name:"VPFeature",props:{icon:{},title:{},details:{},link:{},linkText:{},rel:{},target:{}},setup(e){return(t,n)=>(o(),g(z,{class:"VPFeature",href:e.link,rel:e.rel,target:e.target,"no-icon":!0,tag:e.link?"a":"div"},{default:f(()=>[u("article",In,[typeof e.icon=="object"&&e.icon.wrap?(o(),l("div",Bn,[b(se,{image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])])):typeof e.icon=="object"?(o(),g(se,{key:1,image:e.icon,alt:e.icon.alt,height:e.icon.height||48,width:e.icon.width||48},null,8,["image","alt","height","width"])):e.icon?(o(),l("div",{key:2,class:"icon",innerHTML:e.icon},null,8,Hn)):h("",!0),u("h2",{class:"title",innerHTML:e.title},null,8,On),e.details?(o(),l("p",{key:3,class:"details",innerHTML:e.details},null,8,zn)):h("",!0),e.linkText?(o(),l("div",Dn,[u("p",jn,[q(E(e.linkText)+" ",1),n[0]||(n[0]=u("span",{class:"vpi-arrow-right link-text-icon"},null,-1))])])):h("",!0)])]),_:1},8,["href","rel","target","tag"]))}}),Un=y(Fn,[["__scopeId","data-v-4b7d41bb"]]),Rn={key:0,class:"VPFeatures"},qn={class:"container"},Wn={class:"items"},Gn=v({__name:"VPFeatures",props:{features:{}},setup(e){const t=e,n=$(()=>{const s=t.features.length;if(s){if(s===2)return"grid-2";if(s===3)return"grid-3";if(s%3===0)return"grid-6";if(s>3)return"grid-4"}else return});return(s,a)=>e.features?(o(),l("div",Rn,[u("div",qn,[u("div",Wn,[(o(!0),l(C,null,I(e.features,i=>(o(),l("div",{key:i.title,class:P(["item",[n.value]])},[b(Un,{icon:i.icon,title:i.title,details:i.details,link:i.link,"link-text":i.linkText,rel:i.rel,target:i.target},null,8,["icon","title","details","link","link-text","rel","target"])],2))),128))])])])):h("",!0)}}),Jn=y(Gn,[["__scopeId","data-v-cc122ad9"]]),Kn=v({__name:"VPHomeFeatures",setup(e){const{frontmatter:t}=L();return(n,s)=>r(t).features?(o(),g(Jn,{key:0,class:"VPHomeFeatures",features:r(t).features},null,8,["features"])):h("",!0)}}),Yn=v({__name:"VPHomeContent",setup(e){const{width:t}=Qe({initialWidth:0,includeScrollbar:!1});return(n,s)=>(o(),l("div",{class:"vp-doc container",style:_e(r(t)?{"--vp-offset":`calc(50% - ${r(t)/2}px)`}:{})},[d(n.$slots,"default",{},void 0,!0)],4))}}),Xn=y(Yn,[["__scopeId","data-v-bdee64c6"]]),Zn=v({__name:"VPHome",setup(e){const{frontmatter:t,theme:n}=L();return(s,a)=>{const i=K("Content");return o(),l("div",{class:P(["VPHome",{"external-link-icon-enabled":r(n).externalLinkIcon}])},[d(s.$slots,"home-hero-before",{},void 0,!0),b(An,null,{"home-hero-info-before":f(()=>[d(s.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(s.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(s.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(s.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(s.$slots,"home-hero-image",{},void 0,!0)]),_:3}),d(s.$slots,"home-hero-after",{},void 0,!0),d(s.$slots,"home-features-before",{},void 0,!0),b(Kn),d(s.$slots,"home-features-after",{},void 0,!0),r(t).markdownStyles!==!1?(o(),g(Xn,{key:0},{default:f(()=>[b(i)]),_:1})):(o(),g(i,{key:1}))],2)}}}),Qn=y(Zn,[["__scopeId","data-v-8088d8db"]]),es={},ts={class:"VPPage"};function ns(e,t){const n=K("Content");return o(),l("div",ts,[d(e.$slots,"page-top"),b(n),d(e.$slots,"page-bottom")])}const ss=y(es,[["render",ns]]),as=v({__name:"VPContent",setup(e){const{page:t,frontmatter:n}=L(),{hasSidebar:s}=W();return(a,i)=>(o(),l("div",{class:P(["VPContent",{"has-sidebar":r(s),"is-home":r(n).layout==="home"}]),id:"VPContent"},[r(t).isNotFound?d(a.$slots,"not-found",{key:0},()=>[b(_t)],!0):r(n).layout==="page"?(o(),g(ss,{key:1},{"page-top":f(()=>[d(a.$slots,"page-top",{},void 0,!0)]),"page-bottom":f(()=>[d(a.$slots,"page-bottom",{},void 0,!0)]),_:3})):r(n).layout==="home"?(o(),g(Qn,{key:2},{"home-hero-before":f(()=>[d(a.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":f(()=>[d(a.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(a.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(a.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(a.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(a.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":f(()=>[d(a.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":f(()=>[d(a.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":f(()=>[d(a.$slots,"home-features-after",{},void 0,!0)]),_:3})):r(n).layout&&r(n).layout!=="doc"?(o(),g(j(r(n).layout),{key:3})):(o(),g(gn,{key:4},{"doc-top":f(()=>[d(a.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":f(()=>[d(a.$slots,"doc-bottom",{},void 0,!0)]),"doc-footer-before":f(()=>[d(a.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":f(()=>[d(a.$slots,"doc-before",{},void 0,!0)]),"doc-after":f(()=>[d(a.$slots,"doc-after",{},void 0,!0)]),"aside-top":f(()=>[d(a.$slots,"aside-top",{},void 0,!0)]),"aside-outline-before":f(()=>[d(a.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(a.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(a.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(a.$slots,"aside-ads-after",{},void 0,!0)]),"aside-bottom":f(()=>[d(a.$slots,"aside-bottom",{},void 0,!0)]),_:3}))],2))}}),os=y(as,[["__scopeId","data-v-b8976543"]]),is={class:"container"},rs=["innerHTML"],ls=["innerHTML"],cs=v({__name:"VPFooter",setup(e){const{theme:t,frontmatter:n}=L(),{hasSidebar:s}=W();return(a,i)=>r(t).footer&&r(n).footer!==!1?(o(),l("footer",{key:0,class:P(["VPFooter",{"has-sidebar":r(s)}])},[u("div",is,[r(t).footer.message?(o(),l("p",{key:0,class:"message",innerHTML:r(t).footer.message},null,8,rs)):h("",!0),r(t).footer.copyright?(o(),l("p",{key:1,class:"copyright",innerHTML:r(t).footer.copyright},null,8,ls)):h("",!0)])],2)):h("",!0)}}),ds=y(cs,[["__scopeId","data-v-7fbfeb70"]]);function us(){const{theme:e,frontmatter:t}=L(),n=ke([]),s=$(()=>n.value.length>0);return re(()=>{n.value=we(t.value.outline??e.value.outline)}),{headers:n,hasLocalNav:s}}const ms={class:"menu-text"},ps={class:"header"},fs={class:"outline"},hs=v({__name:"VPLocalNavOutlineDropdown",props:{headers:{},navHeight:{}},setup(e){const t=e,{theme:n}=L(),s=S(!1),a=S(0),i=S(),c=S();function m(_){var x;(x=i.value)!=null&&x.contains(_.target)||(s.value=!1)}U(s,_=>{if(_){document.addEventListener("click",m);return}document.removeEventListener("click",m)}),pe("Escape",()=>{s.value=!1}),re(()=>{s.value=!1});function p(){s.value=!s.value,a.value=window.innerHeight+Math.min(window.scrollY-t.navHeight,0)}function k(_){_.target.classList.contains("outline-link")&&(c.value&&(c.value.style.transition="none"),$e(()=>{s.value=!1}))}function w(){s.value=!1,window.scrollTo({top:0,left:0,behavior:"smooth"})}return(_,x)=>(o(),l("div",{class:"VPLocalNavOutlineDropdown",style:_e({"--vp-vh":a.value+"px"}),ref_key:"main",ref:i},[e.headers.length>0?(o(),l("button",{key:0,onClick:p,class:P({open:s.value})},[u("span",ms,E(r(Fe)(r(n))),1),x[0]||(x[0]=u("span",{class:"vpi-chevron-right icon"},null,-1))],2)):(o(),l("button",{key:1,onClick:w},E(r(n).returnToTopLabel||"Return to top"),1)),b(ae,{name:"flyout"},{default:f(()=>[s.value?(o(),l("div",{key:0,ref_key:"items",ref:c,class:"items",onClick:k},[u("div",ps,[u("a",{class:"top-link",href:"#",onClick:w},E(r(n).returnToTopLabel||"Return to top"),1)]),u("div",fs,[b(Ue,{headers:e.headers},null,8,["headers"])])],512)):h("",!0)]),_:1})],4))}}),vs=y(hs,[["__scopeId","data-v-8af9a77e"]]),bs={class:"container"},gs=["aria-expanded"],ys={class:"menu-text"},ks=v({__name:"VPLocalNav",props:{open:{type:Boolean}},emits:["open-menu"],setup(e){const{theme:t,frontmatter:n}=L(),{hasSidebar:s}=W(),{headers:a}=us(),{y:i}=He(),c=S(0);R(()=>{c.value=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vp-nav-height"))}),re(()=>{a.value=we(n.value.outline??t.value.outline)});const m=$(()=>a.value.length===0),p=$(()=>m.value&&!s.value),k=$(()=>({VPLocalNav:!0,"has-sidebar":s.value,empty:m.value,fixed:p.value}));return(w,_)=>r(n).layout!=="home"&&(!p.value||r(i)>=c.value)?(o(),l("div",{key:0,class:P(k.value)},[u("div",bs,[r(s)?(o(),l("button",{key:0,class:"menu","aria-expanded":e.open,"aria-controls":"VPSidebarNav",onClick:_[0]||(_[0]=x=>w.$emit("open-menu"))},[_[1]||(_[1]=u("span",{class:"vpi-align-left menu-icon"},null,-1)),u("span",ys,E(r(t).sidebarMenuLabel||"Menu"),1)],8,gs)):h("",!0),b(vs,{headers:r(a),navHeight:c.value},null,8,["headers","navHeight"])])],2)):h("",!0)}}),_s=y(ks,[["__scopeId","data-v-eeebba86"]]);function $s(){const e=S(!1);function t(){e.value=!0,window.addEventListener("resize",a)}function n(){e.value=!1,window.removeEventListener("resize",a)}function s(){e.value?n():t()}function a(){window.outerWidth>=768&&n()}const i=X();return U(()=>i.path,n),{isScreenOpen:e,openScreen:t,closeScreen:n,toggleScreen:s}}const xs={},ws={class:"VPSwitch",type:"button",role:"switch"},Ls={class:"check"},Ss={key:0,class:"icon"};function Ps(e,t){return o(),l("button",ws,[u("span",Ls,[e.$slots.default?(o(),l("span",Ss,[d(e.$slots,"default",{},void 0,!0)])):h("",!0)])])}const Ms=y(xs,[["render",Ps],["__scopeId","data-v-19c18915"]]),Es=v({__name:"VPSwitchAppearance",setup(e){const{isDark:t,theme:n}=L(),s=le("toggle-appearance",()=>{t.value=!t.value}),a=S("");return ye(()=>{a.value=t.value?n.value.lightModeSwitchTitle||"Switch to light theme":n.value.darkModeSwitchTitle||"Switch to dark theme"}),(i,c)=>(o(),g(Ms,{title:a.value,class:"VPSwitchAppearance","aria-checked":r(t),onClick:r(s)},{default:f(()=>[...c[0]||(c[0]=[u("span",{class:"vpi-sun sun"},null,-1),u("span",{class:"vpi-moon moon"},null,-1)])]),_:1},8,["title","aria-checked","onClick"]))}}),Le=y(Es,[["__scopeId","data-v-e7bbbd70"]]),Cs={key:0,class:"VPNavBarAppearance"},Ts=v({__name:"VPNavBarAppearance",setup(e){const{site:t}=L();return(n,s)=>r(t).appearance&&r(t).appearance!=="force-dark"&&r(t).appearance!=="force-auto"?(o(),l("div",Cs,[b(Le)])):h("",!0)}}),Ns=y(Ts,[["__scopeId","data-v-552e55dd"]]),Se=S();let Re=!1,ue=0;function Vs(e){const t=S(!1);if(Z){!Re&&As(),ue++;const n=U(Se,s=>{var a,i,c;s===e.el.value||(a=e.el.value)!=null&&a.contains(s)?(t.value=!0,(i=e.onFocus)==null||i.call(e)):(t.value=!1,(c=e.onBlur)==null||c.call(e))});ie(()=>{n(),ue--,ue||Is()})}return et(t)}function As(){document.addEventListener("focusin",qe),Re=!0,Se.value=document.activeElement}function Is(){document.removeEventListener("focusin",qe)}function qe(){Se.value=document.activeElement}const Bs={class:"VPMenuLink"},Hs=["innerHTML"],Os=v({__name:"VPMenuLink",props:{item:{}},setup(e){const{page:t}=L();return(n,s)=>(o(),l("div",Bs,[b(z,{class:P({active:r(J)(r(t).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon},{default:f(()=>[u("span",{innerHTML:e.item.text},null,8,Hs)]),_:1},8,["class","href","target","rel","no-icon"])]))}}),ce=y(Os,[["__scopeId","data-v-563f1812"]]),zs={class:"VPMenuGroup"},Ds={key:0,class:"title"},js=v({__name:"VPMenuGroup",props:{text:{},items:{}},setup(e){return(t,n)=>(o(),l("div",zs,[e.text?(o(),l("p",Ds,E(e.text),1)):h("",!0),(o(!0),l(C,null,I(e.items,s=>(o(),l(C,null,["link"in s?(o(),g(ce,{key:0,item:s},null,8,["item"])):h("",!0)],64))),256))]))}}),Fs=y(js,[["__scopeId","data-v-3f5e96eb"]]),Us={class:"VPMenu"},Rs={key:0,class:"items"},qs=v({__name:"VPMenu",props:{items:{}},setup(e){return(t,n)=>(o(),l("div",Us,[e.items?(o(),l("div",Rs,[(o(!0),l(C,null,I(e.items,s=>(o(),l(C,{key:JSON.stringify(s)},["link"in s?(o(),g(ce,{key:0,item:s},null,8,["item"])):"component"in s?(o(),g(j(s.component),G({key:1,ref_for:!0},s.props),null,16)):(o(),g(Fs,{key:2,text:s.text,items:s.items},null,8,["text","items"]))],64))),128))])):h("",!0),d(t.$slots,"default",{},void 0,!0)]))}}),Ws=y(qs,[["__scopeId","data-v-8c75072e"]]),Gs=["aria-expanded","aria-label"],Js={key:0,class:"text"},Ks=["innerHTML"],Ys={key:1,class:"vpi-more-horizontal icon"},Xs={class:"menu"},Zs=v({__name:"VPFlyout",props:{icon:{},button:{},label:{},items:{}},setup(e){const t=S(!1),n=S();Vs({el:n,onBlur:s});function s(){t.value=!1}return(a,i)=>(o(),l("div",{class:"VPFlyout",ref_key:"el",ref:n,onMouseenter:i[1]||(i[1]=c=>t.value=!0),onMouseleave:i[2]||(i[2]=c=>t.value=!1)},[u("button",{type:"button",class:"button","aria-haspopup":"true","aria-expanded":t.value,"aria-label":e.label,onClick:i[0]||(i[0]=c=>t.value=!t.value)},[e.button||e.icon?(o(),l("span",Js,[e.icon?(o(),l("span",{key:0,class:P([e.icon,"option-icon"])},null,2)):h("",!0),e.button?(o(),l("span",{key:1,innerHTML:e.button},null,8,Ks)):h("",!0),i[3]||(i[3]=u("span",{class:"vpi-chevron-down text-icon"},null,-1))])):(o(),l("span",Ys))],8,Gs),u("div",Xs,[b(Ws,{items:e.items},{default:f(()=>[d(a.$slots,"default",{},void 0,!0)]),_:3},8,["items"])])],544))}}),Pe=y(Zs,[["__scopeId","data-v-377ebe9b"]]),Qs=["href","aria-label","innerHTML"],ea=v({__name:"VPSocialLink",props:{icon:{},link:{},ariaLabel:{}},setup(e){const t=e,n=S();R(async()=>{var i;await $e();const a=(i=n.value)==null?void 0:i.children[0];a instanceof HTMLElement&&a.className.startsWith("vpi-social-")&&(getComputedStyle(a).maskImage||getComputedStyle(a).webkitMaskImage)==="none"&&a.style.setProperty("--icon",`url('https://api.iconify.design/simple-icons/${t.icon}.svg')`)});const s=$(()=>typeof t.icon=="object"?t.icon.svg:`<span class="vpi-social-${t.icon}"></span>`);return(a,i)=>(o(),l("a",{ref_key:"el",ref:n,class:"VPSocialLink no-icon",href:e.link,"aria-label":e.ariaLabel??(typeof e.icon=="string"?e.icon:""),target:"_blank",rel:"noopener",innerHTML:s.value},null,8,Qs))}}),ta=y(ea,[["__scopeId","data-v-7681bad9"]]),na={class:"VPSocialLinks"},sa=v({__name:"VPSocialLinks",props:{links:{}},setup(e){return(t,n)=>(o(),l("div",na,[(o(!0),l(C,null,I(e.links,({link:s,icon:a,ariaLabel:i})=>(o(),g(ta,{key:s,icon:a,link:s,ariaLabel:i},null,8,["icon","link","ariaLabel"]))),128))]))}}),de=y(sa,[["__scopeId","data-v-16fcf9c0"]]),aa={key:0,class:"group translations"},oa={class:"trans-title"},ia={key:1,class:"group"},ra={class:"item appearance"},la={class:"label"},ca={class:"appearance-action"},da={key:2,class:"group"},ua={class:"item social-links"},ma=v({__name:"VPNavBarExtra",setup(e){const{site:t,theme:n}=L(),{localeLinks:s,currentLang:a}=Q({correspondingLink:!0}),i=$(()=>s.value.length&&a.value.label||t.value.appearance||n.value.socialLinks);return(c,m)=>i.value?(o(),g(Pe,{key:0,class:"VPNavBarExtra",label:"extra navigation"},{default:f(()=>[r(s).length&&r(a).label?(o(),l("div",aa,[u("p",oa,E(r(a).label),1),(o(!0),l(C,null,I(r(s),p=>(o(),g(ce,{key:p.link,item:p},null,8,["item"]))),128))])):h("",!0),r(t).appearance&&r(t).appearance!=="force-dark"&&r(t).appearance!=="force-auto"?(o(),l("div",ia,[u("div",ra,[u("p",la,E(r(n).darkModeSwitchLabel||"Appearance"),1),u("div",ca,[b(Le)])])])):h("",!0),r(n).socialLinks?(o(),l("div",da,[u("div",ua,[b(de,{class:"social-links-list",links:r(n).socialLinks},null,8,["links"])])])):h("",!0)]),_:1})):h("",!0)}}),pa=y(ma,[["__scopeId","data-v-6eb135c6"]]),fa=["aria-expanded"],ha=v({__name:"VPNavBarHamburger",props:{active:{type:Boolean}},emits:["click"],setup(e){return(t,n)=>(o(),l("button",{type:"button",class:P(["VPNavBarHamburger",{active:e.active}]),"aria-label":"mobile navigation","aria-expanded":e.active,"aria-controls":"VPNavScreen",onClick:n[0]||(n[0]=s=>t.$emit("click"))},[...n[1]||(n[1]=[u("span",{class:"container"},[u("span",{class:"top"}),u("span",{class:"middle"}),u("span",{class:"bottom"})],-1)])],10,fa))}}),va=y(ha,[["__scopeId","data-v-6c601ed8"]]),ba=["innerHTML"],ga=v({__name:"VPNavBarMenuLink",props:{item:{}},setup(e){const{page:t}=L();return(n,s)=>(o(),g(z,{class:P({VPNavBarMenuLink:!0,active:r(J)(r(t).relativePath,e.item.activeMatch||e.item.link,!!e.item.activeMatch)}),href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,tabindex:"0"},{default:f(()=>[u("span",{innerHTML:e.item.text},null,8,ba)]),_:1},8,["class","href","target","rel","no-icon"]))}}),ya=y(ga,[["__scopeId","data-v-0ce3566a"]]),ka=v({__name:"VPNavBarMenuGroup",props:{item:{}},setup(e){const t=e,{page:n}=L(),s=i=>"component"in i?!1:"link"in i?J(n.value.relativePath,i.link,!!t.item.activeMatch):i.items.some(s),a=$(()=>s(t.item));return(i,c)=>(o(),g(Pe,{class:P({VPNavBarMenuGroup:!0,active:r(J)(r(n).relativePath,e.item.activeMatch,!!e.item.activeMatch)||a.value}),button:e.item.text,items:e.item.items},null,8,["class","button","items"]))}}),_a={key:0,"aria-labelledby":"main-nav-aria-label",class:"VPNavBarMenu"},$a=v({__name:"VPNavBarMenu",setup(e){const{theme:t}=L();return(n,s)=>r(t).nav?(o(),l("nav",_a,[s[0]||(s[0]=u("span",{id:"main-nav-aria-label",class:"visually-hidden"}," Main Navigation ",-1)),(o(!0),l(C,null,I(r(t).nav,a=>(o(),l(C,{key:JSON.stringify(a)},["link"in a?(o(),g(ya,{key:0,item:a},null,8,["item"])):"component"in a?(o(),g(j(a.component),G({key:1,ref_for:!0},a.props),null,16)):(o(),g(ka,{key:2,item:a},null,8,["item"]))],64))),128))])):h("",!0)}}),xa=y($a,[["__scopeId","data-v-15033841"]]);function wa(e){const{localeIndex:t,theme:n}=L();function s(a){var T,V,B;const i=a.split("."),c=(T=n.value.search)==null?void 0:T.options,m=c&&typeof c=="object",p=m&&((B=(V=c.locales)==null?void 0:V[t.value])==null?void 0:B.translations)||null,k=m&&c.translations||null;let w=p,_=k,x=e;const M=i.pop();for(const H of i){let O=null;const D=x==null?void 0:x[H];D&&(O=x=D);const A=_==null?void 0:_[H];A&&(O=_=A);const N=w==null?void 0:w[H];N&&(O=w=N),D||(x=O),A||(_=O),N||(w=O)}return(w==null?void 0:w[M])??(_==null?void 0:_[M])??(x==null?void 0:x[M])??""}return s}const La=["aria-label"],Sa={class:"DocSearch-Button-Container"},Pa={class:"DocSearch-Button-Placeholder"},Ce=v({__name:"VPNavBarSearchButton",setup(e){const n=wa({button:{buttonText:"Search",buttonAriaLabel:"Search"}});return(s,a)=>(o(),l("button",{type:"button",class:"DocSearch DocSearch-Button","aria-label":r(n)("button.buttonAriaLabel")},[u("span",Sa,[a[0]||(a[0]=u("span",{class:"vp-icon DocSearch-Search-Icon"},null,-1)),u("span",Pa,E(r(n)("button.buttonText")),1)]),a[1]||(a[1]=u("span",{class:"DocSearch-Button-Keys"},[u("kbd",{class:"DocSearch-Button-Key"}),u("kbd",{class:"DocSearch-Button-Key"},"K")],-1))],8,La))}}),Ma={class:"VPNavBarSearch"},Ea={id:"local-search"},Ca={key:1,id:"docsearch"},Ta=v({__name:"VPNavBarSearch",setup(e){const t=tt(()=>fe(()=>import("./VPLocalSearchBox.CimADH3Z.js"),__vite__mapDeps([0,1]))),n=()=>null,{theme:s}=L(),a=S(!1),i=S(!1);R(()=>{});function c(){a.value||(a.value=!0,setTimeout(m,16))}function m(){const _=new Event("keydown");_.key="k",_.metaKey=!0,window.dispatchEvent(_),setTimeout(()=>{document.querySelector(".DocSearch-Modal")||m()},16)}function p(_){const x=_.target,M=x.tagName;return x.isContentEditable||M==="INPUT"||M==="SELECT"||M==="TEXTAREA"}const k=S(!1);pe("k",_=>{(_.ctrlKey||_.metaKey)&&(_.preventDefault(),k.value=!0)}),pe("/",_=>{p(_)||(_.preventDefault(),k.value=!0)});const w="local";return(_,x)=>{var M;return o(),l("div",Ma,[r(w)==="local"?(o(),l(C,{key:0},[k.value?(o(),g(r(t),{key:0,onClose:x[0]||(x[0]=T=>k.value=!1)})):h("",!0),u("div",Ea,[b(Ce,{onClick:x[1]||(x[1]=T=>k.value=!0)})])],64)):r(w)==="algolia"?(o(),l(C,{key:1},[a.value?(o(),g(r(n),{key:0,algolia:((M=r(s).search)==null?void 0:M.options)??r(s).algolia,onVnodeBeforeMount:x[2]||(x[2]=T=>i.value=!0)},null,8,["algolia"])):h("",!0),i.value?h("",!0):(o(),l("div",Ca,[b(Ce,{onClick:c})]))],64)):h("",!0)])}}}),Na=v({__name:"VPNavBarSocialLinks",setup(e){const{theme:t}=L();return(n,s)=>r(t).socialLinks?(o(),g(de,{key:0,class:"VPNavBarSocialLinks",links:r(t).socialLinks},null,8,["links"])):h("",!0)}}),Va=y(Na,[["__scopeId","data-v-f74b5d32"]]),Aa=["href","rel","target"],Ia=["innerHTML"],Ba={key:2},Ha=v({__name:"VPNavBarTitle",setup(e){const{site:t,theme:n}=L(),{hasSidebar:s}=W(),{currentLang:a}=Q(),i=$(()=>{var p;return typeof n.value.logoLink=="string"?n.value.logoLink:(p=n.value.logoLink)==null?void 0:p.link}),c=$(()=>{var p;return typeof n.value.logoLink=="string"||(p=n.value.logoLink)==null?void 0:p.rel}),m=$(()=>{var p;return typeof n.value.logoLink=="string"||(p=n.value.logoLink)==null?void 0:p.target});return(p,k)=>(o(),l("div",{class:P(["VPNavBarTitle",{"has-sidebar":r(s)}])},[u("a",{class:"title",href:i.value??r(xe)(r(a).link),rel:c.value,target:m.value},[d(p.$slots,"nav-bar-title-before",{},void 0,!0),r(n).logo?(o(),g(se,{key:0,class:"logo",image:r(n).logo},null,8,["image"])):h("",!0),r(n).siteTitle?(o(),l("span",{key:1,innerHTML:r(n).siteTitle},null,8,Ia)):r(n).siteTitle===void 0?(o(),l("span",Ba,E(r(t).title),1)):h("",!0),d(p.$slots,"nav-bar-title-after",{},void 0,!0)],8,Aa)],2))}}),Oa=y(Ha,[["__scopeId","data-v-a122f313"]]),za={class:"items"},Da={class:"title"},ja=v({__name:"VPNavBarTranslations",setup(e){const{theme:t}=L(),{localeLinks:n,currentLang:s}=Q({correspondingLink:!0});return(a,i)=>r(n).length&&r(s).label?(o(),g(Pe,{key:0,class:"VPNavBarTranslations",icon:"vpi-languages",label:r(t).langMenuLabel||"Change language"},{default:f(()=>[u("div",za,[u("p",Da,E(r(s).label),1),(o(!0),l(C,null,I(r(n),c=>(o(),g(ce,{key:c.link,item:c},null,8,["item"]))),128))])]),_:1},8,["label"])):h("",!0)}}),Fa=y(ja,[["__scopeId","data-v-7e01dd96"]]),Ua={class:"wrapper"},Ra={class:"container"},qa={class:"title"},Wa={class:"content"},Ga={class:"content-body"},Ja=v({__name:"VPNavBar",props:{isScreenOpen:{type:Boolean}},emits:["toggle-screen"],setup(e){const t=e,{y:n}=He(),{hasSidebar:s}=W(),{frontmatter:a}=L(),i=S({});return ye(()=>{i.value={"has-sidebar":s.value,home:a.value.layout==="home",top:n.value===0,"screen-open":t.isScreenOpen}}),(c,m)=>(o(),l("div",{class:P(["VPNavBar",i.value])},[u("div",Ua,[u("div",Ra,[u("div",qa,[b(Oa,null,{"nav-bar-title-before":f(()=>[d(c.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(c.$slots,"nav-bar-title-after",{},void 0,!0)]),_:3})]),u("div",Wa,[u("div",Ga,[d(c.$slots,"nav-bar-content-before",{},void 0,!0),b(Ta,{class:"search"}),b(xa,{class:"menu"}),b(Fa,{class:"translations"}),b(Ns,{class:"appearance"}),b(Va,{class:"social-links"}),b(pa,{class:"extra"}),d(c.$slots,"nav-bar-content-after",{},void 0,!0),b(va,{class:"hamburger",active:e.isScreenOpen,onClick:m[0]||(m[0]=p=>c.$emit("toggle-screen"))},null,8,["active"])])])])]),m[1]||(m[1]=u("div",{class:"divider"},[u("div",{class:"divider-line"})],-1))],2))}}),Ka=y(Ja,[["__scopeId","data-v-61a09319"]]),Ya={key:0,class:"VPNavScreenAppearance"},Xa={class:"text"},Za=v({__name:"VPNavScreenAppearance",setup(e){const{site:t,theme:n}=L();return(s,a)=>r(t).appearance&&r(t).appearance!=="force-dark"&&r(t).appearance!=="force-auto"?(o(),l("div",Ya,[u("p",Xa,E(r(n).darkModeSwitchLabel||"Appearance"),1),b(Le)])):h("",!0)}}),Qa=y(Za,[["__scopeId","data-v-957826ae"]]),eo=["innerHTML"],to=v({__name:"VPNavScreenMenuLink",props:{item:{}},setup(e){const t=le("close-screen");return(n,s)=>(o(),g(z,{class:"VPNavScreenMenuLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:r(t)},{default:f(()=>[u("span",{innerHTML:e.item.text},null,8,eo)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),no=y(to,[["__scopeId","data-v-77f7b8a6"]]),so=["innerHTML"],ao=v({__name:"VPNavScreenMenuGroupLink",props:{item:{}},setup(e){const t=le("close-screen");return(n,s)=>(o(),g(z,{class:"VPNavScreenMenuGroupLink",href:e.item.link,target:e.item.target,rel:e.item.rel,"no-icon":e.item.noIcon,onClick:r(t)},{default:f(()=>[u("span",{innerHTML:e.item.text},null,8,so)]),_:1},8,["href","target","rel","no-icon","onClick"]))}}),We=y(ao,[["__scopeId","data-v-45b593bd"]]),oo={class:"VPNavScreenMenuGroupSection"},io={key:0,class:"title"},ro=v({__name:"VPNavScreenMenuGroupSection",props:{text:{},items:{}},setup(e){return(t,n)=>(o(),l("div",oo,[e.text?(o(),l("p",io,E(e.text),1)):h("",!0),(o(!0),l(C,null,I(e.items,s=>(o(),g(We,{key:s.text,item:s},null,8,["item"]))),128))]))}}),lo=y(ro,[["__scopeId","data-v-b5091c6a"]]),co=["aria-controls","aria-expanded"],uo=["innerHTML"],mo=["id"],po={key:0,class:"item"},fo={key:1,class:"item"},ho={key:2,class:"group"},vo=v({__name:"VPNavScreenMenuGroup",props:{text:{},items:{}},setup(e){const t=e,n=S(!1),s=$(()=>`NavScreenGroup-${t.text.replace(" ","-").toLowerCase()}`);function a(){n.value=!n.value}return(i,c)=>(o(),l("div",{class:P(["VPNavScreenMenuGroup",{open:n.value}])},[u("button",{class:"button","aria-controls":s.value,"aria-expanded":n.value,onClick:a},[u("span",{class:"button-text",innerHTML:e.text},null,8,uo),c[0]||(c[0]=u("span",{class:"vpi-plus button-icon"},null,-1))],8,co),u("div",{id:s.value,class:"items"},[(o(!0),l(C,null,I(e.items,m=>(o(),l(C,{key:JSON.stringify(m)},["link"in m?(o(),l("div",po,[b(We,{item:m},null,8,["item"])])):"component"in m?(o(),l("div",fo,[(o(),g(j(m.component),G({ref_for:!0},m.props,{"screen-menu":""}),null,16))])):(o(),l("div",ho,[b(lo,{text:m.text,items:m.items},null,8,["text","items"])]))],64))),128))],8,mo)],2))}}),bo=y(vo,[["__scopeId","data-v-b94750a4"]]),go={key:0,class:"VPNavScreenMenu"},yo=v({__name:"VPNavScreenMenu",setup(e){const{theme:t}=L();return(n,s)=>r(t).nav?(o(),l("nav",go,[(o(!0),l(C,null,I(r(t).nav,a=>(o(),l(C,{key:JSON.stringify(a)},["link"in a?(o(),g(no,{key:0,item:a},null,8,["item"])):"component"in a?(o(),g(j(a.component),G({key:1,ref_for:!0},a.props,{"screen-menu":""}),null,16)):(o(),g(bo,{key:2,text:a.text||"",items:a.items},null,8,["text","items"]))],64))),128))])):h("",!0)}}),ko=v({__name:"VPNavScreenSocialLinks",setup(e){const{theme:t}=L();return(n,s)=>r(t).socialLinks?(o(),g(de,{key:0,class:"VPNavScreenSocialLinks",links:r(t).socialLinks},null,8,["links"])):h("",!0)}}),_o={class:"list"},$o=v({__name:"VPNavScreenTranslations",setup(e){const{localeLinks:t,currentLang:n}=Q({correspondingLink:!0}),s=S(!1);function a(){s.value=!s.value}return(i,c)=>r(t).length&&r(n).label?(o(),l("div",{key:0,class:P(["VPNavScreenTranslations",{open:s.value}])},[u("button",{class:"title",onClick:a},[c[0]||(c[0]=u("span",{class:"vpi-languages icon lang"},null,-1)),q(" "+E(r(n).label)+" ",1),c[1]||(c[1]=u("span",{class:"vpi-chevron-down icon chevron"},null,-1))]),u("ul",_o,[(o(!0),l(C,null,I(r(t),m=>(o(),l("li",{key:m.link,class:"item"},[b(z,{class:"link",href:m.link},{default:f(()=>[q(E(m.text),1)]),_:2},1032,["href"])]))),128))])],2)):h("",!0)}}),xo=y($o,[["__scopeId","data-v-27c71214"]]),wo={class:"container"},Lo=v({__name:"VPNavScreen",props:{open:{type:Boolean}},setup(e){const t=S(null),n=Oe(Z?document.body:null);return(s,a)=>(o(),g(ae,{name:"fade",onEnter:a[0]||(a[0]=i=>n.value=!0),onAfterLeave:a[1]||(a[1]=i=>n.value=!1)},{default:f(()=>[e.open?(o(),l("div",{key:0,class:"VPNavScreen",ref_key:"screen",ref:t,id:"VPNavScreen"},[u("div",wo,[d(s.$slots,"nav-screen-content-before",{},void 0,!0),b(yo,{class:"menu"}),b(xo,{class:"translations"}),b(Qa,{class:"appearance"}),b(ko,{class:"social-links"}),d(s.$slots,"nav-screen-content-after",{},void 0,!0)])],512)):h("",!0)]),_:3}))}}),So=y(Lo,[["__scopeId","data-v-0ef687b5"]]),Po={key:0,class:"VPNav"},Mo=v({__name:"VPNav",setup(e){const{isScreenOpen:t,closeScreen:n,toggleScreen:s}=$s(),{frontmatter:a}=L(),i=$(()=>a.value.navbar!==!1);return ze("close-screen",n),oe(()=>{Z&&document.documentElement.classList.toggle("hide-nav",!i.value)}),(c,m)=>i.value?(o(),l("header",Po,[b(Ka,{"is-screen-open":r(t),onToggleScreen:r(s)},{"nav-bar-title-before":f(()=>[d(c.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(c.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":f(()=>[d(c.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":f(()=>[d(c.$slots,"nav-bar-content-after",{},void 0,!0)]),_:3},8,["is-screen-open","onToggleScreen"]),b(So,{open:r(t)},{"nav-screen-content-before":f(()=>[d(c.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":f(()=>[d(c.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3},8,["open"])])):h("",!0)}}),Eo=y(Mo,[["__scopeId","data-v-699959bf"]]),Co=["role","tabindex"],To={key:1,class:"items"},No=v({__name:"VPSidebarItem",props:{item:{},depth:{}},setup(e){const t=e,{collapsed:n,collapsible:s,isLink:a,isActiveLink:i,hasActiveLink:c,hasChildren:m,toggle:p}=Lt($(()=>t.item)),k=$(()=>m.value?"section":"div"),w=$(()=>a.value?"a":"div"),_=$(()=>m.value?t.depth+2===7?"p":`h${t.depth+2}`:"p"),x=$(()=>a.value?void 0:"button"),M=$(()=>[[`level-${t.depth}`],{collapsible:s.value},{collapsed:n.value},{"is-link":a.value},{"is-active":i.value},{"has-active":c.value}]);function T(B){"key"in B&&B.key!=="Enter"||!t.item.link&&p()}function V(){t.item.link&&p()}return(B,H)=>{const O=K("VPSidebarItem",!0);return o(),g(j(k.value),{class:P(["VPSidebarItem",M.value])},{default:f(()=>[e.item.text?(o(),l("div",G({key:0,class:"item",role:x.value},nt(e.item.items?{click:T,keydown:T}:{},!0),{tabindex:e.item.items&&0}),[H[1]||(H[1]=u("div",{class:"indicator"},null,-1)),e.item.link?(o(),g(z,{key:0,tag:w.value,class:"link",href:e.item.link,rel:e.item.rel,target:e.item.target},{default:f(()=>[(o(),g(j(_.value),{class:"text",innerHTML:e.item.text},null,8,["innerHTML"]))]),_:1},8,["tag","href","rel","target"])):(o(),g(j(_.value),{key:1,class:"text",innerHTML:e.item.text},null,8,["innerHTML"])),e.item.collapsed!=null&&e.item.items&&e.item.items.length?(o(),l("div",{key:2,class:"caret",role:"button","aria-label":"toggle section",onClick:V,onKeydown:st(V,["enter"]),tabindex:"0"},[...H[0]||(H[0]=[u("span",{class:"vpi-chevron-right caret-icon"},null,-1)])],32)):h("",!0)],16,Co)):h("",!0),e.item.items&&e.item.items.length?(o(),l("div",To,[e.depth<5?(o(!0),l(C,{key:0},I(e.item.items,D=>(o(),g(O,{key:D.text,item:D,depth:e.depth+1},null,8,["item","depth"]))),128)):h("",!0)])):h("",!0)]),_:1},8,["class"])}}}),Vo=y(No,[["__scopeId","data-v-81db5174"]]),Ao=v({__name:"VPSidebarGroup",props:{items:{}},setup(e){const t=S(!0);let n=null;return R(()=>{n=setTimeout(()=>{n=null,t.value=!1},300)}),at(()=>{n!=null&&(clearTimeout(n),n=null)}),(s,a)=>(o(!0),l(C,null,I(e.items,i=>(o(),l("div",{key:i.text,class:P(["group",{"no-transition":t.value}])},[b(Vo,{item:i,depth:0},null,8,["item"])],2))),128))}}),Io=y(Ao,[["__scopeId","data-v-3957e03e"]]),Bo={class:"nav",id:"VPSidebarNav","aria-labelledby":"sidebar-aria-label",tabindex:"-1"},Ho=v({__name:"VPSidebar",props:{open:{type:Boolean}},setup(e){const{sidebarGroups:t,hasSidebar:n}=W(),s=e,a=S(null),i=Oe(Z?document.body:null);U([s,a],()=>{var m;s.open?(i.value=!0,(m=a.value)==null||m.focus()):i.value=!1},{immediate:!0,flush:"post"});const c=S(0);return U(t,()=>{c.value+=1},{deep:!0}),(m,p)=>r(n)?(o(),l("aside",{key:0,class:P(["VPSidebar",{open:e.open}]),ref_key:"navEl",ref:a,onClick:p[0]||(p[0]=De(()=>{},["stop"]))},[p[2]||(p[2]=u("div",{class:"curtain"},null,-1)),u("nav",Bo,[p[1]||(p[1]=u("span",{class:"visually-hidden",id:"sidebar-aria-label"}," Sidebar Navigation ",-1)),d(m.$slots,"sidebar-nav-before",{},void 0,!0),(o(),g(Io,{items:r(t),key:c.value},null,8,["items"])),d(m.$slots,"sidebar-nav-after",{},void 0,!0)])],2)):h("",!0)}}),Oo=y(Ho,[["__scopeId","data-v-f9fedfdc"]]),zo=v({__name:"VPSkipLink",setup(e){const{theme:t}=L(),n=X(),s=S();U(()=>n.path,()=>s.value.focus());function a({target:i}){const c=document.getElementById(decodeURIComponent(i.hash).slice(1));if(c){const m=()=>{c.removeAttribute("tabindex"),c.removeEventListener("blur",m)};c.setAttribute("tabindex","-1"),c.addEventListener("blur",m),c.focus(),window.scrollTo(0,0)}}return(i,c)=>(o(),l(C,null,[u("span",{ref_key:"backToTop",ref:s,tabindex:"-1"},null,512),u("a",{href:"#VPContent",class:"VPSkipLink visually-hidden",onClick:a},E(r(t).skipToContentLabel||"Skip to content"),1)],64))}}),Do=y(zo,[["__scopeId","data-v-4cce4074"]]),jo=v({__name:"Layout",setup(e){const{isOpen:t,open:n,close:s}=W(),a=X();U(()=>a.path,s),wt(t,s);const{frontmatter:i}=L(),c=ot(),m=$(()=>!!c["home-hero-image"]);return ze("hero-image-slot-exists",m),(p,k)=>{const w=K("Content");return r(i).layout!==!1?(o(),l("div",{key:0,class:P(["Layout",r(i).pageClass])},[d(p.$slots,"layout-top",{},void 0,!0),b(Do),b(ut,{class:"backdrop",show:r(t),onClick:r(s)},null,8,["show","onClick"]),b(Eo,null,{"nav-bar-title-before":f(()=>[d(p.$slots,"nav-bar-title-before",{},void 0,!0)]),"nav-bar-title-after":f(()=>[d(p.$slots,"nav-bar-title-after",{},void 0,!0)]),"nav-bar-content-before":f(()=>[d(p.$slots,"nav-bar-content-before",{},void 0,!0)]),"nav-bar-content-after":f(()=>[d(p.$slots,"nav-bar-content-after",{},void 0,!0)]),"nav-screen-content-before":f(()=>[d(p.$slots,"nav-screen-content-before",{},void 0,!0)]),"nav-screen-content-after":f(()=>[d(p.$slots,"nav-screen-content-after",{},void 0,!0)]),_:3}),b(_s,{open:r(t),onOpenMenu:r(n)},null,8,["open","onOpenMenu"]),b(Oo,{open:r(t)},{"sidebar-nav-before":f(()=>[d(p.$slots,"sidebar-nav-before",{},void 0,!0)]),"sidebar-nav-after":f(()=>[d(p.$slots,"sidebar-nav-after",{},void 0,!0)]),_:3},8,["open"]),b(os,null,{"page-top":f(()=>[d(p.$slots,"page-top",{},void 0,!0)]),"page-bottom":f(()=>[d(p.$slots,"page-bottom",{},void 0,!0)]),"not-found":f(()=>[d(p.$slots,"not-found",{},void 0,!0)]),"home-hero-before":f(()=>[d(p.$slots,"home-hero-before",{},void 0,!0)]),"home-hero-info-before":f(()=>[d(p.$slots,"home-hero-info-before",{},void 0,!0)]),"home-hero-info":f(()=>[d(p.$slots,"home-hero-info",{},void 0,!0)]),"home-hero-info-after":f(()=>[d(p.$slots,"home-hero-info-after",{},void 0,!0)]),"home-hero-actions-after":f(()=>[d(p.$slots,"home-hero-actions-after",{},void 0,!0)]),"home-hero-image":f(()=>[d(p.$slots,"home-hero-image",{},void 0,!0)]),"home-hero-after":f(()=>[d(p.$slots,"home-hero-after",{},void 0,!0)]),"home-features-before":f(()=>[d(p.$slots,"home-features-before",{},void 0,!0)]),"home-features-after":f(()=>[d(p.$slots,"home-features-after",{},void 0,!0)]),"doc-footer-before":f(()=>[d(p.$slots,"doc-footer-before",{},void 0,!0)]),"doc-before":f(()=>[d(p.$slots,"doc-before",{},void 0,!0)]),"doc-after":f(()=>[d(p.$slots,"doc-after",{},void 0,!0)]),"doc-top":f(()=>[d(p.$slots,"doc-top",{},void 0,!0)]),"doc-bottom":f(()=>[d(p.$slots,"doc-bottom",{},void 0,!0)]),"aside-top":f(()=>[d(p.$slots,"aside-top",{},void 0,!0)]),"aside-bottom":f(()=>[d(p.$slots,"aside-bottom",{},void 0,!0)]),"aside-outline-before":f(()=>[d(p.$slots,"aside-outline-before",{},void 0,!0)]),"aside-outline-after":f(()=>[d(p.$slots,"aside-outline-after",{},void 0,!0)]),"aside-ads-before":f(()=>[d(p.$slots,"aside-ads-before",{},void 0,!0)]),"aside-ads-after":f(()=>[d(p.$slots,"aside-ads-after",{},void 0,!0)]),_:3}),b(ds),d(p.$slots,"layout-bottom",{},void 0,!0)],2)):(o(),g(w,{key:1}))}}}),Fo=y(jo,[["__scopeId","data-v-d367b680"]]),Uo={class:"profile"},Ro={class:"avatar"},qo=["src","alt"],Wo={class:"data"},Go={class:"name"},Jo={key:0,class:"affiliation"},Ko={key:0,class:"title"},Yo={key:1,class:"at"},Xo=["innerHTML"],Zo={key:2,class:"links"},Qo={key:0,class:"sp"},ei=v({__name:"VPTeamMembersItem",props:{size:{default:"medium"},member:{}},setup(e){return(t,n)=>(o(),l("article",{class:P(["VPTeamMembersItem",[e.size]])},[u("div",Uo,[u("figure",Ro,[u("img",{class:"avatar-img",src:e.member.avatar,alt:e.member.name},null,8,qo)]),u("div",Wo,[u("h1",Go,E(e.member.name),1),e.member.title||e.member.org?(o(),l("p",Jo,[e.member.title?(o(),l("span",Ko,E(e.member.title),1)):h("",!0),e.member.title&&e.member.org?(o(),l("span",Yo," @ ")):h("",!0),e.member.org?(o(),g(z,{key:2,class:P(["org",{link:e.member.orgLink}]),href:e.member.orgLink,"no-icon":""},{default:f(()=>[q(E(e.member.org),1)]),_:1},8,["class","href"])):h("",!0)])):h("",!0),e.member.desc?(o(),l("p",{key:1,class:"desc",innerHTML:e.member.desc},null,8,Xo)):h("",!0),e.member.links?(o(),l("div",Zo,[b(de,{links:e.member.links},null,8,["links"])])):h("",!0)])]),e.member.sponsor?(o(),l("div",Qo,[b(z,{class:"sp-link",href:e.member.sponsor,"no-icon":""},{default:f(()=>[n[0]||(n[0]=u("span",{class:"vpi-heart sp-icon"},null,-1)),q(" "+E(e.member.actionText||"Sponsor"),1)]),_:1},8,["href"])])):h("",!0)],2))}}),ti=y(ei,[["__scopeId","data-v-b80ae7ec"]]),ni={class:"container"},si=v({__name:"VPTeamMembers",props:{size:{default:"medium"},members:{}},setup(e){const t=e,n=$(()=>[t.size,`count-${t.members.length}`]);return(s,a)=>(o(),l("div",{class:P(["VPTeamMembers",n.value])},[u("div",ni,[(o(!0),l(C,null,I(e.members,i=>(o(),l("div",{key:i.name,class:"item"},[b(ti,{size:e.size,member:i},null,8,["size","member"])]))),128))])],2))}}),tr=y(si,[["__scopeId","data-v-0512dbae"]]),ai={},oi={class:"VPTeamPage"};function ii(e,t){return o(),l("div",oi,[d(e.$slots,"default")])}const nr=y(ai,[["render",ii],["__scopeId","data-v-93f7c020"]]),ri={},li={class:"VPTeamPageTitle"},ci={key:0,class:"title"},di={key:1,class:"lead"};function ui(e,t){return o(),l("div",li,[e.$slots.title?(o(),l("h1",ci,[d(e.$slots,"title",{},void 0,!0)])):h("",!0),e.$slots.lead?(o(),l("p",di,[d(e.$slots,"lead",{},void 0,!0)])):h("",!0)])}const sr=y(ri,[["render",ui],["__scopeId","data-v-8a591f0a"]]),mi={Layout:Fo,enhanceApp:({app:e})=>{e.component("Badge",lt)}},pi=500,te="data-folded";function fi(e){Z&&R(()=>{U(()=>e.path,()=>$e(()=>hi()),{immediate:!0})})}function hi(){document.querySelectorAll('div[class*="language-"]').forEach(e=>{if(e.querySelector(".codeblock-fold-btn"))return;const t=e.querySelector("pre");if(!t||t.scrollHeight<=pi)return;e.setAttribute(te,"");const n=document.createElement("button");n.className="codeblock-fold-btn",n.type="button",n.textContent="Show more",n.addEventListener("click",()=>{e.hasAttribute(te)?(e.removeAttribute(te),n.textContent="Show less"):(e.setAttribute(te,""),n.textContent="Show more",e.scrollIntoView({block:"nearest"}))}),e.appendChild(n)})}const vi={},bi={class:"pg-loading-skeleton"};function gi(e,t){return o(),l("div",bi,[...t[0]||(t[0]=[it('<div class="pg-editor pg-editor-loading"><div class="pg-editor-tabs"><button class="pg-editor-tab active">HTML</button><button class="pg-editor-tab">CSS</button><button class="pg-editor-tab">JS</button></div><div class="pg-editor-container"></div></div><div class="pg-preview"><div class="pg-preview-header"><span class="pg-preview-title">Preview</span></div><div class="pg-preview-iframe"></div></div>',2)])])}const Te=y(vi,[["render",gi]]),yi={class:"pg-sidebar-nav"},ki={class:"pg-sidebar-heading"},_i={class:"pg-sidebar-items"},$i={class:"item"},xi=["href","onClick"],wi={class:"text"},Li={__name:"PlaygroundSidebar",props:{examples:{type:Array,required:!0},currentId:{type:String,default:""},open:{type:Boolean,default:!1}},emits:["select","toggle"],setup(e,{emit:t}){const n=t;return(s,a)=>(o(),l(C,null,[u("div",{class:P(["pg-sidebar-backdrop",{open:e.open}]),onClick:a[0]||(a[0]=i=>n("toggle"))},null,2),u("aside",{class:P(["pg-sidebar",{open:e.open}])},[u("nav",yi,[(o(!0),l(C,null,I(e.examples,i=>(o(),l("div",{key:i.category,class:"pg-sidebar-group"},[u("p",ki,E(i.category),1),u("div",_i,[(o(!0),l(C,null,I(i.items,c=>(o(),l("div",{key:c.id,class:P(["pg-sidebar-item",{"is-active":e.currentId===c.id}])},[u("div",$i,[a[1]||(a[1]=u("div",{class:"indicator"},null,-1)),u("a",{class:"link",href:"#"+c.id,onClick:De(m=>n("select",c.id),["prevent"])},[u("p",wi,E(c.title),1)],8,xi)])],2))),128))])]))),128))])],2)],64))}},Si={id:"hello-world",title:"Hello World",js:`import { Elena, html } from "@elenajs/core";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /**
   * The name of the person to greet.
   *
   * @attribute
   * @type {String}
   */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}

MyGreeting.define();`,html:'<my-greeting name="Elena"></my-greeting>'},Pi={id:"composite-component",title:"Composite Component",js:`import { Elena } from "@elenajs/core";

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /**
   * The direction of the stack.
   *
   * @attribute
   * @type {"column" | "row"}
   */
  direction = "column";
}

MyStack.define();`,css:`/* Scope makes sure styles don’t leak out */
@scope (my-stack) {

  /* Targets the host element */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Direction */
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
</my-stack>`},Mi={id:"primitive-component",title:"Primitive Component",js:`import { Elena, html } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /**
   * The style variant of the button.
   *
   * @attribute
   * @type {"default" | "primary" | "danger"}
   */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();`,css:`/* Scope makes sure styles don’t leak out */
@scope (my-button) {

  /* Reset makes sure styles don’t leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element */
  :scope {
    /* Public theming API (with default values set) */
    --_my-button-bg: var(--my-button-bg, #eaecf0);
    --_my-button-text: var(--my-button-text, #172b4d);

    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  /* Elena SSR Pattern to avoid layout shift */
  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--_my-button-bg);
    color: var(--_my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* States */
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

  /* Variants */
  :scope[variant="primary"] {
    --_my-button-bg: var(--my-button-bg, #5a44d4);
    --_my-button-text: var(--my-button-text, #fff);
  }
  :scope[variant="danger"] {
    --_my-button-bg: var(--my-button-bg, #d44444);
    --_my-button-text: var(--my-button-text, #fff);
  }
}`,html:`<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`},Ei={id:"declarative-component",title:"Declarative Component",js:`import { Elena } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @slot - The button content
 * @status alpha
 */
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
</my-button>`},Ci={id:"string-props",title:"String Props",js:`import { Elena, html } from "@elenajs/core";

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
<my-badge variant="error">Error</my-badge>`},Ti={id:"boolean-props",title:"Boolean Props",js:`import { Elena, html } from "@elenajs/core";

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
<my-checkbox disabled label="Disabled"></my-checkbox>`},Ni={id:"number-props",title:"Number Props",js:`import { Elena, html } from "@elenajs/core";

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
<my-counter count="10" step="5" max="95"></my-counter>`},Vi={id:"array-object-props",title:"Array/Object Props",js:`import { Elena, html } from "@elenajs/core";

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
></my-list>`},Ai={id:"conditional-rendering",title:"Conditional Rendering",js:`import { Elena, html, nothing } from "@elenajs/core";

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
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>`},Ii={id:"list-rendering",title:"List Rendering",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-list></my-list>"},Bi={id:"unsafe-html",title:"unsafeHTML",js:`import { Elena, html, unsafeHTML } from "@elenajs/core";

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
<my-icon name="check" style="color: #48bb78"></my-icon>`},Hi={id:"element-ref",title:"Element Ref",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:'<my-input label="Character counter"></my-input>'},Oi={id:"delegated-events",title:"Delegated Events",js:`import { Elena, html } from "@elenajs/core";

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

<pre id="log"></pre>`},zi={id:"custom-events",title:"Custom Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyRating extends Elena(HTMLElement) {
  static tagName = "my-rating";
  static props = [{ name: "value", reflect: false }];

  /** @type {Number} */
  value = 0;

  rate(stars) {
    this.value = stars;
    this.dispatchEvent(new CustomEvent("rate", {
      bubbles: true,
      composed: true,
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

<p id="output">Click a star to rate.</p>`},Di={id:"manual-listeners",title:"Manual Listeners",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-key-logger></my-key-logger>"},ji={id:"will-update",title:"willUpdate",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-filter></my-filter>"},Fi={id:"first-updated",title:"firstUpdated",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-card></my-card>"},Ui={id:"request-update",title:"requestUpdate",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-tags></my-tags>"},Ri={id:"css-custom-properties",title:"CSS Custom Properties",js:`import { Elena, html } from "@elenajs/core";

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
<my-button class="brand-theme">Brand Theme</my-button>`},qi={id:"baseline-support",title:"Baseline Support",js:`import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

/**
 * Baseline Support component that is based on the official <baseline-status>
 * (https://github.com/web-platform-dx/baseline-status), but rebuilt using Elena. 
 * It displays the baseline support status for a web platform feature by fetching 
 * data from the web-features API and rendering an expandable widget.
 *
 * @displayName Baseline Support
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
  static shadow = "open";

  /**
   * The web-features feature ID (e.g. "grid", "dialog").
   *
   * @attribute
   * @type {string}
   */
  featureid = "";

  /**
   * Styles for the baseline support web component.
   * If you use @elenajs/bundler, you can also import them using:
   * 
   * import styles from "./baseline-support.css" with { type: "css" };
   * static styles = styles;
   */
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
   * Renders the actual web component.
   *
   * @internal
   */
  render() {
    const status = this._status;
    const def = BASELINE_DEFS[status];
    const title = this._loading ? "Loading..." : def.title;
    const preTitle = status === "limited" || status === "no_data" ? nothing : html\`<strong>Baseline</strong>\`;
    const year = status === "newly" && this._date ? this._date.split(" ")[1] : "";
    const badge = status === "newly" ? html\`<span class="baseline-badge">newly available</span>\` : nothing;
    const upvote = this._data?.developer_signals;
    const upvoteButton = upvote?.link ? html\`<a class="signals-badge" href="\${upvote.link}" target="_top">👍 \${upvote.upvotes || 0}</a>\` : nothing;
    const learnMore = status !== "no_data" && this._data?.feature_id ? html\`<p><a href="https://github.com/web-platform-dx/web-features/blob/main/features/\${this._data.feature_id}.yml" target="_top" class="baseline-link">Learn more</a></p>\` : nothing;

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

BaselineSupport.define();`,html:`<baseline-support featureid="autonomous-custom-elements"></baseline-support>
<baseline-support featureid="cascade-layers"></baseline-support>
<baseline-support featureid="scope"></baseline-support>
<baseline-support featureid="declarative-shadow-dom"></baseline-support>
<baseline-support featureid="anchor-positioning"></baseline-support>`},Wi={id:"mixins",title:"Mixins",js:`import { Elena, html } from "@elenajs/core";

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
</div>`},Gi={id:"shadow-dom",title:"Shadow DOM",js:`import { Elena, html } from "@elenajs/core";

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
</p>`},Y=[{category:"Basics",items:[Mi,Pi,Ei,Si]},{category:"Props",items:[Ci,Ti,Ni,Vi]},{category:"Templates",items:[Ai,Ii,Bi,Hi]},{category:"Events",items:[Oi,zi,Di]},{category:"Lifecycle",items:[ji,Fi,Ui]},{category:"Styling",items:[Ri]},{category:"Advanced",items:[Wi,Gi,qi]}],Ji=`function t(t,s,e){if(s="boolean"===t&&"boolean"!=typeof s?null!==s:s,!e)return s;if("toAttribute"===e)switch(t){case"object":case"array":return null===s?null:JSON.stringify(s);case"boolean":return s?"":null;case"number":return null===s?null:s;default:return""===s?null:s}else switch(t){case"object":case"array":if(!s)return s;try{return JSON.parse(s)}catch{return console.warn("░█ [ELENA]: Invalid JSON: "+s),null}case"boolean":return s;case"number":return null!==s?+s:s;default:return s??""}}function s(t,s,e){t?null===e?t.removeAttribute(s):t.setAttribute(s,e):console.warn("░█ [ELENA]: Cannot sync attrs.")}const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function i(t){return Array.isArray(t)?t.map(t=>n(t)).join(""):n(t)}function n(t){return t?.t?String(t):(s=String(t??""),String(s).replace(/[&<>"']/g,t=>e[t]));var s}function o(t,...s){let e;return{t:!0,strings:t,values:s,toString:()=>(void 0===e&&(e=t.reduce((t,e,n)=>t+e+i(s[n]),"")),e)}}function r(t){return{t:!0,toString:()=>t??""}}const h=Object.freeze({t:!0,toString:()=>""}),c=t=>Array.isArray(t)?t.some(t=>t?.t):t?.t,u=t=>Array.isArray(t)?t.map(t=>String(t??"")).join(""):String(t??"");function l(t){return t.replace(/>\\n\\s*/g,">").replace(/\\n\\s*</g,"<").replace(/\\n\\s*/g," ").replace(/>\\s+</g,"><")}const a=new WeakMap,f="e"+Math.random().toString(36).slice(2,6);function d(t,s,e){return!function(t,s,e){if(t.i!==s||!t.o)return!1;for(let s=0;s<e.length;s++){const i=e[s],n=Array.isArray(i)?u(i):i;if(n!==t.h[s]){if(c(i)||!t.o[s])return!1;t.h[s]=n,t.o[s].textContent=u(i)}}return!0}(t,s,e)&&(function(t,s,e){let n=a.get(s);if(!n){const t=Array.from(s,l);n={processedStrings:t,template:e.length>0?p(t,e.length):null},a.set(s,n)}if(n.template)t.o=function(t,s,e){const n=s.content.cloneNode(!0),o=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT),r=new Array(e.length),h=[];let l;for(;l=o.nextNode();)l.data===f&&h.push(l);for(let t=0;t<h.length;t++){const s=e[t];if(c(s)){const e=document.createElement("template");e.innerHTML=i(s),h[t].parentNode.replaceChild(e.content,h[t])}else{const e=document.createTextNode(u(s));h[t].parentNode.replaceChild(e,h[t]),r[t]=e}}return t.replaceChildren(n),r}(t,n.template,e);else{const s=e.map(t=>i(t)),o=n.processedStrings.reduce((t,e,i)=>t+e+(s[i]??""),"").replace(/>\\s+</g,"><").trim(),r=document.createElement("template");r.innerHTML=o,y(t,r.content.childNodes),t.o=null}t.i=s,t.h=e.map(t=>Array.isArray(t)?u(t):t)}(t,s,e),!0)}function p(t,s){const e=\`\\x3c!--\${f}--\\x3e\`,i=t.reduce((t,i,n)=>t+i+(n<s?e:""),"").trim(),n=document.createElement("template");n.innerHTML=i;const o=document.createTreeWalker(n.content,NodeFilter.SHOW_COMMENT);let r=0;for(;o.nextNode();)o.currentNode.data===f&&r++;return r===s?n:null}function y(t,s){const e=Array.from(t.childNodes),i=Array.from(s),n=Math.max(e.length,i.length);for(let s=0;s<n;s++){const n=e[s],o=i[s];n?o?n.nodeType!==o.nodeType||n.nodeType===Node.ELEMENT_NODE&&n.tagName!==o.tagName?t.replaceChild(o,n):n.nodeType===Node.TEXT_NODE?n.textContent!==o.textContent&&(n.textContent=o.textContent):n.nodeType===Node.ELEMENT_NODE&&(g(n,o),y(n,o.childNodes)):t.removeChild(n):t.appendChild(o)}}function g(t,s){for(let e=t.attributes.length-1;e>=0;e--){const{name:i}=t.attributes[e];s.hasAttribute(i)||t.removeAttribute(i)}for(let e=0;e<s.attributes.length;e++){const{name:i,value:n}=s.attributes[e];t.getAttribute(i)!==n&&t.setAttribute(i,n)}}const b=new WeakSet;function m(e){return class extends e{element=null;attributeChangedCallback(s,e,i){super.attributeChangedCallback?.(s,e,i),"text"!==s?(this.u=!0,function(s,e,i,n){if(i!==n){const i=typeof s[e];"undefined"===i&&console.warn(\`░█ [ELENA]: Prop "\${e}" has no default.\`);const o=t(i,n,"toProp");s[e]=o}}(this,s,e,i),this.u=!1,this.l&&e!==i&&!this.p&&this.m()):this.text=i??""}static get observedAttributes(){if(this.A)return this.A;const t=(this.props||[]).map(t=>"string"==typeof t?t:t.name);return this.A=[...t,"text"],this.A}connectedCallback(){super.connectedCallback?.(),this.S(),this.N(),this._(),this.v(),this.willUpdate(),this.C(),this.L(),this.k(),this.l||(this.l=!0,this.setAttribute("hydrated",""),this.firstUpdated()),this.updated()}S(){const e=this.constructor;if(b.has(e))return;const i=new Set,n=[];if(e.props){for(const t of e.props)"string"==typeof t?n.push(t):(n.push(t.name),!1===t.reflect&&i.add(t.name));n.includes("text")&&console.warn('░█ [ELENA]: "text" is reserved.'),function(e,i,n){for(const o of i){const i=!n||!n.has(o);Object.defineProperty(e,o,{configurable:!0,enumerable:!0,get(){return this.O?this.O.get(o):void 0},set(e){if(this.O||(this.O=new Map),e!==this.O.get(o)&&(this.O.set(o,e),this.isConnected))if(i){if(!this.u){const i=t(typeof e,e,"toAttribute");s(this,o,i)}}else this.l&&!this.p&&this.m()}})}}(e.prototype,n,i)}if(e.j=n,e.P=i,e.M=e.events||null,e.M)for(const t of e.M)Object.prototype.hasOwnProperty.call(e.prototype,t)||(e.prototype[t]=function(...s){return this.element[t](...s)});var o;e.U=(o=e.element)?t=>t.querySelector(o):t=>t.firstElementChild,b.add(e)}N(){this.u=!0;for(const t of this.constructor.j)if(Object.prototype.hasOwnProperty.call(this,t)){const s=this[t];delete this[t],this[t]=s}this.u=!1}_(){this.l||void 0!==this.q||(this.text=this.textContent.trim())}get F(){return this.J??this.shadowRoot??this}v(){const t=this.constructor;if(!t.shadow)return;this.J||this.shadowRoot||(this.J=this.attachShadow({mode:t.shadow}));const s=this.J??this.shadowRoot;if(t.styles){if(!t.R){const s=Array.isArray(t.styles)?t.styles:[t.styles];t.R=s.map(t=>{if("string"==typeof t){const s=new CSSStyleSheet;return s.replaceSync(t),s}return t})}s.adoptedStyleSheets=t.R}}C(){const t=this.render();if(t&&t.strings){const s=this.F;if(d(s,t.strings,t.values)){const t=this.element;if(this.element=this.constructor.U(s),this.W&&t&&this.element!==t){const s=this.constructor.M;for(const e of s)t.removeEventListener(e,this),this.element.addEventListener(e,this)}}}if(!this.element){const t=this.F;this.element=this.constructor.U(t),this.element||(this.constructor.element&&console.warn("░█ [ELENA]: Element not found."),this.element=t.firstElementChild)}}L(){if(this.O){const e=this.constructor.P;for(const[i,n]of this.O){if(e.has(i))continue;const o=t(typeof n,n,"toAttribute");(null!==o||this.hasAttribute(i))&&s(this,i,o)}}}k(){const t=this.constructor.M;if(!this.W&&t?.length)if(this.element){this.W=!0;for(const s of t)this.element.addEventListener(s,this)}else console.warn("░█ [ELENA]: Cannot add events.")}render(){}willUpdate(){}firstUpdated(){}updated(){}adoptedCallback(){super.adoptedCallback?.()}disconnectedCallback(){if(super.disconnectedCallback?.(),this.W){this.W=!1;for(const t of this.constructor.M)this.element?.removeEventListener(t,this)}}handleEvent(t){this.constructor.M?.includes(t.type)&&(t.bubbles&&(t.composed||this.F===this)||this.dispatchEvent(new Event(t.type,{bubbles:t.bubbles})))}get text(){return this.q??""}set text(t){const s=this.q;this.q=t,this.l&&s!==t&&!this.p&&this.m()}static define(){var t,s;this.tagName?(t=this.tagName,s=this,"undefined"!=typeof window&&"customElements"in window&&(window.customElements.get(t)||window.customElements.define(t,s))):console.warn("░█ [ELENA]: define() without a tagName.")}m(){this.p||this.$||(this.$=!0,this.D=new Promise(t=>{this.I=t}),queueMicrotask(()=>{try{this.T()}catch(t){console.error("░█ [ELENA]:",t)}}))}T(){this.$=!1;const t=this.I;this.I=null;try{try{this.willUpdate(),this.p=!0,this.C()}finally{this.p=!1}this.updated()}finally{this.D=null,t()}}get updateComplete(){return this.D?this.D:Promise.resolve()}requestUpdate(){this.l&&!this.p&&this.m()}}}export{m as Elena,o as html,h as nothing,r as unsafeHTML};
//# sourceMappingURL=bundle.js.map
`,Ne=Ji.replace(/\/\/# sourceMappingURL=.*$/m,"").trim(),Ki=typeof Blob<"u"?URL.createObjectURL(new Blob([Ne],{type:"text/javascript"})):`data:text/javascript;charset=utf-8,${encodeURIComponent(Ne)}`,Yi=JSON.stringify({imports:{"@elenajs/core":Ki}});function ar(e,t,n){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="importmap">${Yi}<\/script>
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
</html>`}function Ve(e,t){for(const n of e){const s=n.items.find(a=>a.id===t);if(s)return s}return null}function Ae(){return typeof window>"u"?null:window.location.hash.slice(1)||null}function Ie(e){typeof window>"u"||history.replaceState(null,"","#"+e)}function or(e,t){let n;return function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)}}function Ge(e){const t="https://unpkg.com/@elenajs/core";return e.replace(/from\s+["']@elenajs\/core["']/g,`from "${t}"`).replace(/import\s*\(\s*["']@elenajs\/core["']\s*\)/g,`import("${t}")`)}function ir(e,t,n,s){const a=Ge(t),i=n?`<style>
${n}
</style>
`:"",c=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e||"Elena Component"}</title>
${i}</head>
<body>
${s}
<script type="module">
${a}
<\/script>
</body>
</html>`,m=(e||"component").toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""),p=new Blob([c],{type:"text/html"}),k=URL.createObjectURL(p),w=document.createElement("a");w.href=k,w.download=`elena-${m}.html`,w.click(),URL.revokeObjectURL(k)}function rr(e,t,n,s){const a=Ge(t);return JSON.stringify({title:`Elena | ${e||"Component"}`,html:s||"",css:n||"",js:a||"",js_module:!0,editors:"111"})}const Xi={class:"pg-layout"},Zi={key:1,class:"pg-load-error"},Qi={__name:"PlaygroundWrapper",setup(e){const t=ke(null),n=S(!1),s=S(!1),a=S(!1),i=S(""),c=S(null),m=S(null),p=S(!1),k=S(!1),w=$(()=>m.value==null?{}:{gridTemplateColumns:`${m.value}px 0px 1fr`});function _(A){A.preventDefault(),p.value=!0,document.addEventListener("pointermove",x),document.addEventListener("pointerup",M)}function x(A){if(!c.value)return;const N=c.value.getBoundingClientRect(),F=200,ee=N.width-200;m.value=Math.min(ee,Math.max(F,A.clientX-N.left))}function M(){p.value=!1,document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",M)}function T(A){const N=Ve(Y,A);N&&(k.value&&!confirm("You have unsaved changes. Leave this example?")||(i.value=N.id,Ie(N.id),a.value=!1))}function V(){const A=Ae();A&&A!==i.value&&T(A)}function B(){m.value=null}async function H(){n.value=!1;try{const A=await fe(()=>import("./Playground.bpIGICNi.js"),__vite__mapDeps([2,1]));t.value=A.default}catch{try{const A=await fe(()=>import("./Playground.bpIGICNi.js"),__vite__mapDeps([2,1]));t.value=A.default}catch{n.value=!0}}}const O=rt(),D=O.onBeforeRouteChange;return O.onBeforeRouteChange=()=>k.value&&!confirm("You have unsaved changes. Leave this page?")?!1:D==null?void 0:D(),R(async()=>{var ee,Me,Ee;window.addEventListener("resize",B);const A=Ae(),N=((Me=(ee=Y[0])==null?void 0:ee.items[0])==null?void 0:Me.id)||"primitive-component",F=Ve(Y,A||N)||((Ee=Y[0])==null?void 0:Ee.items[0]);i.value=(F==null?void 0:F.id)||"",A||Ie(i.value),window.addEventListener("hashchange",V),await H()}),ie(()=>{O.onBeforeRouteChange=D,window.removeEventListener("resize",B),window.removeEventListener("hashchange",V),document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",M)}),(A,N)=>(o(),l("div",Xi,[b(Li,{examples:r(Y),"current-id":i.value,open:a.value,onSelect:T,onToggle:N[0]||(N[0]=F=>a.value=!a.value)},null,8,["examples","current-id","open"]),u("div",{ref_key:"mainRef",ref:c,class:P(["pg-main",{"pg-resizing":p.value}]),style:_e(w.value)},[(o(),g(j(t.value||Te),{"current-id":i.value,onPreviewReady:N[1]||(N[1]=F=>s.value=!0),onToggleSidebar:N[2]||(N[2]=F=>a.value=!a.value),"onUpdate:dirty":N[3]||(N[3]=F=>k.value=F)},null,40,["current-id"])),s.value?(o(),l("div",{key:0,class:"pg-resize-handle",onPointerdown:_},null,32)):h("",!0),b(ae,{name:"pg-unload"},{default:f(()=>[t.value&&!s.value?(o(),g(Te,{key:0,class:"pg-loading-overlay"})):h("",!0)]),_:1}),n.value?(o(),l("div",Zi,[N[4]||(N[4]=u("p",null,"Failed to load the playground.",-1)),u("button",{onClick:H},"Try again")])):h("",!0)],6)]))}},lr={extends:mi,setup(){fi(X())},enhanceApp({app:e}){e.component("Playground",Qi)}};export{lr as R,sr as V,tr as a,nr as b,rr as c,ir as d,or as e,Y as f,ar as g,Ve as h,wa as i,L as u};

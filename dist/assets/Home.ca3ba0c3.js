import{j as e,n as Y,s as x,u as q,r as o,a as M,b as j,c as E,A as $,L as J,S as Q,d as i,F as V,e as X,p as Z,m as ee}from"./index.cdcf1626.js";import{g as ae,G as te}from"./GamesWrapper.b7ce1416.js";const ne=({imgSrc:n,videoSrc:a,videoProps:p={}})=>{const g=matchMedia("(max-width: 768px)").matches,s=n||Y;if(g)return e("img",{src:s,alt:"background"});const r=a||s;return r===a?e("video",{...p,children:e("source",{src:r,type:"video/mp4"})}):e("img",{src:r,alt:"background"})},se=({imgSrc:n,videoSrc:a})=>e(re,{children:ne({imgSrc:n,videoSrc:a,videoProps:{autoPlay:!0,loop:!0,muted:!0,playsInline:!0}})}),re=x.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: -20px;
  width: 100%;
  height: 100%;
  min-height: 450px;
  min-width: 100vw;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    opacity: 0.4;
  }

  & video,
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,{HOME:oe}=Z,{setGame:ie}=ee;let l=null;const le=()=>{var P,T;const n=q(),[a,p]=o.exports.useState({}),[g,s]=o.exports.useState(!1),[r,f]=o.exports.useState(null),[w,b]=o.exports.useState([]),R=({target:t})=>{(t.tagName==="SECTION"||t.tagName==="P")&&n(ie({gameDetails:a,gameTrailers:w}))},{games:{games:v},modalGame:{gameId:k}}=M(t=>t),{name:z,rating:U,rating_top:B,playTime:_,description:F,esrb_rating:y,released:c,background_image:L,genres:S}=a,O=(T=(P=w[0])==null?void 0:P.data)==null?void 0:T.max,W=c&&(c==null?void 0:c.split("-")[0]),A=y&&y.name,C=S&&S.reduce((t,{name:d})=>(t.push(d),t),[]).join(", "),G=async()=>{var t,d;try{const{activePage:{activePage:m},modalGame:{gameId:D}}=j.getState();if(m!==oe&&m||D){clearTimeout(l),l=null;return}s(!0);const N=j.getState().games.games,H=Math.floor(Math.random()*N.length),I=N[H].id,K=await Promise.allSettled([E.get(`https://api.rawg.io/api/games/${I}?key=${$}`),E.get(`https://api.rawg.io/api/games/${I}/movies?key=${$}`)]),[h,u]=K;if(h.status==="rejected")throw h;p(h.value.data),b(((d=(t=u==null?void 0:u.value)==null?void 0:t.data)==null?void 0:d.results)||[]),s(!1),f(null),l=setTimeout(()=>G(),15e3)}catch(m){f(m),s(!1),p({}),b([])}};return o.exports.useEffect(()=>{!v.length||k||l||(l=!0,G())},[v,k]),e(pe,{onClick:R,children:(()=>{if(g)return e(J,{});if(r)return e(Q,{children:r.message});if(!(Object.keys(a).length<2))return i(V,{children:[e(se,{imgSrc:L,videoSrc:O}),e("h4",{className:"presental-game__title",children:z}),i("div",{className:"presental-game__details-list",children:[e("span",{children:W||"Unknown year"}),e("span",{children:"|"}),e("span",{children:U+" / "+B}),e("span",{children:"|"}),i("span",{className:"span-box",children:[" ",A||"Unknown ESRB rating"]}),e("span",{children:"|"}),i("span",{children:[" ",_?`${_}h`:"Unknown playtime"]})]}),e("p",{className:"presental-game__description",children:X(F)||"Unkown Description"}),i("div",{className:"presental-game__genres",children:[e("h4",{children:"Genres:"})," ",e("span",{children:C||"Unknown genres"})]})]})})()})},pe=x.section`
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  padding-block: 30px;
  margin-bottom: 20px;
  min-width: 80vw;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 100%;
    max-height: 600px;
  }

  & * {
    color: var(--primaryText);
  }
  & *:not(.presental-game__description) {
    pointer-events: none;
  }

  .presental-game {
    &__title {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0px;
      padding: 0px;
    }

    &__details-list {
      display: flex;
      flex-flow: row wrap;
      gap: 10px;
      margin: 0px;
      padding: 0px;

      & span {
        font-size: 1rem;
        font-weight: 600;
        padding: 3px 3px;
        color: var(--special);
      }

      & .span-box {
        border: 1.6px solid var(--special);
        padding: 3px 3px;
      }

      @media screen and (min-width: 768px) {
        padding-inline: 10px;
      }
    }

    &__description {
      line-height: 140%;
      font-size: 0.9rem;
      max-width: 700px;
      max-height: 380px;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: transparent;
      }
    }

    &__genres {
      & h4 {
        margin: 0px;
        padding: 0px;
        color: var(--special);
        display: inline-block;
      }
      & span {
        font-size: 0.95rem;
        font-weight: 100;
        color: var(--special);
      }
    }
  }
`,he=()=>{const{currentFilters:n}=M(a=>a);return o.exports.useEffect(()=>{ae(!0)},[n]),i(ce,{children:[e(le,{}),e(te,{})]})},ce=x.main`
  display: flex;
  flex-flow: column;
  gap: 40px;
`;export{he as default};

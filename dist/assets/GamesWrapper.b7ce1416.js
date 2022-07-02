import{s as G,u as v,N as x,d as y,j as o,n as N,C as A,m as E,b as S,c as O,f as T,g as k,h as $,p as C,r as h,a as j,i as L,L as q,S as u}from"./index.cdcf1626.js";const{setGameId:B}=E,I=({game:s})=>{const{background_image:e,name:t,released:r,id:a}=s,i=v(),n=(r==null?void 0:r.split("-")[0])||x+"year";return y(M,{onClick:({target:c})=>{c.tagName!=="BUTTON"&&i(B(a))},children:[o("img",{src:e||N,alt:t||x+"name"}),o(A,{id:a}),y(R,{children:[o("h4",{children:t||x+"name"}),o("time",{dateTime:n,children:n})]})]})},M=G.article`
  display: flex;
  flex-flow: column;
  padding: 13px;
  border-radius: 15px;
  margin-inline: auto;
  box-shadow: 2px 2px 30px var(--secondaryBlack);
  cursor: pointer;

  & img,
  & h4,
  & time {
    pointer-events: none;
  }

  & img {
    min-height: 400px;
    height: 100%;
    max-width: 500px;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.15s linear transform;
  }

  @media screen and (hover: hover) {
    &:hover {
      & img {
        transform: scale(1.02);
      }
    }
  }
`,R=G.div`
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  padding-inline: 20px;

  & * {
    color: var(--primaryText);
    font-weight: 600;
  }

  & h4 {
    letter-spacing: 1px;
    color: var(--primaryText);
    margin: 0px;
    padding: 0px;
    height: max-content;
    align-self: center;
  }
`,_=(s,e)=>{const t=new IntersectionObserver(r=>{r.forEach(a=>{!a.isIntersecting||(t.unobserve(a.target),e())})},{rootMargin:"0px 0px 250px 0px"});t.observe(s)},D=s=>{const e={};return Object.values(s).forEach(({propName:r,value:a})=>{!a.length||(a instanceof Array&&(a=a.reduce((i,{id:n})=>(i.push(n),i),[]).join(",")),e[r]=a)}),new URLSearchParams(e).toString().replace(/%2C/g,",")},{setNumOfGames:F}=T,{setNextPage:H,resetNextPage:U,setHasNextPage:W}=k,{setGames:P,setGamesLoader:f,addGames:X,setGamesError:b}=$,z=async s=>{var t,r;const e=S.dispatch;try{const{currentFilters:a,requestPage:i}=S.getState(),n=D(a);s&&(e(U()),e(f(!0)));const{data:{results:m,next:c,count:p}}=await O.get(`${i.nextPage}${n&&`&${n}`}`);e(s?P(m):X(m)),e(c?H(c):W(!1)),e(b(!1)),e(f(!1)),e(F(p))}catch(a){e(f(!1)),((r=(t=a.response)==null?void 0:t.data)==null?void 0:r.detail)==="Invalid page."?e(P([])):e(b(a))}},{setShouldScrollBack:J}=L,{HOME:d}=C,Y=()=>{const s=v(),e=h.exports.useRef(null),{games:t,activePage:r,requestPage:a,modalGame:i}=j(l=>l),{games:n,loader:m,error:c}=t,{activePage:p}=r,{hasNextPage:w}=a;return h.exports.useEffect(()=>{if(m||!n.length||!w||p!==d&&p)return;const l=e.current.querySelector("article:last-child");_(l,()=>z(!1))},[t]),h.exports.useEffect(()=>{i.isModalOpen||s(J(!0))},[i.isModalOpen]),o(K,{ref:e,activePage:p,children:(()=>{if(m)return o(q,{});if(c)return o(u,{children:c.message});if(!n.length)return o(u,{children:"No Games Found"});const l=n.map(g=>o(I,{game:g},g.id+g.slug));return w||l.push(o(u,{children:"No more games"},"no-more-games")),l})()})},K=G.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px;
  margin-top: ${({activePage:s})=>s===d||!s?"700px":"0px"};

  @media (min-width: 548px) {
    margin-top: ${({activePage:s})=>s===d||!s?"580px":"0px"};
  }
  @media screen and (min-width: 768px) {
    margin-top: ${({activePage:s})=>s===d||!s?"520px":"0px"};
  }
`;export{Y as G,z as g};

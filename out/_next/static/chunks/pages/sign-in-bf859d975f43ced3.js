(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[312],{42839:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sign-in",function(){return t(81455)}])},78648:function(e,s,t){"use strict";t.d(s,{Z:function(){return l}});var n=t(85893),a=t(66516),r=t(20550),i=t(636),o=t.n(i);function l(){return(0,n.jsxs)(a.Z,{className:o().topMenu,mode:"horizontal",children:[(0,n.jsx)(a.Z.Item,{className:o().menu,children:"Why NuoData?"},"1"),(0,n.jsx)(a.Z.Item,{className:o().menu,children:"Data Modernization"},"2"),(0,n.jsx)(a.Z.Item,{className:o().menu,children:"Data Management"},"3"),(0,n.jsx)(a.Z.Item,{className:o().menu,children:"Get Started"},"4"),(0,n.jsx)(a.Z.Item,{children:(0,n.jsx)(r.Z,{className:o().tryNowTag,color:"#E74860",children:"Try Now"})},"5")]})}},134:function(e,s,t){"use strict";t.d(s,{gt:function(){return i},Yk:function(){return o},wo:function(){return c},fh:function(){return l}});var n=t(72047),a=t.n(n),r=t(70594);r.Z.create({baseURL:"http://3.109.185.25",timeout:5e3});let i=async function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{return await a()(async()=>{let t=await r.Z.get(e,s);if(200===t.status)return{success:!0,data:t.data}},{retries:0})}catch(i){var t,n;return{success:!1,error:null==i?void 0:null===(t=i.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.errorMessages}}},o=async function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{return await a()(async()=>{let t=await r.Z.post(e,s);if(200===t.status)return{success:!0,data:t.data}},{retries:0})}catch(i){var t,n;return{success:!1,error:null==i?void 0:null===(t=i.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.errorMessages}}},l=async function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{return await a()(async()=>{let t=await r.Z.put(e,s);if(200===t.status)return{success:!0,data:t.data}},{retries:0})}catch(i){var t,n;return{success:!1,error:null==i?void 0:null===(t=i.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.errorMessages}}},c=async function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{return await a()(async()=>{let t=await r.Z.post(e,s,{headers:{"content-type":"multipart/form-data"}});if(200===t.status)return{success:!0,data:t.data}},{retries:0})}catch(i){var t,n;return{success:!1,error:null==i?void 0:null===(t=i.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.errorMessages}}}},65959:function(e,s,t){"use strict";t.d(s,{E1:function(){return p},Up:function(){return l},Ws:function(){return a},_R:function(){return i},gG:function(){return o},hI:function(){return h},p$:function(){return r},qZ:function(){return c},r:function(){return g},rN:function(){return u},x8:function(){return d},ym:function(){return n}});let n="https://api.dev.nuodata.io/usermgmt/v1/login",a="https://api.dev.nuodata.io/core/v1/project",r="https://api.dev.nuodata.io/core/v1/upload",i="https://api.dev.nuodata.io/process/v1/analyze",o="https://api.dev.nuodata.io/process/v1/analyze/file/",l="https://api.dev.nuodata.io/process/v1/convert/",c="https://api.dev.nuodata.io/core/v1/project/",u="https://api.dev.nuodata.io/core/v1/project/",d="https://api.dev.nuodata.io/process/v1/analyze/summary/",g="https://api.dev.nuodata.io/core/v1/download/",p="https://api.dev.nuodata.io/process/v1/design/",h="https://api.dev.nuodata.io/process/v1/target/"},81455:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return Z}});var n=t(85893),a=t(71230),r=t(15746),i=t(78648),o=t(67294),l=t(79216),c=function(e){let{loginCss:s}=e;return(0,n.jsxs)("div",{className:s.LogInLeft,children:[(0,n.jsx)("div",{className:s.logo,children:(0,n.jsx)(l.Z,{src:"../assets/images/logo.png",preview:!1})}),(0,n.jsx)("div",{className:s.leftImage,children:(0,n.jsx)(l.Z,{width:"100%",src:"../assets/images/image.png",preview:!1})})]})},u=t(16536),d=t(81579),g=t(24016),p=t(71577),h=t(27049),m=t(11163),v=t(41664),f=t.n(v),_=t(134),x=t(65959),w=function(e){let{loginCss:s}=e,t=(0,m.useRouter)(),[a,r]=(0,o.useState)(!1),i=async e=>{r(!0);let s=await (0,_.Yk)(x.ym,e);r(!1),s.success?(localStorage.setItem("authData",JSON.stringify(s.data)),t.push("dashboard")):u.ZP.error([null==s?void 0:s.error])};return(0,n.jsx)("div",{className:s.flexView,children:(0,n.jsxs)("div",{className:s.loginForm,children:[(0,n.jsx)("h1",{children:(0,n.jsx)("b",{children:"Hello! Welcome back."})}),(0,n.jsxs)(d.Z,{layout:"vertical",onFinish:i,autoComplete:"off",children:[(0,n.jsx)(d.Z.Item,{label:"E-mail address",labelAlign:"left",name:"email",rules:[{type:"email",message:"Please enter a valid email address."},{required:!0,message:"Email address is required."}],children:(0,n.jsx)(g.Z,{className:"input",placeholder:"example@gmail.com",name:"email",type:"text",disabled:a},"input-email")}),(0,n.jsx)(d.Z.Item,{label:"Password",labelAlign:"left",name:"password",rules:[{required:!0,message:"Password is required."}],children:(0,n.jsx)(g.Z,{className:"input",placeholder:"Enter password",name:"password",type:"password",disabled:a},"input-password")}),(0,n.jsx)("p",{className:s.forgotPassword,children:(0,n.jsx)("b",{children:"Forgot Password?"})}),(0,n.jsx)(p.Z,{size:"large",className:s.loginBtn,type:"primary",block:!0,htmlType:"submit",loading:a,disabled:a,children:"Login"}),(0,n.jsx)(h.Z,{plain:!0,children:"Or"}),(0,n.jsxs)(p.Z,{size:"large",className:s.googleLoginBtn,type:"",block:!0,children:[(0,n.jsx)(l.Z,{width:"4%",src:"../assets/images/google.png",preview:!1}),"\xa0 Login with Google"]}),(0,n.jsxs)("p",{className:s.signup,children:["Don’t have an account? \xa0",(0,n.jsx)(f(),{href:"/sign-up",children:(0,n.jsx)("b",{className:s.cursorPointer,children:"Sign up"})})]})]})]})})},j=t(36722),y=t.n(j);function N(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a.Z,{style:{height:"100vh"},className:y().desktopView,children:[(0,n.jsx)(r.Z,{span:9,children:(0,n.jsx)(c,{loginCss:y()})}),(0,n.jsxs)(r.Z,{span:15,children:[(0,n.jsx)(i.Z,{}),(0,n.jsx)(w,{loginCss:y()})]})]}),(0,n.jsx)(a.Z,{style:{height:"100vh"},className:y().mobileView,children:(0,n.jsxs)(r.Z,{span:24,children:[(0,n.jsx)(i.Z,{}),(0,n.jsx)(w,{loginCss:y()})]})})]})}var Z=function(e){return(0,n.jsx)(N,{})}},636:function(e){e.exports={topMenu:"authHeader_topMenu__6a1HW",menu:"authHeader_menu__ILp9T",tryNowTag:"authHeader_tryNowTag__4Pdkc"}},36722:function(e){e.exports={LogInLeft:"login_LogInLeft__DVGBV",logo:"login_logo__ltgde",leftImage:"login_leftImage__UjcwB",flexView:"login_flexView__ysm_3",loginForm:"login_loginForm__Ecr5g",forgotPassword:"login_forgotPassword__k8QIM",loginBtn:"login_loginBtn__PJvGb",googleLoginBtn:"login_googleLoginBtn__jhRrb",signup:"login_signup__Tcerd",cursorPointer:"login_cursorPointer__0x2kt",desktopView:"login_desktopView__qCZey",mobileView:"login_mobileView__AbNN1"}}},function(e){e.O(0,[798,254,947,774,888,179],function(){return e(e.s=42839)}),_N_E=e.O()}]);
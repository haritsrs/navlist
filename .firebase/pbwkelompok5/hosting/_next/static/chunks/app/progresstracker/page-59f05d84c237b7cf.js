(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[44],{8181:(e,t,a)=>{Promise.resolve().then(a.bind(a,6577))},5918:(e,t,a)=>{"use strict";a.d(t,{j:()=>c});var s=a(9904),l=a(399);let r=(0,s.Wp)({apiKey:"AIzaSyAovBXrgkEKGtQwouzsIiVhXyjMT72l8qM",authDomain:"pbwkelompok5.firebaseapp.com",projectId:"pbwkelompok5",storageBucket:"pbwkelompok5.firebasestorage.app",messagingSenderId:"371933318310",appId:"1:371933318310:web:ba2ab41aebcf4fefc8f867",measurementId:"G-V2LQZ3STXC"}),c=(0,l.xI)(r)},5443:(e,t,a)=>{"use strict";a.d(t,{A:()=>i,AuthContextProvider:()=>n});var s=a(5155),l=a(2115),r=a(399),c=a(5918);let o=(0,l.createContext)({});function n(e){let{children:t}=e,[a,n]=(0,l.useState)(null),[i,d]=(0,l.useState)(!0);(0,l.useEffect)(()=>{let e=(0,r.hg)(c.j,e=>{e?n(e):n(null),d(!1)});return()=>e()},[]);let m=async()=>{try{await (0,r.CI)(c.j)}catch(e){throw console.error("Logout error:",e),e}};return(0,s.jsx)(o.Provider,{value:{user:a,logout:m},children:!i&&t})}let i=()=>(0,l.useContext)(o)},6577:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h});var s=a(5155),l=a(2115);let r=(0,a(7401).A)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var c=a(7396),o=a(6046),n=a(5443);let i=()=>(0,s.jsxs)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none z-0",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] opacity-100"}),(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-[#9bbb98]/40 via-[#a5c4a5]/30 to-[#a5dba5]/20 animate-pulse opacity-50",style:{animationDuration:"1s",animationIterationCount:"infinite"}}),[...Array(15)].map((e,t)=>(0,s.jsx)("div",{className:"absolute bg-white/10 rounded-full blur-sm floating-shape floating-shape-".concat(t),style:{width:"".concat(150*Math.random()+50,"px"),height:"".concat(150*Math.random()+50,"px"),top:"".concat(100*Math.random(),"%"),left:"".concat(100*Math.random(),"%")}},t))]}),d=e=>{let{category:t,percentage:a,color:l,completedTasks:r,totalTasks:c}=e;return(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsxs)("div",{className:"flex justify-between mb-1",children:[(0,s.jsx)("span",{className:"text-gray-700",children:t}),(0,s.jsxs)("span",{className:"text-gray-600",children:[a.toFixed(1),"% (",r,"/",c," tasks)"]})]}),(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-4",children:(0,s.jsx)("div",{className:"h-4 rounded-full transition-all duration-500",style:{width:"".concat(a,"%"),backgroundColor:l}})})]})},m=e=>{let{data:t}=e,a=0,l=t.reduce((e,t)=>e+t.percentage,0)||100;return(0,s.jsxs)("svg",{width:200,height:200,className:"transform -rotate-90",children:[t.map((e,t)=>{let r=e.percentage/l*100/100*360,c=a+r,o=100+80*Math.cos(a*Math.PI/180),n=100+80*Math.sin(a*Math.PI/180),i=100+80*Math.cos(c*Math.PI/180),d=100+80*Math.sin(c*Math.PI/180),m=["M ".concat(o," ").concat(n),"A ".concat(80," ").concat(80," 0 ").concat(r>180?1:0," 1 ").concat(i," ").concat(d)].join(" "),h=(0,s.jsx)("path",{d:m,fill:"none",stroke:e.color,strokeWidth:40},t);return a+=r,h}),(0,s.jsx)("circle",{cx:100,cy:100,r:60,fill:"white"})]})},h=()=>{let e=(0,o.useRouter)(),{user:t}=(0,n.A)(),[a,h]=(0,l.useState)(""),[x,p]=(0,l.useState)([{category:"Work",percentage:0,color:"#ff4444",completedTasks:0,totalTasks:0},{category:"Personal",percentage:0,color:"#66cc66",completedTasks:0,totalTasks:0},{category:"Study",percentage:0,color:"#4444ff",completedTasks:0,totalTasks:0}]);return(0,l.useEffect)(()=>{if(t){let e=localStorage.getItem("username");e?h(e):h(null==t?void 0:t.email.split("@")[0]);let a=JSON.parse(localStorage.getItem("tasks"))||[];p(x.map(e=>{let t=a.filter(t=>t.category===e.category),s=t.filter(e=>e.completed).length,l=t.length;return{...e,completedTasks:s,totalTasks:l,percentage:0===l?0:s/l*100}}))}else e.push("/login")},[t,e]),(0,s.jsxs)("div",{className:"min-h-screen w-full",children:[(0,s.jsx)(i,{}),(0,s.jsx)("div",{className:"p-5 relative z-10",children:(0,s.jsxs)(c.default,{href:"/",className:"inline-flex items-center text-gray-800 hover:text-gray-600",children:[(0,s.jsx)(r,{className:"h-6 w-6 mr-2"}),"Back to Dashboard"]})}),(0,s.jsx)("div",{className:"p-5",children:(0,s.jsxs)("div",{className:"bg-white rounded-lg overflow-hidden max-w-2xl mx-auto relative z-10",children:[(0,s.jsx)("div",{className:"bg-[#2F5233] p-4 rounded-t-lg",children:(0,s.jsx)("h1",{className:"text-2xl font-bold text-white text-center",children:"PROGRESS TRACKER"})}),(0,s.jsxs)("div",{className:"p-8",children:[(0,s.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-between gap-8",children:[(0,s.jsx)("div",{className:"w-48 h-48",children:(0,s.jsx)(m,{data:x})}),(0,s.jsx)("div",{className:"flex-1 w-full",children:x.map((e,t)=>(0,s.jsx)(d,{category:e.category,percentage:e.percentage,color:e.color,completedTasks:e.completedTasks,totalTasks:e.totalTasks},t))})]}),(0,s.jsxs)("div",{className:"mt-8",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4 text-black",children:"Recently Completed Tasks"}),(0,s.jsx)("div",{className:"space-y-2",children:JSON.parse(localStorage.getItem("tasks")||"[]").filter(e=>e.completed).sort((e,t)=>new Date(t.completedAt)-new Date(e.completedAt)).slice(0,5).map(e=>(0,s.jsx)("div",{className:"bg-gray-50 p-3 rounded-md",children:(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsx)("span",{className:"text-gray-800",children:e.text}),(0,s.jsxs)("div",{className:"text-sm text-gray-500",children:[(0,s.jsx)("span",{className:"mr-3",children:e.category}),new Date(e.completedAt).toLocaleDateString()]})]})},e.id))})]})]})]})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[882,361,983,441,517,358],()=>t(8181)),_N_E=e.O()}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{1280:(e,t,a)=>{Promise.resolve().then(a.bind(a,4262))},5918:(e,t,a)=>{"use strict";let s;a.d(t,{db:()=>o,j:()=>n});var r=a(9904),l=a(399),d=a(7058);(0,r.Dk)().length||(s=(0,r.Wp)({apiKey:"AIzaSyAovBXrgkEKGtQwouzsIiVhXyjMT72l8qM",authDomain:"pbwkelompok5.firebaseapp.com",projectId:"pbwkelompok5",storageBucket:"pbwkelompok5.firebasestorage.app",messagingSenderId:"371933318310",appId:"1:371933318310:web:ba2ab41aebcf4fefc8f867",measurementId:"G-V2LQZ3STXC"}));let n=(0,l.xI)(s),o=(0,d.aU)(s)},6046:(e,t,a)=>{"use strict";var s=a(6658);a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}})},4262:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var s=a(5155),r=a(2115),l=a(6046),d=a(7058),n=a(399),o=a(5918);let c=()=>{let[e,t]=(0,r.useState)([]);return(0,r.useEffect)(()=>{t([...Array(15)].map(()=>({width:"".concat(150*Math.random()+50,"px"),height:"".concat(150*Math.random()+50,"px"),top:"".concat(100*Math.random(),"%"),left:"".concat(100*Math.random(),"%")})))},[]),(0,s.jsx)(s.Fragment,{children:e.map((e,t)=>(0,s.jsx)("div",{className:"absolute bg-white/10 rounded-full blur-lg floating-shape",style:e},t))})},i=()=>{let[e,t]=(0,r.useState)(""),[a,i]=(0,r.useState)("Work"),[u,m]=(0,r.useState)(""),[b,x]=(0,r.useState)([]),[h,p]=(0,r.useState)("all"),[g,k]=(0,r.useState)(null),[f,w]=(0,r.useState)(!0),y=(0,l.useRouter)();(0,r.useEffect)(()=>{let e=(0,n.hg)(o.j,e=>{e?k(e):y.push("/login"),w(!1)});return()=>e()},[y]),(0,r.useEffect)(()=>{if(!g)return;let e=(0,d.P)((0,d.rJ)(o.db,"tasks"),(0,d._M)("userId","==",g.uid),(0,d.My)("createdAt","desc")),t=(0,d.aQ)(e,e=>{x(e.docs.map(e=>({id:e.id,...e.data()})))});return()=>t()},[g]);let v=async()=>{if(!e.trim()||!g){alert("Task cannot be empty!");return}try{let s={text:e,category:a,completed:!1,completedAt:null,deadline:u||null,type:"task",createdAt:new Date().toISOString(),userId:g.uid};await (0,d.gS)((0,d.rJ)(o.db,"tasks"),s),t(""),m("")}catch(e){console.error("Error adding task: ",e),alert("Failed to add task. Please try again.")}},j=async e=>{if(g)try{await (0,d.kd)((0,d.H9)(o.db,"tasks",e))}catch(e){console.error("Error deleting task: ",e),alert("Failed to delete task. Please try again.")}},N=async(e,t)=>{if(g)try{let a=(0,d.H9)(o.db,"tasks",e);await (0,d.mZ)(a,{completed:!t,completedAt:t?null:new Date().toISOString()})}catch(e){console.error("Error updating task: ",e),alert("Failed to update task. Please try again.")}},S=e=>{if(!e.deadline||e.completed)return!1;let t=new Date;return t.setHours(0,0,0,0),new Date(e.deadline)<t};return f?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]",children:(0,s.jsx)("div",{className:"text-xl text-white",children:"Loading..."})}):(0,s.jsxs)("div",{className:"relative min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5 overflow-hidden",children:[(0,s.jsx)(c,{}),(0,s.jsx)("h1",{className:"text-3xl font-bold text-gray-800 text-center mb-6",children:"To-Do List"}),(0,s.jsx)("div",{className:"flex justify-center gap-4 mb-6",children:(0,s.jsx)("button",{onClick:()=>window.history.back(),className:"py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 transition-transform transform hover:translate-x-0 hover:translate-y-1 animate-bounceOnHover",children:"Back to Dashboard"})}),(0,s.jsxs)("div",{className:"max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6",children:[(0,s.jsxs)("div",{className:"flex gap-4 mb-6 flex-wrap",children:[(0,s.jsx)("input",{type:"text",placeholder:"New Task...",value:e,onChange:e=>t(e.target.value),className:"text-black flex-grow p-3 border rounded-md shadow-sm bg-white min-w-[200px]"}),(0,s.jsxs)("select",{value:a,onChange:e=>i(e.target.value),className:"p-3 border rounded-md shadow-sm bg-white text-black",children:[(0,s.jsx)("option",{value:"Work",children:"Work"}),(0,s.jsx)("option",{value:"Personal",children:"Personal"}),(0,s.jsx)("option",{value:"Study",children:"Study"})]}),(0,s.jsx)("input",{type:"date",value:u,onChange:e=>m(e.target.value),className:"p-3 border rounded-md shadow-sm bg-white text-black"}),(0,s.jsx)("button",{onClick:v,className:"py-2 px-4 bg-[#9bbb98] hover:bg-[#8aa989] text-white rounded-md",children:"Add Task"})]}),(0,s.jsxs)("div",{className:"flex justify-center gap-4 mb-6",children:[(0,s.jsx)("button",{onClick:()=>p("all"),className:"py-2 px-4 rounded-md ".concat("all"===h?"bg-[#9bbb98] text-white":"bg-gray-200 text-black"),children:"All"}),(0,s.jsx)("button",{onClick:()=>p("active"),className:"py-2 px-4 rounded-md ".concat("active"===h?"bg-[#9bbb98] text-white":"bg-gray-200 text-black"),children:"Active"}),(0,s.jsx)("button",{onClick:()=>p("completed"),className:"py-2 px-4 rounded-md ".concat("completed"===h?"bg-[#9bbb98] text-white":"bg-gray-200 text-black"),children:"Completed"})]}),(0,s.jsx)("ul",{className:"space-y-4",children:[...b].sort((e,t)=>e.deadline?t.deadline?new Date(e.deadline)-new Date(t.deadline):-1:1).filter(e=>"active"===h?!e.completed:"completed"!==h||e.completed).map(e=>(0,s.jsxs)("li",{className:"\n                bg-[#F7F9F4] p-4 rounded-md shadow-md flex justify-between items-center\n                ".concat(S(e)?"border-2 border-red-400":"","\n                ").concat(e.completed?"opacity-50":"","\n              "),children:[(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsx)("input",{type:"checkbox",checked:e.completed,onChange:()=>N(e.id,e.completed),className:"form-checkbox h-5 w-5"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"text-gray-800 ".concat(e.completed?"line-through":""),children:e.text}),e.deadline&&(0,s.jsxs)("div",{className:"text-xs ".concat(S(e)?"text-red-500":"text-gray-500"),children:["Deadline: ",new Date(e.deadline).toLocaleDateString(),S(e)&&" (Overdue)"]}),(0,s.jsx)("span",{className:"text-xs text-gray-500 ml-2",children:e.category})]})]}),(0,s.jsx)("button",{onClick:()=>j(e.id),className:"py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-md",children:"Delete"})]},e.id))})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[992,882,459,441,517,358],()=>t(1280)),_N_E=e.O()}]);
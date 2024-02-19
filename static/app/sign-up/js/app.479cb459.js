(function(){"use strict";var e={4975:function(e,r,o){var t=o(9963),n=o(6252);const u=(0,n._)("h1",{class:"card"},"用户注册",-1);function l(e,r,o,t,l,a){const s=(0,n.up)("el-divider"),i=(0,n.up)("el-input"),m=(0,n.up)("el-form-item"),f=(0,n.up)("el-radio"),d=(0,n.up)("el-radio-group"),p=(0,n.up)("el-button"),c=(0,n.up)("el-form"),b=(0,n.up)("el-card");return(0,n.wg)(),(0,n.j4)(b,{style:{},class:"card"},{default:(0,n.w5)((()=>[u,(0,n.Wm)(s),(0,n.Wm)(c,{"label-position":e.top,model:l.form,rules:l.rules,ref:"form"},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{label:"用户名:",prop:"username"},{default:(0,n.w5)((()=>[(0,n.Wm)(i,{modelValue:l.form.username,"onUpdate:modelValue":r[0]||(r[0]=e=>l.form.username=e),class:"box-card"},null,8,["modelValue"])])),_:1}),(0,n.Wm)(m,{label:"密码:",prop:"password"},{default:(0,n.w5)((()=>[(0,n.Wm)(i,{type:"password",modelValue:l.form.password,"onUpdate:modelValue":r[1]||(r[1]=e=>l.form.password=e)},null,8,["modelValue"])])),_:1}),(0,n.Wm)(m,{label:"性别:"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,{modelValue:l.form.sex,"onUpdate:modelValue":r[2]||(r[2]=e=>l.form.sex=e)},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{label:"男"}),(0,n.Wm)(f,{label:"女"})])),_:1},8,["modelValue"])])),_:1}),(0,n.Wm)(m,null,{default:(0,n.w5)((()=>[(0,n.Wm)(p,{type:"primary",onClick:r[3]||(r[3]=e=>a.submitForm("form")&&a.submitFormToServer()),style:{width:"100%"}},{default:(0,n.w5)((()=>[(0,n.Uk)("注册")])),_:1})])),_:1}),(0,n.Wm)(m)])),_:1},8,["label-position","model","rules"])])),_:1})}var a=o(5121),s=o(844),i={data(){return{form:{username:"",password:"",sex:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,message:"最少两个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.submitFormToServer()}))},submitFormToServer(){a.Z.post("http://127.0.0.1:5000/api/register",this.form).then((e=>{s.T.alert("注册成功，去<a href='/login'>登录</a>","提示",{dangerouslyUseHTMLString:!0,confirmButtonText:"好的"}),console.log(e.data)})).catch((e=>{s.T.alert(e.response.data.message,"提示"),console.debug(e.response.data.message)}))}}},m=o(3744);const f=(0,m.Z)(i,[["render",l]]);var d=f,p=o(6851);o(4415);(0,t.ri)(d).use(p.Z).mount("#app")}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var u=r[t]={exports:{}};return e[t].call(u.exports,u,u.exports,o),u.exports}o.m=e,function(){var e=[];o.O=function(r,t,n,u){if(!t){var l=1/0;for(m=0;m<e.length;m++){t=e[m][0],n=e[m][1],u=e[m][2];for(var a=!0,s=0;s<t.length;s++)(!1&u||l>=u)&&Object.keys(o.O).every((function(e){return o.O[e](t[s])}))?t.splice(s--,1):(a=!1,u<l&&(l=u));if(a){e.splice(m--,1);var i=n();void 0!==i&&(r=i)}}return r}u=u||0;for(var m=e.length;m>0&&e[m-1][2]>u;m--)e[m]=e[m-1];e[m]=[t,n,u]}}(),function(){o.d=function(e,r){for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};o.O.j=function(r){return 0===e[r]};var r=function(r,t){var n,u,l=t[0],a=t[1],s=t[2],i=0;if(l.some((function(r){return 0!==e[r]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(s)var m=s(o)}for(r&&r(t);i<l.length;i++)u=l[i],o.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return o.O(m)},t=self["webpackChunksignup"]=self["webpackChunksignup"]||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))}();var t=o.O(void 0,[998],(function(){return o(4975)}));t=o.O(t)})();
//# sourceMappingURL=app.479cb459.js.map